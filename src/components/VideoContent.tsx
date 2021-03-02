import { Typography } from 'antd'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import YouTube from 'react-youtube'
import { RootState } from 'store/reducers'

const { Title } = Typography

function VideoContent() {
  const opts = {
    height: '100%',
    width: '100%',
  }
  useFirestoreConnect<{ id: string }>(() => [
    { collection: 'videos' },
  ])
  const youtube_id: string = useSelector((state: RootState) => {
    // console.log(state.firestore.data)
    return state.firestore.data.videos?.youtube_id.id || "Gc1_pVqoWYo"
    // return 'abc'
  })

  if (!isLoaded(youtube_id)) {
    return (
      <div className="App-Video-content" id="video">
        <Title>Loading...</Title>
      </div>
    )
  }

  return (
    <div className="App-Video-content" id="video">
      <Title>
        วีดีโอสัมภาษณ์ความเห็นนักศึกษา คณะเกตรศาสตร์ มหาวิทยาลัยเชียงใหม่
      </Title>
      <div className="video-box">
        <div className="video-sub-box">
          <YouTube className="video-player" videoId={youtube_id} opts={opts} />
        </div>
      </div>
    </div>
  )
}

export default VideoContent
