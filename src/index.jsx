import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import { messages } from 'gon';

import reducers from './reducers';
import App from './components/App';
import { fetchMessages } from './actions';


const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.dispatch(fetchMessages(messages));

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
