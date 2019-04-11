import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import MessageForm from './MessageForm';
import faker from 'faker';

const UserContext = React.createContext('user-fake');

// const App = () => (
//   <div className="row">
//     <Channels />
//     <div className="col-9 d-flex flex-column">
//       <Chat />
//       <MessageForm />
//     </div>
//   </div>
// );

const name = faker.name.findName();
class App extends React.Component {
  

  render() {
    console.log('app context ', this.context);
    return (
      <div className="row">
        <Channels />
        <div className="col-9 d-flex flex-column">
          <Chat />
          <MessageForm />
        </div>
      </div>
    );
  }
};

App.contextType = UserContext;

export default App;
