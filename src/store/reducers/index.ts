import { combineReducers } from 'redux'
import messages from './messages'

const rootReducer = combineReducers({ messages })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
