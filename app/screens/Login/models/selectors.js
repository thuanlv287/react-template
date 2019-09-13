import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;
const makeSelectLogin = () =>
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

export {
  selectLogin,
  makeSelectLogin,
  makeSelectMessage,
  makeSelectIsLoading
}