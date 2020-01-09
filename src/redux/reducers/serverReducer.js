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
  //editing post
  isEditingPost: false,
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
      const deleteIndex = state.userPosts.findIndex(e => {
        return e.id === payload
      })

      const postsAfterDeletion = state.userPosts.slice(0, deleteIndex)
                                      .concat(state.userPosts
                                      .slice(deleteIndex + 1))

      return {
        ...state,
        userPosts: postsAfterDeletion,
        isDeletingPost: false
      }

      case constants.EDITING_POST:
        return {
          ...state,
          isEditingPost: true
        }
      case constants.EDIT_POST:

        const editIndex = state.userPosts.findIndex(e => {
          return e.id === payload.id
        })

        const postsAfterEdit = state.userPosts.slice(0, editIndex)
                                        .concat(payload)
                                        .concat(state.userPosts
                                        .slice(editIndex + 1))

      return {
        ...state,
        userPosts: postsAfterEdit,
        isEditingPost: false
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