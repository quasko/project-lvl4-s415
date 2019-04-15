import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import gon from 'gon';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import ChannelModal from './ChannelModal';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds }, activeChannelId, channelsModalState } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, activeChannelId, channelsModalState };
};

const actionCreators = {
  setActiveChannel: actions.setActiveChannel,
  openChannelsModal: actions.openChannelsModal,
  closeChannelsModal: actions.closeChannelsModal,
};


@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  onChannelClick = id => () => {
    const { setActiveChannel } = this.props;
    setActiveChannel(id);
  }

  addChannel = () => {
    const { openChannelsModal } = this.props;
    console.log('add');
    openChannelsModal();
  }

  closeModal = () => {
    const { closeChannelsModal } = this.props;
    console.log('close');
    closeChannelsModal();
  }

  submitChannel = () => {
    console.log('submit');
  }

  render() {
    const { channels, activeChannelId, channelsModalState } = this.props;

    return (
      <div>
        <div className="list-group mb-3">
          {channels.map(({ id, name }) => {
            const channelClass = cn({
              'list-group-item': true,
              'list-group-item-action': true,
              active: id === activeChannelId,
            });
            return <a className={channelClass} key={id} href={`#${name}`} onClick={this.onChannelClick(id)}>{`#${name}`}</a>;
          })}
        </div>
        <button type="button" className="btn btn-outline-secondary" onClick={this.addChannel}>Add Channel</button>
        <ChannelModal open={channelsModalState.open} closeModal={this.closeModal} submit={this.submitChannel} />
      </div>
    );
  }
}

export default Channels;
