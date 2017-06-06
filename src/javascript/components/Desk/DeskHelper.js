import dicomParser from 'dicom-parser';
import * as THREE from 'three';

import {
  fragmentEight,
  fragmentSixteen,
  vertex,
} from '../../helpers/ShaderHelper';

export const getDicom = () => {
  window.fetch('/assets/files/5B3A9D62.dcm')
  .then((response) => {
    console.log(response);

    return response.arrayBuffer();
  })
  .then((response) => {
    const byteArray = new Uint8Array(response);
    console.log(byteArray);

    return byteArray;
  })
  .then((response) => {
    const dataSet = dicomParser.parseDicom(response);
    console.log(dataSet);

    return dataSet;
  })
  .then((response) => {
    const dicom = {
      Columns: response.uint16('x00280011'),
      Rows: response.uint16('x00280010'),
      BitsStored: response.uint16('x00280101'),
      BitsAllocated: response.uint16('x00280100'),
      RescaleIntercept: response.intString('x00281052'),
      RescaleSlope: response.intString('x00281053'),
      WindowWidth: response.intString('x00281051'),
      WindowCenter: response.intString('x00281050'),
    };

    if (dicom.BitsStored > 8) {
      dicom.PixelData = new Uint8Array(
        response.byteArray.buffer,
        response.elements.x7fe00010.dataOffset,
        dicom.Columns * dicom.Rows * 2,
      );
    } else {
      dicom.PixelData = new Uint8Array(
        response.byteArray.buffer,
        response.elements.x7fe00010.dataOffset,
        dicom.Columns * dicom.Rows,
      );
    }

    console.log(dicom);

    drawDicom(dicom);
  });
};

const drawDicom = (dicom) => {
  const width = window.innerWidth - 230;
  const height = window.innerHeight - 40;
  const canvas = document.getElementById('Desk');

  canvas.width = width;
  canvas.height = height;

  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.setSize(canvas.width, canvas.height);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);

  let geometry = new THREE.PlaneGeometry(500, 500);
  let material = new THREE.MeshBasicMaterial({ color: 'black' });

  const planeParent = new THREE.Mesh(geometry, material);
  const pivot = new THREE.Object3D();

  const vShader = vertex;
  let fShader = null;
  let texture = null;
  let uniforms = null;

  if (dicom.BitsStored > 8) {
    fShader = fragmentSixteen;
    texture = new THREE.DataTexture(
      dicom.PixelData,
      dicom.Columns,
      dicom.Rows,
      THREE.LuminanceAlphaFormat,
    );
    texture.needsUpdate = true;
    uniforms = {
      uTexture: { type: 't', value: texture },
      uWW: { type: 'f', value: dicom.WindowWidth },
      uWC: { type: 'f', value: dicom.WindowCenter },
      uRS: { type: 'f', value: dicom.RescaleSlope },
      uRI: { type: 'f', value: dicom.RescaleIntercept },
      uAlpha: { type: 'f', value: 1 },
    };
  } else {
    fShader = fragmentEight;
    texture = new THREE.DataTexture(
      dicom.PixelData,
      dicom.Columns,
      dicom.Rows,
      THREE.LuminanceFormat,
    );
    texture.needsUpdate = true;
    uniforms = {
      uTexture: { type: 't', value: texture },
      uWW: { type: 'f', value: dicom.WindowWidth },
      uWC: { type: 'f', value: dicom.WindowCenter },
      uAlpha: { type: 'f', value: 1 },
    };
  }
  geometry = new THREE.PlaneGeometry(500, 500);
  material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vShader,
    fragmentShader: fShader,
  });
  const plane = new THREE.Mesh(geometry, material);

  pivot.add(plane);
  planeParent.add(pivot);
  scene.add(planeParent);
  camera.position.z = 600;

  animate(scene, renderer, camera);
};

export const animate = (scene, renderer, camera) => {
  if (scene !== null) {
    renderer.render(scene, camera);
  }

  window.requestAnimationFrame(() => animate(scene, renderer, camera));
};
