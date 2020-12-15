import { db } from '../FirebaseService'

let messagesCollection = db.collection('messages')

async function getMessages(): Promise<void> {
  const messagesSnapshot = await messagesCollection.get()
  const rlt = messagesSnapshot.forEach((doc) => ({ id: doc.id, ...doc.data }))
  
}
