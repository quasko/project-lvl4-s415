import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import cn from 'classnames';
import ScrollToBottom from 'react-scroll-to-bottom';

const mapStateToProps = (state) => {
  const { messagesFetchingState, messages: { byId, allIds }, socketState, activeChannelId } = state;

  const messages = allIds.map(id => byId[id]).filter(m => m.channelId === activeChannelId);

  return { messages, messagesFetchingState, socketState, activeChannelId };
};

@connect(mapStateToProps)
class Chat extends React.Component {
  render() {
    const { messages, messagesFetchingState, socketState } = this.props;
    if (messagesFetchingState === 'failed') {
      return (
        <span>Please, reload page!</span>
      );
    }
    const classScroll = css({
      height: '400',
      width: '100%',
    });

    const socketStateClass = cn({
      'text-success': socketState === 'online',
      'text-danger': socketState === 'offline',
    });

    return (
      <div className="col-12 border p-0">
        <div className="d-flex justify-content-between pl-2 pr-2">
          <p>#General messages</p>
          <p className={socketStateClass}>{socketState}</p>
        </div>
        <ScrollToBottom className={classScroll}>
          {messages.map(({ message, id }) => (
            <p key={id}>{ `${message.name}: ${message.text}` }</p>
          ))}
        </ScrollToBottom>
      </div>
    );
  }
}

export default Chat;
