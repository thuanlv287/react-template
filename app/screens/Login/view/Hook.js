// Using hook for component
import React, { useState, useRef, useEffect } from 'react';
import { InputGroup, FormGroup, Classes, Button } from '@blueprintjs/core';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectLogin } from '../models/selectors';
import actions from '../models/actions';

const LoginView = (props) => {
  const username = useRef(null);
  const password = useRef(null);


  const state = useSelector(makeSelectLogin);
  console.log('STATE: ', state)
  const actionsLogin = bindActionCreators(
    {
      getLogin: (payload) => actions.getLogin(payload)
    }, useDispatch());

  const handleLogin = () => {
    const payload = {
      username: username.current.value,
      password: password.current.value
    }
    actionsLogin.getLogin(payload);
  }
  if(state.message) {
    
  }
  useEffect(() => {
    if(state.message) {
      alert('login okl')
    }
  })
  

  return (
    <div>
      <FormGroup
        label="Username"
        labelFor="text-input"
      >
        <InputGroup
          placeholder="Username"
          inputRef={username}
        />
      </FormGroup>
      <FormGroup
        label="Password"
        labelFor="text-input"
      >
        <InputGroup
          placeholder="Password"
          type="password"
          inputRef={password}
        />
      </FormGroup>
      {state.isLoading && <h3>Loading...</h3>}
      <Button onClick={handleLogin}>Login</Button>
    </div>
  )

}

export default LoginView;