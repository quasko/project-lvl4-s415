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
};

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  constructor(props) {
    super(props);

    const socket = io();
    const { pushMessage } = this.props;
    socket.on('newMessage', (m) => {
      console.log('from io ', m.data);
      pushMessage(m);
    });

    socket.on('connect', (e) => console.log('connected', e));
    socket.on('disconnect', (e) => console.log('disconnect', e));
    socket.on('error', (e) => console.log('error', e));
    socket.on('connect_error', (e) => console.log('connect_error', e));
    socket.on('connect_timeout', (e) => console.log('connect_timeout', e));
    socket.on('reconnect', (e) => console.log('reconnect',e));
    socket.on('reconnect_attempt', (e) => console.log('reconnect_attempt',e));
    socket.on('reconnecting', (e) => console.log('reconnecting',e));
    socket.on('reconnect_error', (e) => console.log('reconnect_error',e));
    socket.on('reconnect_failed', (e) => console.log('reconnect_failed',e));
    
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
