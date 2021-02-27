import { Input, Typography, Button, Form } from 'antd'
import { IMessage } from 'models/message'
// import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'

// import bcrypt from 'bcryptjs'
import { comparePassword, hashPassword } from 'services/BcryptService'

const { Title } = Typography
function AddComment() {
  const [form] = Form.useForm()
  // const [form, setForm] = useState<IMessage>({
  //   writer: '',
  //   message: '',
  //   deleteCode: '',
  // })
  const firestore = useFirestore()
  // const handleOnChange = (value: any, field: string) => {
  //   switch (field) {
  //     case 'message':
  //       return setForm((prev) => ({ ...prev, message: value }))
  //     case 'writer':
  //       return setForm((prev) => ({ ...prev, writer: value }))
  //     case 'deleteCode':
  //       return setForm((prev) => ({ ...prev, deleteCode: value }))
  //     default:
  //       return
  //   }
  // }

  const handleOnClick = async (_form: IMessage) => {
    try {
      let comment = { ..._form, created: new Date() }
      // console.log(comment)
      const hash = await hashPassword(_form.deleteCode)
      comment = { ...comment, deleteCode: hash }

      const rlt = await comparePassword(_form.deleteCode, hash)

      console.log('compare status: ', rlt)

      await firestore.collection('messages').doc().set(comment)

      // setForm({
      //   writer: '',
      //   message: '',
      //   deleteCode: '',
      // })
      form.resetFields()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="comment-box">
      <Title level={2}>แสดงความคิดเห็น</Title>
      <Form form={form} onFinish={handleOnClick}>
        <Form.Item name="writer" rules={[{required: true, message: 'กรุณาใส่ชื่อผู้เขียน'}]}>
          <Input
            // onChange={(e) => handleOnChange(e.target.value, 'writer')}
            // value={form.writer}
            placeholder="ชื่อผู้เขียน"
          />
        </Form.Item>
        <Form.Item name="message" rules={[{required: true, message: 'กรุณาใส่ความคิดเห็น'}]}>
          <Input.TextArea
            // onChange={(e) => handleOnChange(e.target.value, 'message')}
            // value={form.message}
            placeholder="ความคิดเห็น"
          />
        </Form.Item>
        <Form.Item name="deleteCode" rules={[{required: true, message: 'กรุณาใส่รหัสเพื่อใช้ลบความคิดเห็น'}]}>
          <Input
            // onChange={(e) => handleOnChange(e.target.value, 'deleteCode')}
            placeholder="รหัสสำหรับลบความเห็น"
            // value={form.deleteCode}
            type="password"
          />
        </Form.Item>

        <div style={{ marginBottom: 8, textAlign: 'right' }}>
          <Button htmlType="submit" type="primary">
            ส่งความคิดเห็น
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AddComment
