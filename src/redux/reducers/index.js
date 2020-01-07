import { combineReducers } from 'redux'

import { placeholderReducer } from './placeholderReducer'
import { serverReducer } from './serverReducer'
import { dsReducer } from './dsReducer'

export const reducer = combineReducers({ placeholderReducer: placeholderReducer, serverReducer: serverReducer, dsReducer: dsReducer })