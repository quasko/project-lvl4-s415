import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessage](state, { payload: { message } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [message.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  messages,
  form: formReducer,
});
