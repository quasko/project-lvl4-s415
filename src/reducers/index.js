import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messagePostState = handleActions(
  {
    [actions.postMessageRequest]() {
      return 'requested';
    },
    [actions.postMessageSuccess]() {
      return 'finished';
    },
    [actions.postMessageFailure]() {
      return 'failed';
    },
    [actions.addMessage]() {
      return 'added';
    },
  }, 'none',
);

const channelPostState = handleActions(
  {
    [actions.postChannelRequest]() {
      return 'requested';
    },
    [actions.postChannelSuccess]() {
      return 'finished';
    },
    [actions.postChannelFailure]() {
      return 'failed';
    },
  }, 'none',
);

const channelsModalState = handleActions(
  {
    [actions.openChannelsModal](state, { payload: { mode } }) {
      return {
        open: true,
        mode,
      };
    },
    [actions.closeChannelsModal]() {
      return {
        open: false,
      };
    },
  }, { open: false },
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

const activeChannelId = handleActions(
  {
    [actions.setActiveChannelAction](state, { payload }) {
      return payload.id;
    },
    [actions.removeChannelSuccess]() {
      return 1;
    },
  }, 1,
);

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.messages, 'id'),
      allIds: payload.messages.map(m => m.id),
    };
  },
  [actions.addMessageAction](state, { payload: { message } }) {
    const { attributes } = message.data;

    const { byId, allIds } = state;

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.removeChannelSuccess](state, { payload: { data } }) {
    const { id } = data;
    const { byId } = state;
    const newById = _.omitBy(byId, item => item.channelId === id);
    const newAllIds = Object.keys(newById);
    return {
      byId: newById,
      allIds: newAllIds,
    };
  },
}, { byId: {}, allIds: [] });

const channels = handleActions({
  [actions.fetchChannelsSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.channels, 'id'),
      allIds: payload.channels.map(m => m.id),
    };
  },
  [actions.addChannelAction](state, { payload: { data } }) {
    const { attributes } = data;
    const { byId, allIds } = state;

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.renameChannelSuccess](state, { payload: { data } }) {
    const { attributes } = data;
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds,
    };
  },
  [actions.removeChannelSuccess](state, { payload: { data } }) {
    const { id } = data;
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  messagePostState,
  messages,
  channelPostState,
  channels,
  socketState,
  activeChannelId,
  channelsModalState,
  form: formReducer,
});
