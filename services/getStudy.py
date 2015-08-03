import cgi
import json
import psycopg2
import psycopg2.extras
import dicom

def application(environ, start_response):
    status = '200 OK'   

    input = environ['wsgi.input']
    environ.setdefault('QUERY_STRING', '')
    fs = cgi.FieldStorage(fp = input, environ = environ, keep_blank_values = 1)
    
    pk = fs['pk'].value
#    pk = 3934 # XA
#    pk = 4338 # CT
    
    studies = []
    conn = psycopg2.connect(database = "pacsdb", user = "postgres", password = "justgoon", host = "localhost", port = "5432")
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    SQL = "SELECT series.pk, series.institution, study.study_iuid, series.series_iuid, patient.pat_id, patient.pat_name, patient.pat_sex, series.series_desc, series.body_part, study.study_desc "
    SQL += "FROM study "
    SQL += "LEFT JOIN series ON series.study_fk=study.pk "
    SQL += "LEFT JOIN patient ON patient.pk=study.patient_fk "
    SQL += "WHERE study.pk=%s;"

    cur.execute(SQL, [pk])

    series = cur.fetchall()

    for serie in series:
        series_id = serie['pk']
        study_uid = serie['study_iuid']
        series_uid = serie['series_iuid']
        series_desc = serie['series_desc']
        study_desc = serie['study_desc']
        series_body_part = serie['body_part']
        series_institution = serie['institution']
        patient_rut = serie['pat_id']
        patient_name = serie['pat_name']
        patient_sex = serie['pat_sex']
        
        SQL = "SELECT pk, sop_iuid FROM instance WHERE series_fk=%s AND inst_attrs NOT LIKE 'application/pdf' ORDER BY LPAD(inst_no,10,'0');"
        
        cur.execute(SQL, [series_id])
        
        instances = cur.fetchall()
        
        study = {}
        groups = []
        sopInstanceUIDs = []
        countNoBlankInstance = 0
        
        for i in range(0, len(instances)): 
            group = {}
            dicomsPath = []
            imagesPath = []
            imagesFrame = []
            dimensions = []
            sopInstanceUIDsNoMatch = False
            SQL = "SELECT filepath FROM files WHERE instance_fk=%s ORDER BY created_time;"
            cur.execute(SQL, [instances[i]['pk']])
            file = cur.fetchall()
            filePath = "/var/dcm4chee/server/default/archive/%s" % file[0][0]
            
            dataSet = dicom.read_file(filePath)
            
            modality = dataSet[0x0008, 0x0060].value
            
            if "Columns" in dataSet:    
                columns = dataSet[0x0028, 0x0011].value
                rows = dataSet[0x0028, 0x0010].value
            else:
                columns = 0
                rows = 0 
            
            if "NumberOfFrames" in dataSet:
                numberOfFrames = dataSet[0x0028, 0x0008].value
                countNoBlankInstance = 0
            else:
                numberOfFrames = 0
            
            if columns > 0:
                if countNoBlankInstance == 0:
                    if "BitsStored" in dataSet:
                        bitsStored = dataSet[0x0028, 0x0101].value
                    else:
                        bitsStored = None

                    if "FrameOfReferenceUID" in dataSet:
                        frameOfReferenceUID = dataSet[0x0020, 0x0052].value
                    else:
                        frameOfReferenceUID = None

                    if "PixelSpacing" in dataSet:
                        pixelSpacing = float(dataSet[0x0028, 0x0030].value[0])
                    else:
                        if numberOfFrames > 0:
                            if "PerFrameFunctionalGroupsSequence" in dataSet:
                                try:
                                    pixelSpacing = float(dataSet[0x5200, 0x9230][0][0x0028, 0x9110][0][0x0028, 0x0030].value[0])
                                except KeyError:
                                    pixelSpacing = None
                            else:
                                pixelSpacing = None
                        else:
                            pixelSpacing = None

                    if "WindowWidth" in dataSet:
                        if isinstance(dataSet[0x0028, 0x1051].value, (tuple, list)) :
                            windowWidth = float(dataSet[0x0028, 0x1051].value[0])
                        else:
                            windowWidth = float(dataSet[0x0028, 0x1051].value)
                    else:
                        if numberOfFrames > 0:
                            if "PerFrameFunctionalGroupsSequence" in dataSet:
                                try:
                                    if type(dataSet[0x5200, 0x9230][0][0x0028, 0x9132][0][0x0028, 0x1051].value) in (tuple, list):
                                        windowWidth = float(dataSet[0x5200, 0x9230][0][0x0028, 0x9132][0][0x0028, 0x1051].value[0])
                                    else:
                                        windowWidth = float(dataSet[0x5200, 0x9230][0][0x0028, 0x9132][0][0x0028, 0x1051].value)
                                except KeyError:
                                    windowWidth = None
                            else:
                                windowWidth = None
                        else:
                            windowWidth = None

                    if "WindowCenter" in dataSet:
                        if isinstance(dataSet[0x0028, 0x1050].value, (tuple, list)):
                            windowCenter = float(dataSet[0x0028, 0x1050].value[0]) 
                        else:
                            windowCenter = float(dataSet[0x0028, 0x1050].value)
                    else:
                        if numberOfFrames > 0:
                            if "PerFrameFunctionalGroupsSequence" in dataSet:
                                try:
                                    if type(dataSet[0x5200, 0x9230][0][0x0028, 0x9132][0][0x0028, 0x1050].value) in (tuple, list):
                                        windowCenter = float(dataSet[0x5200, 0x9230][0][0x0028, 0x9132][0][0x0028, 0x1050].value[0]) 
                                    else:
                                        windowCenter = float(dataSet[0x5200, 0x9230][0][0x0028, 0x9132][0][0x0028, 0x1050].value)
                                except KeyError:
                                    windowCenter = None
                            else:
                                windowCenter = None
                        else:
                            windowCenter = None

                    if "RescaleSlope" in dataSet:
                        rescaleSlope = float(dataSet[0x0028, 0x1053].value)
                    else:
                        if numberOfFrames > 0:
                            if "PerFrameFunctionalGroupsSequence" in dataSet:
                                try:
                                    rescaleSlope = float(dataSet[0x5200, 0x9230][0][0x0028, 0x9145][0][0x0028, 0x1053].value)
                                except KeyError:
                                    rescaleSlope = None
                            else:
                                rescaleSlope = None
                        else:
                            rescaleSlope = None

                    if "RescaleIntercept" in dataSet:
                        rescaleIntercept = float(dataSet[0x0028, 0x1052].value)
                    else:
                        if numberOfFrames > 0:
                            if "PerFrameFunctionalGroupsSequence" in dataSet:
                                try:
                                    rescaleIntercept = float(dataSet[0x5200, 0x9230][0][0x0028, 0x9145][0][0x0028, 0x1052].value)
                                except KeyError:
                                    rescaleSlope = None
                            else:
                                rescaleIntercept = None
                        else:
                            rescaleIntercept = None
                    
                    if "SliceThickness" in dataSet:
                        sliceThickness = float(dataSet[0x0018, 0x0050].value)
                    else:
                        if numberOfFrames > 0:
                            if "PerFrameFunctionalGroupsSequence" in dataSet:
                                try:
                                    sliceThickness = float(dataSet[0x5200, 0x9230][0][0x0028, 0x9110][0][0x0018, 0x0050].value)
                                except KeyError:
                                    sliceThickness = None
                            else:
                                sliceThickness = None
                        else:                            
                            sliceThickness = None

                    if "ImageOrientationPatient" in dataSet:
                        imageOrientationPatient = [
                            float(dataSet[0x0020, 0x0037].value[0]),
                            float(dataSet[0x0020, 0x0037].value[1]),
                            float(dataSet[0x0020, 0x0037].value[2]),
                            float(dataSet[0x0020, 0x0037].value[3]),
                            float(dataSet[0x0020, 0x0037].value[4]),
                            float(dataSet[0x0020, 0x0037].value[5])
                        ]
                    else:
                        if numberOfFrames > 0:
                            if "PerFrameFunctionalGroupsSequence" in dataSet:
                                try:
                                    imageOrientationPatient = [
                                        float(dataSet[0x5200, 0x9230][0][0x0020, 0x9116][0][0x0020, 0x0037].value[0]),
                                        float(dataSet[0x5200, 0x9230][0][0x0020, 0x9116][0][0x0020, 0x0037].value[1]),
                                        float(dataSet[0x5200, 0x9230][0][0x0020, 0x9116][0][0x0020, 0x0037].value[2]),
                                        float(dataSet[0x5200, 0x9230][0][0x0020, 0x9116][0][0x0020, 0x0037].value[3]),
                                        float(dataSet[0x5200, 0x9230][0][0x0020, 0x9116][0][0x0020, 0x0037].value[4]),
                                        float(dataSet[0x5200, 0x9230][0][0x0020, 0x9116][0][0x0020, 0x0037].value[5])
                                    ]
                                except KeyError:
                                    imageOrientationPatient = None
                            else:
                                imageOrientationPatient = None
                        else:
                            imageOrientationPatient = None

                    if "ImagePositionPatient" in dataSet:
                        imagePositionPatients = []
                        imagePositionPatient = []
                        imagePositionPatient.append(float(dataSet[0x0020, 0x0032].value[0]))
                        imagePositionPatient.append(float(dataSet[0x0020, 0x0032].value[1]))
                        imagePositionPatient.append(float(dataSet[0x0020, 0x0032].value[2]))
                        imagePositionPatients.append(imagePositionPatient)
                    else:
                        if numberOfFrames > 0:
                            if "PerFrameFunctionalGroupsSequence" in dataSet:
                                try:
                                    imagePositionPatients = []
                                    imagePositionPatient = []
                                    imagePositionPatient.append(float(dataSet[0x5200, 0x9230][0][0x0020, 0x9113][0][0x0020, 0x0032].value[0]))
                                    imagePositionPatient.append(float(dataSet[0x5200, 0x9230][0][0x0020, 0x9113][0][0x0020, 0x0032].value[0]))
                                    imagePositionPatient.append(float(dataSet[0x5200, 0x9230][0][0x0020, 0x9113][0][0x0020, 0x0032].value[0]))
                                    imagePositionPatients.append(imagePositionPatient)
                                    imagePositionPatient = []
                                    imagePositionPatient.append(float(dataSet[0x5200, 0x9230][1][0x0020, 0x9113][0][0x0020, 0x0032].value[0]))
                                    imagePositionPatient.append(float(dataSet[0x5200, 0x9230][1][0x0020, 0x9113][0][0x0020, 0x0032].value[0]))
                                    imagePositionPatient.append(float(dataSet[0x5200, 0x9230][1][0x0020, 0x9113][0][0x0020, 0x0032].value[0]))
                                    imagePositionPatients.append(imagePositionPatient)
                                except KeyError:
                                    imagePositionPatients = None
                            else:
                                imagePositionPatients = None
                        else:
                            imagePositionPatients = None
                    if "FrameTime" in dataSet:
                        frameTime = float(dataSet[0x0018, 0x1063].value)
                    else:
                        frameTime = None
                elif countNoBlankInstance == 1:
                    if "ImagePositionPatient" in dataSet:
                        imagePositionPatient = []
                        imagePositionPatient.append(float(dataSet[0x0020, 0x0032].value[0]))
                        imagePositionPatient.append(float(dataSet[0x0020, 0x0032].value[1]))
                        imagePositionPatient.append(float(dataSet[0x0020, 0x0032].value[2]))
                        imagePositionPatients.append(imagePositionPatient)
                    else:
                        imagePositionPatients = None
                        
                if numberOfFrames > 0:                
                    for j in range(1, numberOfFrames + 1):
                        dicomsPath.append(filePath)
                        imagesPath.append("&studyUID=%s&seriesUID=%s&objectUID=%s&frameNumber=%s" % (study_uid, series_uid, instances[i]['sop_iuid'], j))
                        imagesFrame.append(j)
                        dimensions.append({
                            'columns': columns,
                            'rows': rows
                        })
                    group = insert_into_group(dicomsPath, imagesPath, numberOfFrames, dimensions, series_id, series_institution, patient_name, patient_rut, patient_sex, series_desc, study_desc, 
                                            series_body_part, bitsStored, modality, frameOfReferenceUID, pixelSpacing, windowWidth, windowCenter, rescaleSlope, rescaleIntercept, sliceThickness, 
                                            imageOrientationPatient, imagePositionPatients, imagesFrame, frameTime)
                    groups.append(group)
                    countNoBlankInstance = 0
                else:
                    sopInstanceUID = instances[i]['sop_iuid']
                    index = sopInstanceUID.rindex('.')
                    sopInstanceUID = sopInstanceUID[:index]
                    index = sopInstanceUID.rindex('.')
                    sopInstanceUID = sopInstanceUID[:index]
                    sop = {}
                    sop['sopInstanceUID'] = sopInstanceUID                
                    if len(sopInstanceUIDs) == 0:
                        sop['indexGroup'] = len(groups)
                        sopInstanceUIDs.append(sop)
                        dicomsPath.append(filePath)
                        imagesPath.append("&studyUID=%s&seriesUID=%s&objectUID=%s" % (study_uid, series_uid, instances[i]['sop_iuid']))
                        imagesFrame.append(1)
                        dimensions.append({
                            'columns': columns,
                            'rows': rows
                        })
                        group = insert_into_group(dicomsPath, imagesPath, numberOfFrames, dimensions, series_id, series_institution, patient_name, patient_rut, patient_sex, series_desc, study_desc, 
                                                series_body_part, bitsStored, modality, frameOfReferenceUID, pixelSpacing, windowWidth, windowCenter, rescaleSlope, rescaleIntercept, sliceThickness, 
                                                imageOrientationPatient, imagePositionPatients, imagesFrame, frameTime)
                        groups.append(group)
                        countNoBlankInstance += 1
                    elif len(sopInstanceUIDs) > 0:
                        for k in range(0, len(sopInstanceUIDs)):
                            if sopInstanceUIDs[k]['sopInstanceUID'] == sopInstanceUID:
                                imagePath = "&studyUID=%s&seriesUID=%s&objectUID=%s" % (study_uid, series_uid, instances[i]['sop_iuid'])
                                dimension = {}
                                dimension['columns'] = columns
                                dimension['rows'] = rows
                                groups[sopInstanceUIDs[k]['indexGroup']]['dicomsPath'].append(filePath)
                                groups[sopInstanceUIDs[k]['indexGroup']]['imagesPath'].append(imagePath)
                                groups[sopInstanceUIDs[k]['indexGroup']]['dimensions'].append(dimension)
                                groups[sopInstanceUIDs[k]['indexGroup']]['imagesFrame'].append(1)
                                sopInstanceUIDsNoMatch = True
                        if sopInstanceUIDsNoMatch is False:
                            sop['indexGroup'] = len(groups)
                            sopInstanceUIDs.append(sop)
                            dicomsPath.append(filePath)
                            imagesPath.append("&studyUID=%s&seriesUID=%s&objectUID=%s" % (study_uid, series_uid, instances[i]['sop_iuid']))
                            imagesFrame.append(1)
                            dimensions.append({
                                'columns': columns,
                                'rows': rows
                            })
                            group = insert_into_group(dicomsPath, imagesPath, numberOfFrames, dimensions, series_id, series_institution, patient_name, patient_rut, patient_sex, series_desc, study_desc, 
                                                    series_body_part, bitsStored, modality, frameOfReferenceUID, pixelSpacing, windowWidth, windowCenter, rescaleSlope, rescaleIntercept, sliceThickness, 
                                                    imageOrientationPatient, imagePositionPatients, imagesFrame, frameTime)
                            groups.append(group)
                            countNoBlankInstance = 0
                        else:
                            countNoBlankInstance += 1
                
            if i == (len(instances) - 1):
                for l in range(0, len(groups)):
                    SQL = "SELECT pk, sop_iuid FROM instance WHERE series_fk=%s AND inst_attrs LIKE 'application/pdf' ORDER BY LPAD(inst_no,10,'0')";
                    cur.execute(SQL, [groups[l]['name']])
                    reports = cur.fetchall()
                    if len(reports) == 0:
                        reports = None
                    study = {}
                    study['dicomPathsImages'] = groups[l]['dicomsPath']
                    study['images'] = groups[l]['imagesPath']
                    study['imagesFrame'] = groups[l]['imagesFrame']
                    study['numberOfFrames'] = groups[l]['numberOfFrames']
                    study['name'] = groups[l]['name']
                    study['institution'] = groups[l]['institution']
                    study['patient_name'] = groups[l]['patient_name']
                    study['patient_rut'] = groups[l]['patient_rut']
                    study['patient_sex'] = groups[l]['patient_sex']
                    study['series_desc'] = groups[l]['series_desc']
                    study['study_desc'] = groups[l]['study_desc']
                    study['series_body_part'] = groups[l]['series_body_part']
                    study['totalElements'] = len(groups[l]['imagesPath'])
                    study['bitsStored'] = groups[l]['bitsStored']
                    study['modality'] = groups[l]['modality']
                    study['dimensions'] = groups[l]['dimensions']
                    study['frameOfReferenceUID'] = groups[l]['frameOfReferenceUID']
                    study['pixelSpacing'] = groups[l]['pixelSpacing']
                    study['windowWidth'] = groups[l]['windowWidth']
                    study['windowCenter'] = groups[l]['windowCenter']
                    study['rescaleSlope'] = groups[l]['rescaleSlope']
                    study['rescaleIntercept'] = groups[l]['rescaleIntercept']
                    study['sliceThickness'] = groups[l]['sliceThickness']
                    study['imageOrientationPatient'] = groups[l]['imageOrientationPatient']
                    study['imagePositionPatient'] = groups[l]['imagePositionPatient']
                    study['frameTime'] = groups[l]['frameTime']
                    study['reports'] = reports
                    studies.append(study)
            
    start_response(status, [('Content-type', 'application/json')]) 
    
    return [json.dumps(studies)]

def insert_into_group(dicomsPath, imagesPath, numberOfFrames, dimensions, series_id, series_institution, patient_name, patient_rut, patient_sex, series_desc, study_desc, 
                    series_body_part, bitsStored, modality, frameOfReferenceUID, pixelSpacing, windowWidth, windowCenter, rescaleSlope, rescaleIntercept, sliceThickness, 
                    imageOrientationPatient, imagePositionPatients, imagesFrame, frameTime):
    group = {}
    group['dicomsPath'] = dicomsPath
    group['imagesPath'] = imagesPath
    group['imagesFrame'] = imagesFrame
    group['numberOfFrames'] = numberOfFrames
    group['dimensions'] = dimensions
    group['name'] = series_id
    group['institution'] = series_institution
    group['patient_name'] = patient_name
    group['patient_rut'] = patient_rut
    group['patient_sex'] = patient_sex
    group['series_desc'] = series_desc
    group['study_desc'] = study_desc
    group['series_body_part'] = series_body_part
    group['bitsStored'] = bitsStored
    group['modality'] = modality
    group['frameOfReferenceUID'] = frameOfReferenceUID
    group['pixelSpacing'] = pixelSpacing
    group['windowWidth'] = windowWidth
    group['windowCenter'] = windowCenter
    group['rescaleSlope'] = rescaleSlope
    group['rescaleIntercept'] = rescaleIntercept
    group['sliceThickness'] = sliceThickness
    group['imageOrientationPatient'] = imageOrientationPatient
    group['imagePositionPatient'] = imagePositionPatients
    group['frameTime'] = frameTime
    return group
    
