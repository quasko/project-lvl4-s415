import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import { messages, channels } from 'gon';
import io from 'socket.io-client';
import reducers from './reducers';
import App from './components/App';

import {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
  connectSocket,
  disconnectSocket,
  fetchMessages,
  fetchChannels,
} from './actions';


const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.dispatch(fetchMessages({ messages }));
store.dispatch(fetchChannels({ channels }));

const socket = io();

socket.on('newMessage', (message) => {
  store.dispatch(addMessage(message));
});

socket.on('newChannel', (channel) => {
  store.dispatch(addChannel(channel));
});

socket.on('renameChannel', (channel) => {
  store.dispatch(renameChannel(channel));
});

socket.on('removeChannel', (channel) => {
  store.dispatch(removeChannel(channel));
});

socket.on('connect', () => {
  store.dispatch(connectSocket());
});

socket.on('disconnect', () => {
  store.dispatch(disconnectSocket());
});

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
