import { createStore } from 'redux';
import reducers from '../reducers/reducers';
import { NODE_ENV } from './constants';

/**
 * Create the store. If the environment is development,
 * then add the devtools chrome plugin for tracking the store behavior.
 *
 * @return     {Function}  The store instance.
 */
const store = () => {
  if (NODE_ENV === 'production') {
    return createStore(reducers);
  }

  const storeInstance = createStore(
    reducers,
    /* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  if (module.hot) {
    /* eslint-disable global-require */
    module.hot.accept('../reducers/reducers', () =>
      storeInstance.replaceReducer(require('../reducers/reducers')),
    );
  }

  return storeInstance;
};

export default store();
