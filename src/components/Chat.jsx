import React from 'react';
import { connect } from 'react-redux';

// import ScrollToBottom from 'react-scroll-to-bottom';
// const Chat = () => (
//   <div className="col-12 border messages">
//     #General messages
//   </div>
// );
const mapStateToProps = (state) => {
  const { messagesFetchingState, messages: { byId, allIds } } = state;
  const messages = allIds.map(id => byId[id]);
  return { messages, messagesFetchingState };
};

class Chat extends React.Component {
  render() {
    // console.log(messages);
    const { messages, messagesFetchingState } = this.props;
    if (messagesFetchingState === 'failed') {
      return (
        <span>Please, reload page!</span>
      );
    }
    console.log('25 ',messages);
    return (
      <div className="col-12 border messages">
        #General messages
       
          {messages.map(({ message }) => (
            <p>{message.text}</p>
          ))}
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Chat);
