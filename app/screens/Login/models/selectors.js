import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;
const makeSelectUser = () =>
  createSelector(
    selectLogin,
    loginState => loginState.user
  )

const makeSelectMessage = () =>
  createSelector(
    selectLogin,
    loginState => loginState.message
  )

const makeSelectIsLoading = () =>
  createSelector(
    selectLogin,
    loginState => loginState.isLoading
  )
const makeSelectLogin = createSelector(
    makeSelectUser(),
    makeSelectMessage(),
    makeSelectIsLoading(),
    (user, message, isLoading) => ({
      user,
      message,
      isLoading
    })
  )
export {
  selectLogin,
  makeSelectUser,
  makeSelectMessage,
  makeSelectIsLoading,
  makeSelectLogin
}