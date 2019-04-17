import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actionCreators from '../actions';
import ChannelModal from './ChannelModal';


const mapStateToProps = (state) => {
  const { channels: { byId, allIds }, activeChannelId, channelsModalState } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, activeChannelId, channelsModalState };
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  handleSelectChannel = id => () => {
    const { setActiveChannel } = this.props;
    setActiveChannel({ id });
  }

  handleAddChannel = () => {
    const { openModal } = this.props;
    openModal({ mode: 'add' });
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
            return (
              <a className={channelClass} key={id} onClick={this.handleSelectChannel(id)} href={`#${name}`}>
                {`#${name}`}
              </a>
            );
          })}
        </div>
        <button type="button" className="btn btn-outline-secondary" onClick={this.handleAddChannel}>Add Channel</button>
        <ChannelModal open={channelsModalState.open} submit={this.submitChannel} />
      </div>
    );
  }
}

export default Channels;
