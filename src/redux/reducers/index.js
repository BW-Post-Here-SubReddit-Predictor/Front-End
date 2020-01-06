import { combineReducers } from 'redux'

import { placeholderReducer } from './placeholderReducer'
import { serverReducer } from './serverReducer'

export const reducer = combineReducers({ placeholderReducer: placeholderReducer, serverReducer: serverReducer })