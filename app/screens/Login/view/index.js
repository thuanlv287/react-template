import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectLogin, makeSelectMessage, makeSelectIsLoading } from '../models/selectors';
import actions from '../models/actions';
class LoginView extends React.Component {
  render() {
    console.log('this.props: ', this.props);
    return (
      <div>
        {this.props.isLoading && <h1>Loading...</h1>}
        <h1>Login view</h1>
        <button onClick={() => this.props.getLogin({username: 'admin', password: 'admin'})}>Login</button>
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