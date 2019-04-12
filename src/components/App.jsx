import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import MessageForm from './MessageForm';

const App = () => {
  return (
    <div className="row">
      <Channels />
      <div className="col-sm-12 col-md-9 d-flex flex-column">
        <Chat />
        <MessageForm />
      </div>
    </div>
  );
};

export default App;
