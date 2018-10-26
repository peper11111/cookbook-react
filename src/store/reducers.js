import * as ActionTypes from '@/store/action-types'

const initialState = {
  auth: {
    loggedIn: localStorage.getItem('loggedIn') === 'true',
    user: {}
  },
  categories: [],
  cuisines: [],
  user: {},
  recipe: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      localStorage.setItem('loggedIn', 'true')
      return {
        ...state,
        auth: {
          loggedIn: true,
          user: action.payload
        }
      }
    case ActionTypes.SIGN_OUT:
      localStorage.setItem('loggedIn', 'false')
      return {
        ...state,
        auth: {
          loggedIn: false,
          user: {}
        }
      }
    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case ActionTypes.SET_CUISINES:
      return {
        ...state,
        cuisines: action.payload
      }
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case ActionTypes.SET_RECIPE:
      return {
        ...state,
        recipe: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
