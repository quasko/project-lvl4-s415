import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import Field from './Field';


const App = () => (
  <div className="row">
    <Channels />
    <div className="col-9 d-flex flex-column">
      <Chat />
      <Field />
    </div>
  </div>
);

export default App;
