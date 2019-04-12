import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { messages } from 'gon';
import cookies from 'js-cookie';
import faker from 'faker';
import reducers from './reducers';
import App from './components/App';
import { fetchMessages, pushMessage } from './actions';

if (!cookies.get().userName) {
  cookies.set('userName', faker.name.firstName());
}

const { userName } = cookies.get();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

const socket = io();
socket.on('newMessage', (m) => {
  console.log('from io ', m.data);
  store.dispatch(pushMessage(m, userName));
});

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
