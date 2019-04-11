import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
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
    const { messages, messagesFetchingState } = this.props;
    if (messagesFetchingState === 'failed') {
      return (
        <span>Please, reload page!</span>
      );
    }
    const classScroll = css({
      height: '390',
      width: '100%',
    });
    return (
      <div className="col-12 border messages">
        #General messages
        <ScrollToBottom className={classScroll}>
          {messages.map(({ message, id }) => (
            <p key={id}>{message.text}</p>
          ))}
        </ScrollToBottom>
      </div>
      
    );
    
  }
}

export default connect(mapStateToProps)(Chat);
