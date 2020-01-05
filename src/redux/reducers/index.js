import { combineReducers } from 'redux'

import { placeholderReducer } from './placeholderReducer'

export const reducer = combineReducers({ placeholderReducer: placeholderReducer })