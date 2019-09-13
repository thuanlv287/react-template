import { combineEpics } from 'redux-observable';
import loginObser from './screens/Login/models/observable';


export default combineEpics(
  loginObser.getLogin
);