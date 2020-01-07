import axios from 'axios'
import constants from '../constants'
//need a DSAPI link, don't need auth token

export const setPost = (post) => { // locally tracking user's post
  return {
    type: constants.SET_POST,
    payload: post
  }
}

export const saveDSResponse = (list) => {
  return {
    type: constants.SAVE_DS_RESPONSE,
    payload: list
  }
}