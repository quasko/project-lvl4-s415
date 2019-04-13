import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messageAddingState = handleActions(
  {
    [actions.addMessageRequest]() {
      return 'requested';
    },
    [actions.addMessageSuccess]() {
      return 'finished';
    },
    [actions.addMessageFailure]() {
      return 'failed';
    },
    [actions.pushMessage]() {
      return 'pushed';
    },
  }, 'none',
);

const socketState = handleActions(
  {
    [actions.onConnect]() {
      return 'online';
    },
    [actions.onDisconnect]() {
      return 'offline';
    },
  }, 'none',
);

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.messages, 'id'),
      allIds: payload.messages.map(m => m.id),
    };
  },
  [actions.pushMessageSuccess](state, { payload: { message } }) {
    const { attributes } = message.data;

    const { byId, allIds } = state;

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  messageAddingState,
  messages,
  socketState,
  form: formReducer,
});
