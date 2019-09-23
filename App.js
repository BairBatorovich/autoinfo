import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';

import AppContainer from './navigation/navigation';
import rootReducer from './store/rootReducer';

axios.defaults.baseURL = 'http://03transport.ru';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}