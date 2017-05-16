import { createStore } from 'redux';
import reducers from '../reducers/reducers';
import { NODE_ENV } from './constants';

/**
 * @name store
 * @description
 *
 * Create the redux store. If the environment is development,
 * then add the devtools chrome plugin for tracking the store behavior.
 *
 * @return {Object} The redux store object.
 */
const store = () => {
  if (NODE_ENV === 'production') {
    return createStore(reducers);
  }

  const store = createStore(
    reducers,
    /* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  if (module.hot) {
    module.hot.accept('../reducers/reducers', () =>
      store.replaceReducer(require('../reducers/reducers'))
    );
  }

  return store;
};

export default store();
