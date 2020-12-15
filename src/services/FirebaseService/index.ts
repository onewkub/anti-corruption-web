import firebase from 'firebase'
import 'firebase/storage'
// import { IMessage } from 'models/message'

const firebaseConfig = {
  apiKey: 'AIzaSyCVBBo-1hzJRtkeeyz4Z30lGkWJUcUPsao',
  authDomain: 'anti-corruption-147d5.firebaseapp.com',
  projectId: 'anti-corruption-147d5',
  storageBucket: 'anti-corruption-147d5.appspot.com',
  messagingSenderId: '508138849022',
  appId: '1:508138849022:web:48d3784b8886ebc021dbaf',
  measurementId: 'G-NRENQTBGM9',
}

firebase.initializeApp(firebaseConfig)


// let messageCollection = db.collection('messages')

// export async function getMessages() {
//   try {
//     const recivedData = await messageCollection.get()
//     const rlt = recivedData.forEach((doc) => ({ id: doc.id, data: doc.data() }))
//     return rlt
//     // console.log(rlt)
//   } catch (error) {
//     console.error(error)
//   }
// }
export let db = firebase.firestore()


export default firebase