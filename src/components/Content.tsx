import { useSelector } from 'react-redux'
import { IMessage } from 'models/message'
import TimeAgo from 'javascript-time-ago'
import th from 'javascript-time-ago/locale/th'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { RootState } from 'store/reducers'
import AddComment from './Add-Comment'

import { Typography, Card, Row, Col, Button } from 'antd'

TimeAgo.addLocale(th)

const { Title } = Typography

function Content() {
  const timeAgo = new TimeAgo('th-TH')

  useFirestoreConnect<IMessage[]>([
    { collection: 'messages', orderBy: ['created', 'desc'], limit: 9 },
  ])

  const messages: IMessage[] = useSelector(
    (state: RootState) => state.firestore.ordered.messages,
  )

  const handleOnClick = (item: any) => {
    console.log(item)
  }

  if (!isLoaded(messages)) {
    return (
      <div className="App-Content">
        <Title>Loading....</Title>
      </div>
    )
  }

  return (
    <div className="App-Content">
      <Title style={{ textTransform: 'uppercase' }}>
        ความเห็นเกี่ยวกับการทุจริต
      </Title>
      <Row gutter={[8, 16]} className="answer-board">
        {messages.map((item: IMessage, index: number) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={index}
            className="comment-card"
          >
            <Card style={{ height: '100%' }}>
              <div style={{ textAlign: 'right' }}>
                <Button
                  size="small"
                  type="link"
                  danger
                  onClick={() => handleOnClick(item)}
                >
                  ลบข้อความ
                </Button>
              </div>
              <div style={{ minHeight: 180 }}>
                <Title level={4}>" {item.message} "</Title>
              </div>

              <div style={{ textAlign: 'right' }}>
                <label>
                  เขียนโดย <b>{item.writer}</b>
                </label>
                <br />
                <label>{timeAgo.format(item.created.toDate())}</label>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="comment-zone">
        <AddComment />
      </div>
    </div>
  )
}

export default Content
