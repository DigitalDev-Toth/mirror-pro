#!/usr/bin/python

import cgi
import cgitb
import sys
import dicom
import json

#cgitb.enable()
global_response = 000000;

def application(environ, start_response):
    global global_response
    global_response = start_response

    input = environ['wsgi.input']
    environ.setdefault('QUERY_STRING', '')
    form = cgi.FieldStorage(fp = input, environ = environ, keep_blank_values = 0)

    # POST params
    path = form.getvalue('path')
    # the request has the path to the DICOM?
    if path is None:
       return response400('the path of the DICOM file is needed.');

    frame = form.getvalue('frame')
    # the request has the frame of the image requested?
    if frame is None:
       return response400('the frame of the DICOM image is needed.');
    # the frame is a valid number?
    try:
        frame = int(frame)-1
    except Exception, e:
        return response400("frame must be a valid number.")

    rowsArray = form.getvalue('rowsArray')
    # the request has the rowsArray param?
    if rowsArray is None:
       return response400("the path of rowsArray array's are needed.");
    # rowsArray is a valid json?
    try :
        rowsArray = json.loads(rowsArray)
    except ValueError:
        return response400("the rowsArray is invalid.");
    # the arrays have coordenates (as indexes)?
    if len(rowsArray)==0  or len(rowsArray[0])!=2 :
        return response400("the rowsArray need to have coordenates.");

    dataSet = dicom.read_file(path)

    # Sometimes in the MR modality, the pixel_data isn't available. (it happens 'randomly')
    if 'PixelData' not in dataSet:
        return response500("MR Modality isn't working at the moment. (pixel_array not found).")

    rows    =  dataSet[0x0028, 0x0010].value
    columns =  dataSet[0x0028, 0x0011].value
    samplesPerPixel = dataSet[0x0028, 0x0002].value
    if "NumberOfFrames" in dataSet:
        numberOfFrames = dataSet[0x0028, 0x0008].value
    else:
        numberOfFrames = 1
    if frame<0 or frame>=numberOfFrames :
        return response400("frame number invalid");

    # if Monocrome (1 pixel per coordenate)
    if samplesPerPixel==1 :
        intensity = getIntensityValues_monochrome(rowsArray, dataSet.pixel_array, rows, columns, numberOfFrames, frame)
    # If RGB (3 pixels per coordenate)
    else :
        planarConfiguration = dataSet[0x0028,0x0006].value
        intensity = getIntensityValues_rgb(rowsArray, dataSet.pixel_array, rows, columns, samplesPerPixel, planarConfiguration, numberOfFrames, frame)

    result = {
        'Rows'            : str(rows),
        'Columns'         : str(columns),
        'BitsStored'      : str(dataSet[0x0028, 0x0101].value),
        'Modality'        : str(dataSet[0x0008, 0x0060].value),
        'SamplesPerPixel' : str(samplesPerPixel),
        'NumberOfFrames'  : str(numberOfFrames),
        'PhotometricInterpretation' : str(dataSet[0x0028, 0x0004].value),
        'pointsCount'     : str(intensity['count']),
        'intensity'       : {
            'min' : str(intensity['min']),
            'avg' : str(intensity['avg']),
            'max' : str(intensity['max'])
        },
        ## Calculate the hounsfield values, null if doesn't exist
        'hounsfield'   : getHounsfield(dataSet, intensity['min'], intensity['avg'], intensity['max'])
    }
    return responseJson200(result)

def responseJson200(message):
    jsonMessage = json.JSONEncoder().encode(message);
    response_headers = [('Content-type', 'text/json'), ('Content-Length', str(len(jsonMessage)))]
    global_response('200 Ok', response_headers)
    return [jsonMessage]

def response400(message):
    response_headers = [('Content-type', 'text/plain'), ('Content-Length', str(len(message)))]
    global_response('400 Bad Request', response_headers)
    return [message]

def response500(message):
    response_headers = [('Content-type', 'text/plain'), ('Content-Length', str(len(message)))]
    global_response('500 Internal Server Error', response_headers)
    return [message]

def getIntensityValues_monochrome(rowsArray, pixelData, rows, columns, numberOfFrames, frame) :
    count = 0
    totalIntensity = 0
    minIntensity   = float('inf')
    maxIntensity   = float('-inf')
    for row in rowsArray:
        indexStart = row[0]
        indexEnd   = row[1]
        for index in range(indexStart, indexEnd+1):
            px = index%columns
            py = (index-px)/columns
            if numberOfFrames==1 :
                intensity = pixelData[py][px]
            else:
                intensity = pixelData[frame][py][px]
            totalIntensity += intensity
            count += 1
            # check for the min and max hounsfield value
            minIntensity = intensity if intensity<minIntensity else minIntensity
            maxIntensity = intensity if intensity>maxIntensity else maxIntensity
    avgIntensity = totalIntensity/count if count>0 else 0
    return {
        'min': minIntensity,
        'avg': avgIntensity,
        'max': maxIntensity,
        'count': count
    }

def getIntensityValues_rgb(rowsArray, pixelData, rows, columns, samplesPerPixel, planarConfiguration, numberOfFrames, frame) :
    count = 0
    totalIntensity = [0,0,0]
    minIntensity   = [ float('inf'),  float('inf'), float('inf') ]
    minMonochrome  = float('inf')
    maxIntensity   = [float('-inf'), float('-inf'), float('-inf')]
    maxMonochrome  = float('-inf')

    # more about plannar configuration:  https://www.medicalconnections.co.uk/kb/Planar_configuration
    # pydicom has en error reading the sataset for a RBG image, this is a workaround (see http://code.google.com/p/pydicom/issues/detail?id=150)
    # WARNING!!!!! ASUMING THAT THE DICOM HAS "NumberOfFrames=1"
    if planarConfiguration==0 : # Default value
        pixelDataPlanarConf = pixelData.reshape(numberOfFrames, rows, columns, samplesPerPixel)
    else:
        pixelDataPlanarConf = pixelData.reshape(samplesPerPixel, numberOfFrames, rows, columns)

    for row in rowsArray:
        indexStart = row[0]
        indexEnd   = row[1]
        for index in range(indexStart, indexEnd+1):
            # convert the index, back to x,y coords
            # in the client side is made this operation: "var index = columns*py + px;"
            px = index%columns
            py = (index-px)/columns
            if planarConfiguration==0 :
                red   = pixelDataPlanarConf[frame][py][px][0]   # asuming frame 0
                green = pixelDataPlanarConf[frame][py][px][1]
                blue  = pixelDataPlanarConf[frame][py][px][2]
            else :
                red   = pixelDataPlanarConf[0][frame][py][px]   # asuming frame 0
                green = pixelDataPlanarConf[1][frame][py][px]
                blue  = pixelDataPlanarConf[2][frame][py][px]

            # conver the RGB to a monochrome scale to compare minimun and maximun values
            mono = red*0.29 + green*0.59 + blue*0.14
            # check for the min and max
            if mono<minMonochrome :
                minMonochrome = mono
                minIntensity = [red, green, blue]
            if mono>maxMonochrome :
                maxMonochrome = mono
                maxIntensity = [red, green, blue]
            totalIntensity[0] += red
            totalIntensity[1] += green
            totalIntensity[2] += blue
            count += 1
    if count>0 :
        avgIntensity = [ totalIntensity[0]/count, totalIntensity[1]/count, totalIntensity[2]/count]
    else :
        avgIntensity = [0,0,0]

    return {
        'min': minIntensity,
        'avg': avgIntensity,
        'max': maxIntensity,
        'count': count
    }

def getHounsfield(dataSet, minIntensity, avgIntensity, maxIntensity) :
    # the modalities ECG, XA, MR and US doesn't have hounsfield (???)

    if ('RescaleIntercept' in dataSet) and ('RescaleSlope' in dataSet) :
        rescaleIntercept = dataSet[0x0028, 0x1052].value
        rescaleSlope     = dataSet[0x0028, 0x1053].value
        minHS = rescaleSlope*minIntensity+rescaleIntercept
        avgHS = rescaleSlope*avgIntensity+rescaleIntercept
        maxHS = rescaleSlope*maxIntensity+rescaleIntercept
        return {
            'RescaleIntercept': str(rescaleIntercept),
            'RescaleSlope'    : str(rescaleSlope),
            'min'             : str(minHS),
            'avg'             : str(avgHS),
            'max'             : str(maxHS)
        }
    else :
        ## return nothing, so the json.hounsfield is equal to null
        return