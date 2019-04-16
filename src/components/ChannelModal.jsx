import React from 'react';
import { connect } from 'react-redux';
import upperFirst from 'lodash/upperFirst';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channelsModalState: { mode }, activeChannelId, channels: { byId } } = state;
  const { name } = byId[activeChannelId];
  return {
    mode,
    activeChannelId,
    name,
    initialValues: {
      text: mode === 'rename' ? name : '',
    },
    enableReinitialize: true,
  };
};

const actionCreators = {
  postChannel: actions.postChannel,
  patchChannel: actions.patchChannel,
  deleteChannel: actions.deleteChannel,
};

@connect(mapStateToProps, actionCreators)
@reduxForm({
  form: 'channel',
})
class ChannelModal extends React.Component {
  onAdd = async ({ text }) => {
    const { closeModal, reset, postChannel } = this.props;
    try {
      await postChannel({
        data: {
          attributes: {
            name: text,
          },
        },
      });
    } catch (e) {
      throw new SubmissionError(e);
    }
    closeModal();
    reset();
  }

  onRename = async ({ text }) => {
    const {
      closeModal,
      reset,
      patchChannel,
      activeChannelId,
    } = this.props;

    try {
      await patchChannel({
        data: {
          attributes: {
            name: text,
          },
        },
      }, activeChannelId);
    } catch (e) {
      throw new SubmissionError(e);
    }

    closeModal();
    reset();
  }

  onDelete = () => {
    const {
      closeModal,
      reset,
      activeChannelId,
      deleteChannel,
    } = this.props;
    deleteChannel(activeChannelId);
    closeModal();
    reset();
  }

  handleSubmit = mode => ({ text }) => {
    const channelAction = {
      add: this.onAdd,
      rename: this.onRename,
      delete: this.onDelete,
    };
    channelAction[mode]({ text });
  }

  render() {
    const {
      open,
      closeModal,
      handleSubmit,
      submitting,
      mode,
      name,
    } = this.props;
    const modalTitle = mode !== 'delete'
      ? `${upperFirst(mode)} channel`
      : `${upperFirst(mode)} channel '${name}' ?`;
    return (
      <Modal show={open} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.handleSubmit(mode))}>
          {mode !== 'delete' ? (
            <Modal.Body>
              <Field className="border w-100 form-control" name="text" required component="input" type="text" />
            </Modal.Body>
          ) : null}
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {mode}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default ChannelModal;
