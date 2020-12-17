import { Input, Modal, Typography } from 'antd'
import { IMessage } from 'models/message'
import { useState } from 'react'
import { comparePassword } from 'services/BcryptService'
import { useFirestore } from 'react-redux-firebase'

const { Title, Paragraph } = Typography

interface IProps {
  open: boolean
  message?: IMessage
  closeDialog: () => void
}

function DeleteModal(props: IProps) {
  const { open, message, closeDialog } = props
  const firestore = useFirestore()
  const [password, setPassword] = useState<string>('')
  const handleOnOk = async () => {
    if (message) {
      const rlt = comparePassword(password, message.deleteCode)
      if (rlt) {
        try {
          await firestore.collection('messages').doc(message.id).delete()
          console.log('Delete Success')
          closeDialog()
        } catch (error) {
          console.error(error)
        }
      } else {
        console.log('Your password is incorrect.')
      }
    }
  }

  const handleOnCancel = () => {
    closeDialog()
  }

  const handleOnChange = (value: string) => {
    setPassword(() => value)
  }

  return (
    <Modal
      className="delete-modal"
      visible={open}
      okText="Delete"
      okButtonProps={{ type: 'primary', danger: true }}
      onCancel={handleOnCancel}
      onOk={handleOnOk}
    >
      <Title level={4}>ลบความเห็น</Title>
      <Paragraph>
        ผู้เขียน <b>{message?.writer}</b>
      </Paragraph>
      <Input
        placeholder="รหัสสำหรับลบความเห็น"
        type="password"
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </Modal>
  )
}

export default DeleteModal
