import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    message: state.message,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class MessageForm extends React.Component {
  onSubmit = ({ text }) => {
    
    const { addMessage, reset } = this.props;
    
    addMessage({
      data: {
        attributes: {
          message: {
            id: _.uniqueId(),
            date: new Date(),
            text,
          },
        },
      },
    });
    reset();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="d-flex" onSubmit={handleSubmit(this.onSubmit)}>
        <Field className="border w-100" name="text" required component="input" type="text" />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
}


const ConnectedMessageForm = connect(mapStateToProps, actionCreators)(MessageForm);

export default reduxForm({
  form: 'newMessage',
})(ConnectedMessageForm);
