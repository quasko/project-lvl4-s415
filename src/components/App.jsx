import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Channels from './Channels';
import Chat from './Chat';
import MessageForm from './MessageForm';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  addMessage: actions.addMessage,
  addChannel: actions.addChannel,
  onConnect: actions.onConnect,
  onDisconnect: actions.onDisconnect,
  fetchChannels: actions.fetchChannels,
  renameChannel: actions.renameChannel,
  removeChannel: actions.removeChannel,
};

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  constructor(props) {
    super(props);

    const socket = io();
    const {
      addMessage,
      onConnect,
      onDisconnect,
      addChannel,
      renameChannel,
      removeChannel,
    } = this.props;
    socket.on('newMessage', (message) => {
      addMessage(message);
    });

    socket.on('newChannel', (channel) => {
      addChannel(channel);
    });

    socket.on('renameChannel', (channel) => {
      renameChannel(channel);
    });

    socket.on('removeChannel', (id) => {
      removeChannel(id);
    });

    socket.on('connect', () => {
      onConnect();
    });

    socket.on('disconnect', () => {
      onDisconnect();
    });
  }

  render() {
    return (
      <div className="row">
        <Channels />
        <div className="col-sm-12 col-md-9 d-flex flex-column">
          <Chat />
          <MessageForm />
        </div>
      </div>
    );
  }
}

export default App;
