import { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store/reducers'
import { IMessage } from 'models/message'
import { GetMessages, getMessages } from 'services/MessagesService'
import TimeAgo from 'javascript-time-ago'
import th from 'javascript-time-ago/locale/th'
TimeAgo.addLocale(th)
interface IProps {
  messages: IMessage[]
  loading: boolean
  getMessages: GetMessages
}

function Content(props: IProps) {
  const { messages, loading, getMessages } = props
  const timeAgo = new TimeAgo('th-TH')
  useEffect(() => {
    getMessages()
    // eslint-disable-next-line
  }, [])

  if (loading) {
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
        {messages.map((item, index) => (
          <div className="card">
            <h5>{item.message}</h5>
            <h6>Owner: {item.writer}</h6>
            <h6>Write at: {timeAgo.format(item.created)}</h6>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (rootState: RootState) => ({
  messages: rootState.messages.data,
  loading: rootState.messages.loading,
})

export default connect(mapStateToProps, { getMessages })(Content)
