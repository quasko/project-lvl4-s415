import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import reducers from './reducers';
import App from './components/App';
// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
