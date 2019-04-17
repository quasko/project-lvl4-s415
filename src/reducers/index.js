import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channelsModalState = handleActions(
  {
    [actions.openModal](state, { payload: { mode } }) {
      return {
        open: true,
        mode,
      };
    },
    [actions.closeModal](state) {
      const { mode } = state;
      return {
        open: false,
        mode,
      };
    },
  }, { open: false },
);

const socketState = handleActions(
  {
    [actions.connectSocket]() {
      return 'online';
    },
    [actions.disconnectSocket]() {
      return 'offline';
    },
  }, 'none',
);

const activeChannelId = handleActions(
  {
    [actions.setActiveChannel](state, { payload }) {
      return payload.id;
    },
    [actions.removeChannel]() {
      return 1;
    },
  }, 1,
);

const messages = handleActions({
  [actions.fetchMessages](state, { payload }) {
    return {
      byId: _.keyBy(payload.messages, 'id'),
      allIds: payload.messages.map(m => m.id),
    };
  },
  [actions.addMessage](state, { payload: { data } }) {
    const { attributes } = data;

    const { byId, allIds } = state;

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.removeChannel](state, { payload: { data } }) {
    const { id } = data;
    const { byId, allIds } = state;
    const newById = _.omitBy(byId, item => item.channelId === id);
    const newAllIds = allIds.filter(item => newById[item]);
    return {
      byId: newById,
      allIds: newAllIds,
    };
  },
}, { byId: {}, allIds: [] });

const channels = handleActions({
  [actions.fetchChannels](state, { payload }) {
    return {
      byId: _.keyBy(payload.channels, 'id'),
      allIds: payload.channels.map(m => m.id),
    };
  },
  [actions.addChannel](state, { payload: { data } }) {
    const { attributes } = data;
    const { byId, allIds } = state;

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.renameChannel](state, { payload: { data } }) {
    const { attributes } = data;
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds,
    };
  },
  [actions.removeChannel](state, { payload: { data } }) {
    const { id } = data;
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  messages,
  channels,
  socketState,
  activeChannelId,
  channelsModalState,
  form: formReducer,
});
