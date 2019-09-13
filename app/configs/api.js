
const ENDPOINT = {
  dev: 'http://52.14.228.152:8080/api',
  prod: 'http://52.14.228.152:8080/api'
}

const METHODS = {
  get: 'get',
  post: 'post',
  put: 'put',
  path: 'path',
  delete: 'delete',
}


export default {
  endPoint: process.env.NODE_ENV !== 'production' ? ENDPOINT.dev : ENDPOINT.prod,
  METHODS,
  RESPONSE: {
    STATUS: {
      success: 200
    }
  },
  login: {
    getLogin: () => {
      return {
        url: '/login',
        method: METHODS.post
      }
    }
  },
  user: {
    getUsers: () => {
      return {
        url: '/users',
        method: METHODS.get
      }
    },
    getUserByName: ({username}) => {
      return {
        url: `users/byName/${username}`,
        method: METHODS.get
      }
    },
    createUser: () => {
      return {
        url: '/users',
        method: METHODS.post
      }
    },
    deleteUser: (_id) => {
      return {
        url: `/users/${_id}`,
        method: METHODS.delete
      }
    },
    updateUser: (_id) => {
      return {
        url: `users/${_id}`,
        method: METHODS.put
      }
    },

  },
  role: {
    getRoles: () => {
      return {
        url: '/roles',
        method: METHODS.get
      }
    },
    deleteRole: (_id) => {
      return {
        url: `/roles/${_id}`,
        method: METHODS.delete
      }
    },
    createRole: () => {
      return {
        url: '/roles',
        method: METHODS.post
      }
    },
    getRole: (payload) => {
      return {
        url: `/roles/${payload._id}`,
        method: METHODS.get
      }
    },
    updateRole: (_id) => {
      return {
        url: `/roles/${_id}`,
        method: METHODS.put
      }
    },
  },
  category: {
    getCategories: () => {
      return {
        url: '/categories',
        method: METHODS.get
      }
    },
    deleteCategory: (_id) => {
      return {
        url: `/categories/${_id}`,
        method: METHODS.delete
      }
    },
    createCategory: () => {
      return {
        url: `/categories`,
        method: METHODS.post
      }
    },
    getCategory: ({ _id }) => {
      return {
        url: `/categories/${_id}`,
        method: METHODS.get
      }
    },
    updateCategory: (_id) => {
      return {
        url: `/categories/${_id}`,
        method: METHODS.put
      }
    },

  },
  link: {
    getLinks: () => {
      return {
        url: '/links',
        method: METHODS.get
      }
    },
    deleteLink: (_id) => {
      return {
        url: `/links/${_id}`,
        method: METHODS.delete
      }
    },
    createLink: () => {
      return {
        url: `/links`,
        method: METHODS.post
      }
    },
    getLink: ({_id}) => {
      return {
        url: `/links/${_id}`,
        method: METHODS.get
      }
    },
    updateLink: (_id) => {
      return {
        url: `/links/${_id}`,
        method: METHODS.put
      }
    },
  }
}
