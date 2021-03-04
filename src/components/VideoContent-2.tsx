import { Typography } from 'antd'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import YouTube from 'react-youtube'
import { RootState } from 'store/reducers'

const { Title } = Typography

function VideoContentSecond() {
  const opts = {
    height: '100%',
    width: '100%',
  }
  // useFirestoreConnect<{ id: string }>(() => [
  //   { collection: 'videos', doc: 'youtube_id_2' },
  // ])
  const youtube_id: string = useSelector((state: RootState) => {
    console.log(state.firestore.data.videos?.youtube_id_2.id)
    return state.firestore.data.videos?.youtube_id_2.id
    // return 'abc'
  })

  if (!isLoaded(youtube_id)) {
    return (
      <div className="App-Video-content-2" id="video">
        <Title>Loading...</Title>
      </div>
    )
  }

  return (
    <div className="App-Video-content-2" id="video">
      <Title>
        วีดีโอรณรงค์การต่อต้านการทุจริต คณะเกตรศาสตร์ มหาวิทยาลัยเชียงใหม่
      </Title>
      <div className="video-box">
        <div className="video-sub-box">
          <YouTube className="video-player" videoId={youtube_id} opts={opts} />
        </div>
      </div>
    </div>
  )
}

export default VideoContentSecond
