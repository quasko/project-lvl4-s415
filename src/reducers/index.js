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
  }, 'none',
);


const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { message: { data } } }) {
    console.log('23 ', data);
    const { byId, allIds } = state;
    const { message } = data.attributes;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
  [actions.fetchMessagesSuccess](state, { payload }) {
    console.log('33 ', payload);
    return {
      byId: _.keyBy(payload.messages, 'id'),
      allIds: payload.messages.map(m => m.id),
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  messageAddingState,
  messages,
  form: formReducer,
});
