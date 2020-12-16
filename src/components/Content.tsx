import { useSelector } from 'react-redux'
import { IMessage } from 'models/message'
import TimeAgo from 'javascript-time-ago'
import th from 'javascript-time-ago/locale/th'
import { useFirestoreConnect } from 'react-redux-firebase'
import { RootState } from 'store/reducers'
import AddComment from './Add-Comment'

import { Typography } from 'antd'

TimeAgo.addLocale(th)

const { Title } = Typography

function Content() {
  const timeAgo = new TimeAgo('th-TH')

  useFirestoreConnect([{ collection: 'messages' }])

  const messages: IMessage[] = useSelector(
    (state: RootState) => state.firestore.ordered.messages,
  )

  const handleOnClick = (item: any) => {
    console.log(item)
  }

  console.log(messages)
  if (!messages) {
    return (
      <div className="App-Content">
        <Title>Loading....</Title>
      </div>
    )
  }

  return (
    <div className="App-Content">
      <Title style={{ textTransform: 'uppercase' }}>กระดานรวบรวมความเห็น</Title>
      <div className="answer-board">
        {messages.map((item: IMessage, index: number) => (
          <div key={index} className="card">
            <h2>{item.message}</h2>
            <h3>Owner: {item.writer}</h3>
            <h4>Write at: {timeAgo.format(item.created.toDate())}</h4>
            <button onClick={() => handleOnClick(item)}>Click</button>
          </div>
        ))}
      </div>
      <div>
        <AddComment />
      </div>
    </div>
  )
}

export default Content
