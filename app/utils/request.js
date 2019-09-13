import axios from 'axios';
import ApiConfigs from '../configs/api';
// import { getLocalStorage } from '../utils/common';

const getLocalStorage = () => {
    return 'token'
}

const getHeaders = () => {
    const token = getLocalStorage('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
}
const addTokenIntoHeaders = () => {
    const token = getLocalStorage('token')
    return token ? `Bearer ${token}` : {}
}
let instance = axios.create({
    baseURL: ApiConfigs.endPoint,
    timeout: 3000,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
    },
    auth: {}
})
/**
 * 
 * @param {*} url 
 * @param {*} options 
 */
const request = async (url, options) => {
    let result = {
        messageError: null,
        data: null
    }
    if (url === '/login') {
        const { payload: { username, password } } = options;
        instance.defaults['auth'] = {
            username,
            password
        }
    } else {
        delete instance.defaults['auth'];
        instance.defaults.headers.common["Authorization"] = addTokenIntoHeaders();
    }

    const { method } = options || 'get'
    let response = {}
    if (method === ApiConfigs.METHODS.get) {
        response = await instance[method](url)
    }

    if (method === ApiConfigs.METHODS.post) {
        const { payload } = options;
        response = await instance.post(url, { ...payload })
    }

    if (method === ApiConfigs.METHODS.delete) {
        response = await instance[method](url)
    }

    if (method === ApiConfigs.METHODS.put) {
        const { payload } = options;
        const { data } = payload;
        response = await instance.put(`${url}`, { ...data })
    }
    if ((response.status === 200 && response.statusText === 'OK') || (response.status === 201 && response.statusText === 'Created')) { // response success
        result.data = response.data
    } else { // error system
        result.messageError = 'System error !'
    }
    return result
}

// export
export {
    request
}