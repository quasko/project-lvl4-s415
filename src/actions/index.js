import axios from 'axios';
import { createAction } from 'redux-actions';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const openChannelsModal = createAction('CHANNELS_OPEN_MODAL');
export const closeChannelsModal = createAction('CHANNELS_CLOSE_MODAL');




export const fetchMessagesSuccess = createAction('MESSAGE_FETCH_SUCCESS');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');

export const setActiveChannelAction = createAction('SET_ACTIVE_CHANNEL');

export const pushMessageSuccess = createAction('MESSAGE_PUSH_SUCCESS');

export const onConnect = createAction('SOCKET_CONNECT');
export const onDisconnect = createAction('SOCKET_DISCONNECT');

export const addMessage = (message, activeChannelId) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = `/api/v1/channels/${activeChannelId}/messages`;
    const response = await axios.post(url, message);
    dispatch(addMessageSuccess({ message: response.data }));
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};

export const pushMessage = (message, name) => (dispatch) => {
  dispatch(pushMessageSuccess({ message, name }));
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

export const addChannel = channel => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const url = '/api/v1/channels';
    const response = await axios.post(url, channel);
    console.log('61 ', response);
    //dispatch(addChannelSuccess({ channel: response.data }));
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
}
