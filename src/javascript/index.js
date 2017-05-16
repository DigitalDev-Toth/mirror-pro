import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import store from './settings/store';
import MirrorPro from './containers/MirrorPro';

const attachHotLoader = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('mirro-pro'),
  );
};

attachHotLoader(MirrorPro);

if (module.hot) {
  module.hot.accept('./containers/MirrorPro', () => {
    attachHotLoader(MirrorPro);
  });
}
