import firebase from 'firebase/app'
import 'firebase/firestore'

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
firebase.firestore()

export default firebase
