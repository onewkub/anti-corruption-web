import { Input, Typography, Button } from 'antd'
import { IMessage } from 'models/message'
import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'

import bcrypt from 'bcryptjs'

const { Title } = Typography

function AddComment() {
  const [form, setForm] = useState<IMessage>({
    writer: '',
    message: '',
    deleteCode: '',
  })
  const firestore = useFirestore()
  const handleOnChange = (value: any, field: string) => {
    switch (field) {
      case 'message':
        return setForm((prev) => ({ ...prev, message: value }))
      case 'writer':
        return setForm((prev) => ({ ...prev, writer: value }))
      case 'deleteCode':
        return setForm((prev) => ({ ...prev, deleteCode: value }))
      default:
        return
    }
  }

  const handleOnClick = async () => {
    try {
      let comment = { ...form, created: new Date() }
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(comment.deleteCode, salt)
      comment = { ...comment, deleteCode: hash }
      await firestore.collection('messages').doc().set(comment)
      setForm({
        writer: '',
        message: '',
        deleteCode: '',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="comment-box">
      <Title level={2}>แสดงความคิดเห็น</Title>
      <Input
        onChange={(e) => handleOnChange(e.target.value, 'writer')}
        style={{ marginBottom: 8 }}
        value={form.writer}
        placeholder="ชื่อผู้เขียน"
      />
      <Input.TextArea
        onChange={(e) => handleOnChange(e.target.value, 'message')}
        style={{ marginBottom: 8 }}
        value={form.message}
        placeholder="ความคิดเห็น"
      />
      <Input
        onChange={(e) => handleOnChange(e.target.value, 'deleteCode')}
        style={{ marginBottom: 8 }}
        placeholder="รหัสสำหรับลบความเห็น"
        value={form.deleteCode}
        type="password"
      />
      <div style={{ marginBottom: 8, textAlign: 'right' }}>
        <Button onClick={handleOnClick} type="primary">
          ส่งความคิดเห็น
        </Button>
      </div>
    </div>
  )
}

export default AddComment
