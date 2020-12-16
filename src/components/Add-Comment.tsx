import { Input, Typography, Button } from 'antd'

const { Title } = Typography

function AddComment() {
  return (
    <div className="comment-box">
      <Title level={2}>แสดงความคิดเห็น</Title>
      <Input placeholder="ชื่อผู้เขียน" />
      <Input.TextArea placeholder="ความคิดเห็น" />
      <Input placeholder="รหัสสำหรับลบความเห็น" type="password" />
      <Button type="primary">ส่งความคิดเห็น</Button>
    </div>
  )
}

export default AddComment
