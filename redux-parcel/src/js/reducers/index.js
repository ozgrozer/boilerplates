import { combineReducers } from 'redux'
import userReducer from './userReducer'
import todoReducer from './todoReducer'

const reducers = combineReducers({
  user: userReducer,
  todo: todoReducer
})

export default reducers
