import { ApiConst } from '../../../configs';
import { request } from '../../../utils';

export default {
  getLogin: async (payload) => {
    let result = {
      error: null,
      data: []
    }
    const api = ApiConst.login.getLogin();
    const options = {
      method: api.method,
      ...payload
    }
    try {
      const response = await request(api.url, options);
      if (!response.messageError) {
        result.data = response.data
      } else { // error system
        result.error = response.messageError;
      }
    } catch (err) {// error system
      result.error = err.response;
    }

    return result;
  }
}