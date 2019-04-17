import React from 'react';
import { connect } from 'react-redux';
import Channels from './Channels';
import Chat from './Chat';
import MessageForm from './MessageForm';
import * as actionCreators from '../actions';

const mapStateToProps = () => ({});

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
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
