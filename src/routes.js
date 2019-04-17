const host = '';
const apiUrl = 'api/v1';
export default {
  channelsUrl: () => [host, apiUrl, 'channels'].join('/'),
  channelUrl: id => [host, apiUrl, 'channels', id].join('/'),
  messagesUrl: channelId => [host, apiUrl, 'channels', channelId, 'messages'].join('/'),
};
