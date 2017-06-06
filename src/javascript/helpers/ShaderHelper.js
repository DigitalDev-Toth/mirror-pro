/**
 * Fragment shader for images of 8-bits.
 *
 * @type       {string}
 */
export const fragmentEight = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform highp float uWW;
  uniform highp float uWC;
  uniform highp float uAlpha;

  void main(void) {
    highp vec4 texcolor = texture2D(uTexture, vUv);
    highp float intensity = texcolor.r * 256.0;
    highp float lower_bound = (uWW * -0.5) + uWC;
    highp float upper_bound = (uWW *  0.5) + uWC;
    intensity = (intensity - lower_bound) / (upper_bound - lower_bound);
    gl_FragColor = vec4(intensity, intensity, intensity, uAlpha);
  }
`;

/**
 * Fragment shader for images of 16-bits.
 *
 * @type       {string}
 */
export const fragmentSixteen = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform highp float uWW;
  uniform highp float uWC;
  uniform highp float uRS;
  uniform highp float uRI;
  uniform highp float uAlpha;

  void main(void) {
    highp vec4 texcolor = texture2D(uTexture, vUv);
    highp float intensity = texcolor.r * 256.0 + texcolor.a * 65536.0;
    intensity = intensity * uRS + uRI;
    highp float lower_bound = (uWW * -0.5) + uWC;
    highp float upper_bound = (uWW *  0.5) + uWC;
    intensity = (intensity - lower_bound) / (upper_bound - lower_bound);
    gl_FragColor = vec4(intensity, intensity, intensity, uAlpha);
  }
`;

/**
 * Vertex shader for images.
 *
 * @type       {string}
 */
export const vertex = `
  varying vec2 vUv;

  void main(void) {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
