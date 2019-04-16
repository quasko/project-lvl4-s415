import axios from 'axios';
import { createAction } from 'redux-actions';

export const postMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const postMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const postMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const postChannelRequest = createAction('CHANNEL_POST_REQUEST');
export const postChannelSuccess = createAction('CHANNEL_POST_SUCCESS');
export const postChannelFailure = createAction('CHANNEL_POST_FAILURE');

export const addChannelAction = createAction('CHANNEL_ADD_SUCCESS');

export const openChannelsModal = createAction('CHANNELS_OPEN_MODAL');
export const closeChannelsModal = createAction('CHANNELS_CLOSE_MODAL');

export const patchChannelRequest = createAction('CHANNEL_PATCH_REQUEST');
export const patchChannelSuccess = createAction('CHANNEL_PATCH_SUCCESS');
export const patchChannelFailure = createAction('CHANNEL_PATCH_FAILURE');

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');

export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');

export const fetchMessagesSuccess = createAction('MESSAGE_FETCH_SUCCESS');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');

export const setActiveChannelAction = createAction('SET_ACTIVE_CHANNEL');

export const addMessageAction = createAction('MESSAGE_ADD_ACTION');

export const onConnect = createAction('SOCKET_CONNECT');
export const onDisconnect = createAction('SOCKET_DISCONNECT');

export const postMessage = (message, activeChannelId) => async (dispatch) => {
  dispatch(postMessageRequest());
  try {
    const url = `/api/v1/channels/${activeChannelId}/messages`;
    const response = await axios.post(url, message);
    dispatch(postMessageSuccess({ message: response.data }));
  } catch (e) {
    dispatch(postMessageFailure());
    throw e;
  }
};

export const addMessage = (message, name) => (dispatch) => {
  dispatch(addMessageAction({ message, name }));
};

export const setActiveChannel = id => (dispatch) => {
  dispatch(setActiveChannelAction({ id }));
};

export const fetchMessages = messages => (dispatch) => {
  dispatch(fetchMessagesSuccess({ messages }));
};

export const fetchChannels = channels => (dispatch) => {
  dispatch(fetchChannelsSuccess({ channels }));
};

export const postChannel = channel => async (dispatch) => {
  dispatch(postChannelRequest());
  try {
    const url = '/api/v1/channels';
    const response = await axios.post(url, channel);
    dispatch(postChannelSuccess({ channel: response.data }));
  } catch (e) {
    dispatch(postChannelFailure());
    throw e;
  }
};

export const addChannel = channel => (dispatch) => {
  dispatch(addChannelAction(channel));
};

export const patchChannel = (channel, id) => async (dispatch) => {
  dispatch(patchChannelRequest());

  try {
    const url = `/api/v1/channels/${id}`;
    await axios.patch(url, channel);
    dispatch(patchChannelSuccess());
  } catch (e) {
    dispatch(patchChannelFailure());
    throw e;
  }
};

export const deleteChannel = id => async (dispatch) => {
  dispatch(deleteChannelRequest());

  try {
    const url = `/api/v1/channels/${id}`;
    await axios.delete(url, id);
    dispatch(deleteChannelSuccess());
  } catch (e) {
    dispatch(patchChannelFailure());
    throw e;
  }
};

export const removeChannel = id => (dispatch) => {
  dispatch(removeChannelSuccess(id));
};

export const renameChannel = channel => (dispatch) => {
  dispatch(renameChannelSuccess(channel));
};

export const openModal = mode => (dispatch) => {
  dispatch(openChannelsModal(mode));
};
