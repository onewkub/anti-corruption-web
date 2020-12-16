import { IMessage } from 'models/message'

export const GET_MESSAGES_BEGIN = 'GET_MESSAGE_BEGIN'
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGE_SUCCESS'
export const GET_MESSAGES_FAILURE = 'GET_MESSAGE_FAILURE'

export const getMessagesBegin = () => ({
  type: GET_MESSAGES_BEGIN,
})

export const getMessagesSuccess = (payload: IMessage[]) => ({
  type: GET_MESSAGES_SUCCESS,
  payload,
})

export const getMessagesFailure = (payload: Error) => ({
  type: GET_MESSAGES_FAILURE,
  payload,
})
