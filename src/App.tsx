import React from 'react'
import './App.less'
import HomeComponent from 'components/Home'
import ContentComponent from 'components/Content'
import AboutComponent from 'components/About'
import VoteComponent from 'components/Vote'
import Footer from 'components/Footer'
import firebase from 'services/FirebaseService'
import { Provider } from 'react-redux'
import store from 'store'
import { createFirestoreInstance } from 'redux-firestore'
import {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseProviderProps,
} from 'react-redux-firebase'
import VideoContent from 'components/VideoContent'
import VideoContentSecond from 'components/VideoContent-2'

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const rrfProps: ReactReduxFirebaseProviderProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <div className="App">
          <HomeComponent />
          <VoteComponent />
          <VideoContentSecond/>
          <VideoContent />
          <ContentComponent />
          <AboutComponent />
          <Footer />
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
