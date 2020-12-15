import { IMessage } from 'models/message'
import {
  GET_MESSAGES_BEGIN,
  GET_MESSAGES_FAILURE,
  GET_MESSAGES_SUCCESS,
} from 'store/actions'

interface IState {
  loading: boolean
  data: IMessage[]
  error: Error | null
}

interface IAction {
  type: string
  payload: any
}

const initialState: IState = {
  loading: false,
  data: [],
  error: null,
}

export default function MessagesReducer(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_MESSAGES_BEGIN:
      return {
        ...state,
        loading: true,
      }
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case GET_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
