import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';
import UserContext from '../context';
import io from 'socket.io-client';

const mapStateToProps = (state) => {
  const props = {
    message: state.message,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};
@connect(mapStateToProps, actionCreators)
@reduxForm({
  form: 'newMessage',
})
class MessageForm extends React.Component {
  static contextType = UserContext;

  onSubmit = async ({ text }) => {
    const { addMessage, reset } = this.props;
    const { context } = this;

    try {
      await addMessage({
        data: {
          attributes: {
            message: {
              date: new Date(),
              name: context,
              text,
            },
          },
        },
      });
    } catch (e) {
      throw new SubmissionError(e);
    }
    reset();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="d-flex" onSubmit={handleSubmit(this.onSubmit)}>
        <Field className="border w-100" name="text" required component="input" type="text" />
        <button type="submit" className="btn btn-primary" disabled={submitting}>Add</button>
      </form>
    );
  }
}

export default MessageForm;
