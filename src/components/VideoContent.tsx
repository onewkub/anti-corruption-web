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
    { collection: 'videos', doc: 'youtube_id' },
  ])
  const youtube_id: string = useSelector((state: RootState) => {
    // console.log(state.firestore.data.videos?.youtube_id.id)
    return state.firestore.data.videos?.youtube_id.id
    // return 'abc'
  })

  if (!isLoaded(youtube_id) || !youtube_id) {
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
      <YouTube className="video-box" videoId={youtube_id} opts={opts} />
    </div>
  )
}

export default VideoContent
