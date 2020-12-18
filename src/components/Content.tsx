import { useSelector } from 'react-redux'
import { IMessage } from 'models/message'
import TimeAgo from 'javascript-time-ago'
import th from 'javascript-time-ago/locale/th'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { RootState } from 'store/reducers'
import AddComment from './Add-Comment'
import { Typography, Card, Row, Col, Button } from 'antd'
import DeleteModal from './DeleteModal'
import { useState } from 'react'

TimeAgo.addLocale(th)

const { Title } = Typography
function Content() {
  const timeAgo = new TimeAgo('th-TH')

  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const [selected, setSelected] = useState<IMessage | undefined>(undefined)

  const [page, setPage] = useState<number>(0)

  const handleNextPage = () => {
    setPage((prev) => prev + 1)
  }

  const handleBackPage = () => {
    setPage((prev) => prev - 1)
  }

  useFirestoreConnect<IMessage[]>([
    { collection: 'messages', orderBy: ['created', 'desc'] },
  ])

  const messages: IMessage[] = useSelector(
    (state: RootState) => state.firestore.ordered.messages,
  )

  const handleOnClickDelete = (item: IMessage) => {
    setSelected(item)
    setDeleteModal(true)
  }

  const closeDialog = () => {
    setDeleteModal(false)
    setSelected(undefined)
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
      <div className="answer-board">
        <Row gutter={[8, 16]}>
          {messages
            .slice(page * 8, (page + 1) * 8)
            .map((item: IMessage, index: number) => (
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
                      onClick={() => handleOnClickDelete(item)}
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
        <div style={{ justifyContent: 'space-between', display: 'flex' }}>
          <div>
            {page > 0 && (
              <Button type="link" onClick={handleBackPage}>
                Back
              </Button>
            )}
          </div>
          <div>
            {messages.length > (page + 1) * 8 && (
              <Button type="link" onClick={handleNextPage}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="comment-zone">
        <AddComment />
      </div>
      {deleteModal && (
        <DeleteModal
          open={deleteModal}
          message={selected}
          closeDialog={closeDialog}
        />
      )}
    </div>
  )
}

export default Content
