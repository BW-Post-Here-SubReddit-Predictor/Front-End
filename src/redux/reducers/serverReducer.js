import constants from '../constants'

const initialState = {
  //fetching posts
  isFetchingUserPosts: false,
  isFetchingUserPostsError: null,
  //posting new post
  isPostingNewSavedPost: false,
  isPostingNewSavedPostError: false,
  //deleting post
  isDeletingPost: false,
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

    case constants.DELETING_POST:
      return {
        ...state,
        isDeletingPost: true
      }
    case constants.DELETE_POST:
      // let index;
      // for(let i = 0; i < state.userPosts.length; i++) {
      //   if(state.userPosts[i].id === payload) {
      //     index = i
      //   }
      // }

      const index = state.userPosts.findIndex(e => {
        return e.id === payload
      })

      const newPosts = state.userPosts.slice(0, index)
                                      .concat(state.userPosts
                                      .slice(index + 1))

      return {
        ...state,
        userPosts: newPosts
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