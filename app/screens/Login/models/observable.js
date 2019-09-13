import { ofType,  } from 'redux-observable';
import { mapTo, delay, mergeMapTo, mergeMap, map } from 'rxjs/operators';
import actionTypes from './actionTypes';
import actions from './actions';
import loginService from './service';


export const getLogin = (action$, store) => {
  return action$.pipe(
    ofType(actionTypes.GET_LOGIN),
    // delay(1500),
    mergeMap(action => loginService.getLogin({payload: action.payload})),
    map(data => {
      console.log('data: ', data);
      return actions.getLoginResponse(data)
    })
  )
}

export default {
  getLogin
}