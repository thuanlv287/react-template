import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectLogin, makeSelectMessage, makeSelectIsLoading } from '../models/selectors';
import { Input, Button } from '../../../components';
import './styles.scss';
import actions from '../models/actions';

class LoginView extends React.Component {
  handleLogin = () => {
    this.props.getLogin({
      username: this.userName.value,
      password: this.password.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props && nextProps.user && nextProps.user.success) {
        this.props.history.push('/users')
    }
  }
  render() {
    return (
      <div className="login-form">
        <Input
          horizontal
          label="Username"
          ref={refName => this.userName = refName}
        />
        <Input
          horizontal
          label="Password"
          type="password"
          ref={refpassword => this.password = refpassword}
        />
        {this.props.isLoading && <h1>Loading...</h1>}
        <Button onClick={() => this.handleLogin()}>Login</Button>
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