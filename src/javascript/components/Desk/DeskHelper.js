import dicomParser from 'dicom-parser';
import * as THREE from 'three';
import {
  fragmentEight,
  fragmentSixteen,
  vertex,
} from '../../helpers/ShaderHelper';

export const getDicom = (deskData) => {
  window.fetch('/assets/files/5B3A9D62.dcm')
  .then(response => response.arrayBuffer())
  .then(response => new Uint8Array(response))
  .then(response => dicomParser.parseDicom(response))
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

    return drawDicom(dicom, deskData);
  });
};

/* eslint-disable no-param-reassign */
const drawDicom = (dicom, deskData) => {
  const width = 500;
  const height = 500;

  deskData.canvas = document.getElementById('Desk');
  deskData.canvas.width = width;
  deskData.canvas.height = height;

  deskData.renderer = new THREE.WebGLRenderer({ canvas: deskData.canvas });
  deskData.renderer.setSize(deskData.canvas.width, deskData.canvas.height);
  deskData.scene = new THREE.Scene();
  deskData.camera = new THREE.PerspectiveCamera(
    45,
    deskData.canvas.width / deskData.canvas.height,
    0.1,
    1000,
  );

  let geometry = new THREE.PlaneGeometry(500, 500);
  let material = new THREE.MeshBasicMaterial({ color: 'black' });

  deskData.planeParent = new THREE.Mesh(geometry, material);
  deskData.pivot = new THREE.Object3D();

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

  deskData.plane = new THREE.Mesh(geometry, material);
  deskData.pivot.add(plane);
  deskData.planeParent.add(deskData.pivot);
  deskData.scene.add(deskData.planeParent);
  deskData.camera.position.z = 600;

  animate(deskData);

  return deskData;
};

export const animate = ({ scene, renderer, camera }) => {
  if (scene !== null) {
    renderer.render(scene, camera);
  }

  window.requestAnimationFrame(() => animate({ scene, renderer, camera }));
};

export const zoomDownHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  deskData.lastY = y;

  const vector = new THREE.Vector3();

  vector.set(
    ((x / 500) * 2) - 1,
    (-(y / 500) * 2) + 1,
    0.5,
  );
  vector.unproject(deskData.camera);

  const dir = vector.sub(deskData.camera.position).normalize();
  const distance = -deskData.camera.position.z / dir.z;

  deskData.globalMouse = deskData.camera
  .position
  .clone()
  .add(dir.multiplyScalar(distance));
  deskData.localMouse = deskData.planeParent
  .worldToLocal(new THREE.Vector3(deskData.globalMouse.x, deskData.globalMouse.y, 0.0));
  deskData.scaleDiff.x = deskData.globalMouse.x - deskData.localMouse.x;
  deskData.scaleDiff.y = deskData.globalMouse.y - deskData.localMouse.y;
  deskData.origin.x = deskData.localMouse.x;
  deskData.origin.y = deskData.localMouse.y;
};

export const zoomMoveHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const y = event.clientY - rect.top;
  const delta = Math.abs(y - deskData.lastY) / 1000;

  if (deskData.lastY > y) {
    deskData.ratio = 1.03 + delta;
  } else {
    deskData.ratio = 0.97 - delta;
  }

  deskData.scale *= deskData.ratio;

  zoomDicom(deskData);

  deskData.lastY = y;
};

const zoomDicom = (deskData) => {
  const { scale, origin, scaleDiff } = deskData;

  deskData.planeParent.scale.x = scale;
  deskData.planeParent.scale.y = scale;
  deskData.planeParent.position.x = (-origin.x * (scale - 1)) + scaleDiff.x;
  deskData.planeParent.position.y = (-origin.y * (scale - 1)) + scaleDiff.y;
};

export const panDownHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const vector = new THREE.Vector3();

  vector.set(
    ((x / 500) * 2) - 1,
    (-(y / 500) * 2) + 1,
    0.5,
  );
  vector.unproject(deskData.camera);

  const dir = vector.sub(deskData.camera.position).normalize();
  const distance = -deskData.camera.position.z / dir.z;

  deskData.globalMouse = deskData.camera
  .position
  .clone()
  .add(dir.multiplyScalar(distance));
  deskData.localMouse = deskData.planeParent
  .worldToLocal(new THREE.Vector3(
    deskData.globalMouse.x,
    deskData.globalMouse.y,
    0.0,
  ));
};

export const panMoveHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  deskData.lastY = y;

  const vector = new THREE.Vector3();

  vector.set(
    ((x / 500) * 2) - 1,
    (-(y / 500) * 2) + 1,
    0.5,
  );
  vector.unproject(deskData.camera);

  const dir = vector.sub(deskData.camera.position).normalize();
  const distance = -deskData.camera.position.z / dir.z;
  const global = deskData.camera
  .position
  .clone()
  .add(dir.multiplyScalar(distance));

  deskData.pan.x = (global.x - deskData.globalMouse.x);
  deskData.pan.y = (global.y - deskData.globalMouse.y);
  deskData.panDiff.x = deskData.globalMouse.x - deskData.localMouse.x;
  deskData.panDiff.y = deskData.globalMouse.y - deskData.localMouse.y;

  panDicom(deskData);
};

const panDicom = (deskData) => {
  const { pan, panDiff, localMouse, scale } = deskData;

  deskData.planeParent.position.x = (pan.x + panDiff.x) - (localMouse.x * (scale - 1));
  deskData.planeParent.position.y = (pan.y + panDiff.y) - (localMouse.y * (scale - 1));
};

export const rotateDownHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  deskData.lastY = y;

  const vector = new THREE.Vector3();

  vector.set(
    ((x / 500) * 2) - 1,
    (-(y / 500) * 2) + 1,
    0.5,
  );
  vector.unproject(deskData.camera);

  const dir = vector.sub(deskData.camera.position).normalize();
  const distance = -deskData.camera.position.z / dir.z;

  deskData.globalMouse = deskData.camera
  .position
  .clone()
  .add(dir.multiplyScalar(distance));
  deskData.localMouse = deskData.plane
  .worldToLocal(new THREE.Vector3(
    deskData.globalMouse.x,
    deskData.globalMouse.y,
    0.0,
  ));
  deskData.rotateDiff.x = deskData.globalMouse.x - deskData.localMouse.x;
  deskData.rotateDiff.y = deskData.globalMouse.y - deskData.localMouse.y;
};

export const rotateMoveHandler = (deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const y = event.clientY - rect.top;

  deskData.rotate += (y - deskData.lastY) / 50;

  rotateDicom(deskData);

  deskData.lastY = y;
};

const rotateDicom = (deskData) => {
  const { localMouse, rotate, rotateDiff } = deskData;

  deskData.plane.position.x = -localMouse.x;
  deskData.plane.position.y = -localMouse.y;
  deskData.pivot.rotation.z = rotate;
  deskData.planeParent.position.x = localMouse.x + rotateDiff.x;
  deskData.planeParent.position.y = localMouse.y + rotateDiff.y;
};
