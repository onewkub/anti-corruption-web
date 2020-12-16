import { useSelector } from 'react-redux'
import { IMessage } from 'models/message'
import TimeAgo from 'javascript-time-ago'
import th from 'javascript-time-ago/locale/th'
import { useFirestoreConnect } from 'react-redux-firebase'
import { RootState } from 'store/reducers'
TimeAgo.addLocale(th)

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
        <h5>Loading....</h5>
      </div>
    )
  }

  return (
    <div className="App-Content">
      <h1 style={{ textTransform: 'uppercase' }}>Answer Board</h1>
      <div className="answer-board">
        {messages.map((item: IMessage, index: number) => (
          <div key={index} className="card">
            <h5>{item.message}</h5>
            <h6>Owner: {item.writer}</h6>
            <h6>Write at: {timeAgo.format(item.created.toDate())}</h6>
            <button onClick={() => handleOnClick(item)}>Click</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Content
