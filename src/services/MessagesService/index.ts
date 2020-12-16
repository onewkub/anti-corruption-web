import { IMessage } from 'models/message'
import {
  getMessagesBegin,
  getMessagesFailure,
  getMessagesSuccess,
} from 'store/actions'
import { db } from '../FirebaseService'

let messagesCollection = db.collection('messages')

export type GetMessages = () => Promise<void>

export function getMessages() {
  return async (dispatch: any) => {
    dispatch(getMessagesBegin())
    try {
      const snapshot = await messagesCollection.get()
      const rlt: IMessage[] = snapshot.docs.map(
        (doc): IMessage => {
          const data = doc.data()
          return {
            id: doc.id,
            writer: data.writer,
            message: data.message,
            created: data.created.toDate(),
            deleteCode: data.deleteCode,
          }
        },
      )
      dispatch(getMessagesSuccess(rlt))
    } catch (error) {
      dispatch(getMessagesFailure(error))
    }
  }
}

