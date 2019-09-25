import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { InputGroup, FormGroup, Classes, Button } from '@blueprintjs/core';
import { makeSelectLogin, makeSelectMessage, makeSelectIsLoading } from '../models/selectors';
import actions from '../models/actions';
class LoginView extends React.Component {
  handleLogin = () => {
    const payload = {
      name: this.name.value,
      password: this.password.value
    }
    console.log('payload: ', payload);
  }
  render() {
    return (
      <div>
        {this.props.isLoading && <h1>Loading...</h1>}
        <h1>Login view</h1>
        <FormGroup
            label="Username"
            labelFor="text-input"
        >
            <InputGroup
              placeholder="Username"
              inputRef={ref => this.name = ref}
            />
        </FormGroup>
        <FormGroup
            label="Password"
            labelFor="text-input"
            >
            <InputGroup
              placeholder="Password"
              type="password"
              inputRef={ref => this.password = ref}
            />
        </FormGroup>
        <Button onClick={this.handleLogin}>Login</Button>
      </div>
    )
  }
}

const mapStateToProps = createSelector(
  makeSelectLogin(),
  makeSelectMessage(),
  makeSelectIsLoading(),
  (user, message, isLoading) => ({
    user,
    message,
    isLoading
  })
)

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getLogin: (payload) => actions.getLogin(payload)
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)