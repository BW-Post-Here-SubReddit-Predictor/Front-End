import constants from '../constants'

const initialState = {
  //fetching posts
  isFetchingUserPosts: false,
  isFetchingUserPostsError: null,
  //posting new post
  isPostingNewSavedPost: false,
  isPostingNewSavedPostError: false,
  //stored data
  userPosts: [],
  userId: "",
}

export const serverReducer = (state = initialState, { type, payload }) => {

  switch(type) {
    // getting posts
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
    // save post
    case constants.SAVING_NEW_POST:
      return {
        ...state,
        isPostingNewSavedPost: true
      }
    case constants.SAVED_NEW_POST:
      return {
        ...state,
        userPosts: [...state.userPosts, payload],
        isPostingNewSavedPost: false
      }
    case constants.ERROR_SAVING_NEW_POST:
      return {
        ...state,
        isPostingNewSavedPostError: false
      }

    case constants.STORE_LOGIN: 
      return {
        ...state, 
        userId: payload
        
      }

    default: 
      return state
  }
}