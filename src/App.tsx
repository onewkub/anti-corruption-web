import React from 'react'
import './App.less'
import HomeComponent from './components/Home'
import ContentComponent from './components/Content'
import AboutComponent from './components/About'

function App() {
  return (
    <div className="App">
      <HomeComponent />
      <ContentComponent />
      <AboutComponent />
    </div>
  )
}

export default App
