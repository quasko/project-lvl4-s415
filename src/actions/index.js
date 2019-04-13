import axios from 'axios';
import { createAction } from 'redux-actions';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const fetchMessagesSuccess = createAction('MESSAGE_FETCH_SUCCESS');

export const pushMessageSuccess = createAction('MESSAGE_PUSH_SUCCESS');

export const onConnect = createAction('SOCKET_CONNECT');
export const onDisconnect = createAction('SOCKET_DISCONNECT');

export const addMessage = message => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = '/api/v1/channels/1/messages';
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

export const fetchMessages = messages => (dispatch) => {
  dispatch(fetchMessagesSuccess({ messages }));
};
