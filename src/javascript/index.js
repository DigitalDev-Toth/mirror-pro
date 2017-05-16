import '../stylesheet/index.scss';
// import React from 'react';
// import { render } from 'react-dom';
import HelloWorld from './HelloWorld';

// render(
//   <HelloWorld project='mirror_pro' />,
//   document.getElementById('app'),
// );
// render(
//   <div>WOOOOLA</div>,
//   document.getElementById('app'),
// );

document.getElementById('mirro-pro').innerHTML = `es${2015} ${HelloWorld}`;
