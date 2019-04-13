import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Channels from './Channels';
import Chat from './Chat';
import MessageForm from './MessageForm';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  pushMessage: actions.pushMessage,
  onConnect: actions.onConnect,
  onDisconnect: actions.onDisconnect,
};

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  constructor(props) {
    super(props);

    const socket = io();
    const { pushMessage, onConnect, onDisconnect } = this.props;
    socket.on('newMessage', (m) => {
      pushMessage(m);
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
