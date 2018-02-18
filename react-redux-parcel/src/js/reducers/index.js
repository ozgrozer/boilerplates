import {combineReducers} from 'redux'
import todoReducer from './todoReducer'

const reducers = combineReducers({
  todo: todoReducer
})

export default reducers
