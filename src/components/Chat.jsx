import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import cn from 'classnames';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChannelModal from './ChannelModal';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const {
    messagesFetchingState,
    messages: { byId, allIds },
    channels,
    socketState,
    activeChannelId,
  } = state;

  const messages = allIds.map(id => byId[id]).filter(m => m.channelId === activeChannelId);
  const activeChannelName = channels.byId[activeChannelId].name;
  return {
    messages,
    messagesFetchingState,
    socketState,
    activeChannelName,
    activeChannelId,
    removable: channels.byId[activeChannelId].removable,
  };
};

const actionCreators = {
  openModal: actions.openModal,
  closeChannelsModal: actions.closeChannelsModal,
  patchChannel: actions.patchChannel,
};

@connect(mapStateToProps, actionCreators)
class Chat extends React.Component {
  onRenameClick = () => {
    const { openModal, activeChannelId } = this.props;
    openModal({ mode: 'rename', id: activeChannelId });
  }

  onDeleteClick = () => {
    const { openModal, activeChannelId } = this.props;
    openModal({ mode: 'delete', id: activeChannelId });
  }


  renderChannelButtons = () => {

  }

  render() {
    const {
      messages,
      messagesFetchingState,
      socketState,
      activeChannelName,
      removable,
    } = this.props;
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
      'ml-auto': true,
    });

    
    return (
      <div className="col-12 border p-0">
        <div className="d-flex align-items-start pl-2 pr-2">
          <p className="mr-2">
            {`#${activeChannelName}`}
          </p>
          {removable && (
            <>
              <button type="button" className="btn btn-outline-secondary btn-xs p-0 pl-1 pr-1 mr-2" onClick={this.onRenameClick}>rename channel</button>
              <button type="button" className="btn btn-outline-danger btn-xs p-0 pl-1 pr-1" onClick={this.onDeleteClick}>delete channel</button>
            </>
          )}
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
