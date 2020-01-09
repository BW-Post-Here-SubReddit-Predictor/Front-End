import { axiosWithAuth } from '../../helpers/axiosWithAuth'
import constants from '../constants'

export const storeLogin = (userId) =>  { 
  return {type: constants.STORE_LOGIN, payload: userId}
}

export const getUserPosts = (userID) => (dispatch) => {
  dispatch({ type: constants.GETTING_USER_POSTS })
  axiosWithAuth().get(`/posts/${userID}/user`)
    .then( res => {
      console.log(res, 'get request')
      dispatch({ type: constants.GOT_USER_POSTS, payload: res.data})
    })
    .catch( err => {
      console.log(err)
      dispatch({ type: constants.ERROR_GETTING_POSTS, payload: err })
    })
}

export const getAllPosts = () => dispatch => {

  axiosWithAuth().get('/posts')
    .then( res => {
      console.log(res)
    })
    .catch( err => {
      console.log(err)
    })
}


export const savingPosts = (inputPost) => dispatch => {
  
  dispatch({type: constants.SAVING_NEW_POST})
  axiosWithAuth().post('/posts', inputPost)
  .then(res => { 
    dispatch({type: constants.SAVED_NEW_POST, payload: inputPost})
    console.log('saved posts response' , res); 
  })
  .catch(err => { 
    console.log('saved posts error', err)
  })
}

export const deletePost = (id) => dispatch => {
  dispatch({ type: constants.DELETING_POST })

  axiosWithAuth().delete(`/posts/${id}`)
    .then( res => {
      console.log(res)
      // delete locally on clientApp
      dispatch({ type: constants.DELETE_POST, payload: id })
    })
    .catch( err => {
      console.log(err)
    })
}

export const editPost = (postToEdit) => dispatch => {
  dispatch({ type: constants.EDITING_POST })
  const { post, title, subreddit } = postToEdit;
  const newPost = {
    post: postToEdit.post,
    title: postToEdit.title,
    subreddit: postToEdit.subreddit
  }


  console.log(postToEdit, 'put object shape')
  console.log(post, title, subreddit, 'what does it look like')
  axiosWithAuth().put(`/posts/${postToEdit.id}/`, newPost)
    .then( res => {
      console.log(res, 'put response')
      dispatch({ type: constants.EDIT_POST, payload: postToEdit })
    })
    .catch( err => {
      console.log(err)
    })
}
