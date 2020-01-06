import constants from '../constants'

const initialState = {
  isFetchingUserPosts: false,
  isFetchingUserPostsError: null,
  userPosts: []
}

export const serverReducer = (state = initialState, { type, payload }) => {

  switch(type) {
    case constants.GETTING_USER_POSTS:
      return {
        ...state,
        isFetchingUserPosts: true
      }

    case constants.ERROR_GETTING_POSTS:
      return {
        ...state,
        isFetchingUserPostsError: payload
      }

    case constants.GOT_USER_POSTS:
      return {
        ...state,
        userPosts: payload
      }

    default: 
      return state
  }
}