import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import gon from 'gon';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';

const mapStateToProps = (state) => {
  const { activeChannelId } = state;
  return {};
};

const actionCreators = {
  addChannel: actions.addChannel,
};

@connect(mapStateToProps, actionCreators)
@reduxForm({
  form: 'channel',
})
class ChannelModal extends React.Component {
  onSubmit = async ({ text }) => {
    const { closeModal, reset, addChannel } = this.props;
    console.log('14 submit text', text);
    try {
      await addChannel({
        data: {
          attributes: {
            name: text,
          },
        },
      });
    } catch (e) {
      throw new SubmissionError(e);
    }
    
    reset();
    closeModal();
  }

  render() {
    const { open, closeModal, handleSubmit, submitting, submit, reset } = this.props;
    return (
      <Modal show={open} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Channel</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Modal.Body>
            <Field className="border w-100" name="text" required component="input" type="text" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
};

export default ChannelModal;