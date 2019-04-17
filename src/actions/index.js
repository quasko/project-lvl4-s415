import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchChannels = createAction('CHANNELS_FETCH');
export const addChannel = createAction('CHANNEL_ADD');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const renameChannel = createAction('CHANNEL_RENAME_SUCCESS');
export const setActiveChannel = createAction('SET_ACTIVE_CHANNEL');

export const fetchMessages = createAction('MESSAGE_FETCH');
export const addMessage = createAction('MESSAGE_ADD');

export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');

export const connectSocket = createAction('SOCKET_CONNECT');
export const disconnectSocket = createAction('SOCKET_DISCONNECT');

export const postMessage = (message, activeChannelId) => async () => {
  const url = routes.messagesUrl(activeChannelId);
  await axios.post(url, message);
};

export const postChannel = channel => async () => {
  const url = routes.channelsUrl();
  await axios.post(url, channel);
};

export const patchChannel = (channel, id) => async () => {
  const url = routes.channelUrl(id);
  await axios.patch(url, channel);
};

export const deleteChannel = id => async () => {
  const url = routes.channelUrl(id);
  await axios.delete(url, id);
};
