import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actionCreators from '../actions';
import UserContext from '../context';

const mapStateToProps = (state) => {
  const { activeChannelId } = state;
  return { activeChannelId };
};

@connect(mapStateToProps, actionCreators)
@reduxForm({
  form: 'newMessage',
})
class MessageForm extends React.Component {
  static contextType = UserContext;

  handleSubmit = async ({ text }) => {
    const { postMessage, reset, activeChannelId } = this.props;
    const { context } = this;

    try {
      await postMessage({
        data: {
          attributes: {
            message: {
              date: new Date(),
              name: context,
              text,
            },
          },
        },
      }, activeChannelId);
    } catch (e) {
      throw new SubmissionError(e);
    }
    reset();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="d-flex" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field className="border w-100" name="text" required component="input" type="text" />
        <button type="submit" className="btn btn-primary" disabled={submitting}>Add</button>
      </form>
    );
  }
}

export default MessageForm;
