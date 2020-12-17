import React from 'react'
import './App.less'
import HomeComponent from 'components/Home'
import ContentComponent from 'components/Content'
import AboutComponent from 'components/About'
import firebase from 'services/FirebaseService'
import { Provider } from 'react-redux'
import store from 'store'
import { createFirestoreInstance } from 'redux-firestore'
import {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseProviderProps,
} from 'react-redux-firebase'
import VideoContent from 'components/VideoContent'

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
          <VideoContent />
          <ContentComponent />
          <AboutComponent />
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
