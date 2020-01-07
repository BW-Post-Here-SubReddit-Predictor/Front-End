const initialState = {
  postResponse: {
    post: '',
    subreddit: [] // response list received from machine learning goes in here
  }
}

export const dsReducer = (state = initialState, {type, payload}) => {
  switch(type) {

    default:
      return state
  }
}