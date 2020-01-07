import constants from "../constants"

const initialState = {
  post: {
    title: '',
    text: ''
  },
  subreddit: [] // response list received from machine learning goes in here
}

export const dsReducer = (state = initialState, {type, payload}) => {
  switch(type) {

    case constants.SET_POST: 
      return {
        ...state,
        post: payload
      }

    default:
      return state
  }
}

// payload = {
//   'post': 'textbody'
// }