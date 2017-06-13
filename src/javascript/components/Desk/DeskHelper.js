import dicomParser from 'dicom-parser';
import * as THREE from 'three';
import {
  fragmentEight,
  fragmentSixteen,
  vertex,
} from '../../helpers/ShaderHelper';

/**
 * Gets the dicom.
 *
 * @param      {object}    deskData  The desk data
 * @param      {object}    actions   The actions to update the store
 * @return     {Function}  The dicom.
 */
export const getDicom = (deskData, actions) => {
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

    actions.updateWindowLevel(dicom.WindowCenter, dicom.WindowCenter);

    drawDicom(dicom, deskData);
  });
};

/**
 * Draws a dicom image into canvas with webgl context.
 *
 * @param      {object}  dicom     The dicom parsed info
 * @param      {object}  deskData  The desk data
 */
/* eslint-disable no-param-reassign */
const drawDicom = (dicom, deskData) => {
  const width = window.innerWidth - 230;
  const height = window.innerHeight - 55;

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

  let geometry = new THREE.PlaneGeometry(width, deskData.canvas.height);
  let material = new THREE.MeshBasicMaterial({ color: 'black' });

  deskData.planeParent = new THREE.Mesh(geometry, material);
  deskData.pivot = new THREE.Object3D();
  deskData.originalWindow.center = dicom.WindowCenter;
  deskData.originalWindow.width = dicom.WindowWidth;
  deskData.window.center = dicom.WindowCenter;
  deskData.window.width = dicom.WindowWidth;

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
      uWW: { type: 'f', value: deskData.window.width },
      uWC: { type: 'f', value: deskData.window.center },
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
  geometry = new THREE.PlaneGeometry(height, height);
  material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vShader,
    fragmentShader: fShader,
  });

  deskData.plane = new THREE.Mesh(geometry, material);
  deskData.pivot.add(deskData.plane);
  deskData.planeParent.add(deskData.pivot);
  deskData.scene.add(deskData.planeParent);
  deskData.camera.position.z = 600;

  animate(deskData);
};

/**
 * Make the loop to handle the animation to rendering the canvas with webgl context.
 *
 * @param      {object}  arg1           The common desk data
 * @param      {object}  arg1.scene     The scene
 * @param      {object}  arg1.renderer  The renderer
 * @param      {object}  arg1.camera    The camera
 */
export const animate = ({ scene, renderer, camera }) => {
  if (scene !== null) {
    renderer.render(scene, camera);
  }

  window.requestAnimationFrame(() => animate({ scene, renderer, camera }));
};
