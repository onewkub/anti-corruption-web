import { Input, Modal, Typography, Form, Button } from 'antd'
import { IMessage } from 'models/message'
import { useEffect, useState } from 'react'
import { comparePassword } from 'services/BcryptService'
import { useFirestore } from 'react-redux-firebase'
import { ValidateStatus } from 'antd/lib/form/FormItem'

const { Title, Paragraph } = Typography

interface IProps {
  open: boolean
  message?: IMessage
  closeDialog: () => void
}

function DeleteModal(props: IProps) {
  const { open, message, closeDialog } = props
  const firestore = useFirestore()
  const [form] = Form.useForm()
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>('')
  const [help, setHelp] = useState<string | undefined>(undefined)
  const [timer, setTimer] = useState<boolean>(false)
  const [secondToGo, setSecondToGo] = useState<number>(3)

  let timeout: NodeJS.Timeout
  let _timer: NodeJS.Timeout

  useEffect(() => {
    console.log('Load Modal')
    return () => {
      clearTimeout(timeout)
      clearInterval(_timer)
    }
    // eslint-disable-next-line
  }, [])

  const handleOnOk = async (value: { password: string }) => {
    const { password } = value
    if (!password || password === '') {
      setValidateStatus('error')
      setHelp('กรุณาใส่รหัสผ่านสำหรับลบความเห็น')
      return
    }
    if (message) {
      setValidateStatus('validating')
      const rlt: boolean = await comparePassword(password, message.deleteCode)
      if (rlt) {
        try {
          await firestore.collection('messages').doc(message.id).delete()
          setValidateStatus('success')
          console.log('Delete Success')
          setTimer(true)
          _timer = setInterval(() => {
            setSecondToGo((prev) => prev - 1)
          }, 1000)
          timeout = setTimeout(() => {
            clearInterval(_timer)
            closeDialog()
          }, secondToGo * 1000)
        } catch (error) {
          console.error(error)
          setHelp('มีบางอย่างผิดพลาด')
          setValidateStatus('error')
        }
      } else {
        setValidateStatus('error')
        setHelp('รหัสผ่านผิด')
        console.log('Your password is incorrect.')
        // setPassword('')
      }
    }
  }

  const handleOnCancel = () => {
    setTimer(false)
    setSecondToGo(3)
    setValidateStatus('')
    closeDialog()
    form.resetFields()
  }

  const handleOnChange = (value: { password: string }) => {
    const { password } = value
    // console.log(value)
    if (!password || password === '') {
      setValidateStatus('error')
      setHelp('กรุณาใส่รหัสผ่านสำหรับลบความเห็น')
      return
    }
    setValidateStatus('')
    setHelp(undefined)
  }

  return (
    <Modal
      className="delete-modal"
      visible={open}
      maskClosable={false}
      onCancel={handleOnCancel}
      footer={null}
    >
      <Title level={4}>ลบความเห็น</Title>
      <Paragraph>
        ผู้เขียน <b>{message?.writer}</b>
      </Paragraph>

      <Form
        form={form}
        onFinish={handleOnOk}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onValuesChange={handleOnChange}
      >
        <Form.Item
          label="รหัสลบข้อความ"
          name="password"
          hasFeedback
          validateStatus={validateStatus}
          help={help}
        >
          <Input placeholder="รหัสสำหรับลบความเห็น" type="password" />
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          {timer && (
            <Paragraph>กล่องจะถูกปิดลงภายใน {secondToGo} วินาที</Paragraph>
          )}
        </div>
        {!timer && (
          <div className="delete-modal-action">
            <div>
              <Button
                htmlType="button"
                onClick={handleOnCancel}
                style={{ marginRight: 8 }}
              >
                ยกเลิก
              </Button>
            </div>
            <div>
              <Button type="primary" danger htmlType="submit">
                ลบข้อความ
              </Button>
            </div>
          </div>
        )}
      </Form>
    </Modal>
  )
}

export default DeleteModal
