import { Typography, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useFirebase, useFirestore } from 'react-redux-firebase'
import StatComponent from 'components/Stat'
import { useCookies } from 'react-cookie'

const { Title } = Typography

interface IAnswer {
  symbol: string
  description: string
  answer: number
}

interface IQuestion {
  question: string
  answers: IAnswer[]
}

interface IUserAnswer {
  question_I: number
  question_II: number
}

const questions: IQuestion[] = [
  {
    question: 'คุณคิดว่ารัฐบาลชุดนี้มีการทุจริตหรือไม่?',
    answers: [
      {
        symbol: '😀',
        description: 'ไม่มี',
        answer: 1,
      },
      {
        symbol: '😌',
        description: 'น้อย',
        answer: 2,
      },
      {
        symbol: '😞',
        description: 'ปานกลาง',
        answer: 3,
      },
      {
        symbol: '😠',
        description: 'ค่อนข้างมาก',
        answer: 4,
      },
      {
        symbol: '😤',
        description: 'มาก',
        answer: 5,
      },
    ],
  },
  {
    question: 'คุณคิดว่ารัฐบาลชุดนี้ทำงานได้ดีหรือไม่?',
    answers: [
      {
        symbol: '😤',
        description: 'แย่',
        answer: 1,
      },
      {
        symbol: '😠',
        description: 'ค่อนข้างแย่',
        answer: 2,
      },
      {
        symbol: '😞',
        description: 'ปานกลาง',
        answer: 3,
      },
      {
        symbol: '😌',
        description: 'ค่อนข้างดี',
        answer: 4,
      },
      {
        symbol: '😀',
        description: 'ดี',
        answer: 5,
      },
    ],
  },
]

function Vote() {
  const [index, setIndex] = useState<number>(0)
  const [answered, setAnswered] = useState<boolean>(false)
  const [cookies, setCookies] = useCookies(['vote-answer-anti'])

  // const [loading, setLoading] = useState<boolean>(false)
  const firebase = useFirebase()
  const firestore = useFirestore()
  const increment = firebase.firestore.FieldValue.increment(1)

  const [userAnswer, setUserAnwser] = useState<IUserAnswer>({
    question_I: 0,
    question_II: 0,
  })

  useEffect(() => {
    let oldAnswer = cookies['vote-answer-anti']
    if (oldAnswer) {
      setAnswered(true)
      // console.log(oldAnswer)
      // setI
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (index === -1) {
      saveUserAnswer().then(() => {
        setAnswered(true)
        setIndex(-2)
        setCookies('vote-answer-anti', userAnswer, { path: '/' , expires: new Date('2021-04-30')})
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const saveUserAnswer = async () => {
    console.log('Save User Answer to firebase')
    const question_1 = firestore.collection('stats').doc('question_1')
    const question_2 = firestore.collection('stats').doc('question_2')
    // const answer_1 = userAnswer.question_I
    // const answer_2 = userAnswer.question_II
    // question_1.update({ answer_1: increment })
    // question_2.update({ answer_2: increment })
    // console.log(userAnswer)
    if (userAnswer.question_I === 1) {
      await question_1.update({ 1: increment })
    } else if (userAnswer.question_I === 2) {
      await question_1.update({ 2: increment })
    } else if (userAnswer.question_I === 3) {
      await question_1.update({ 3: increment })
    } else if (userAnswer.question_I === 4) {
      await question_1.update({ 4: increment })
    } else if (userAnswer.question_I === 5) {
      await question_1.update({ 5: increment })
    }
    // just a stupid code.  don't care it. i don't have any idea to solve this problem hahaha >.<
    if (userAnswer.question_II === 1) {
      await question_2.update({ 1: increment })
    } else if (userAnswer.question_II === 2) {
      await question_2.update({ 2: increment })
    } else if (userAnswer.question_II === 3) {
      await question_2.update({ 3: increment })
    } else if (userAnswer.question_II === 4) {
      await question_2.update({ 4: increment })
    } else if (userAnswer.question_II === 5) {
      await question_2.update({ 5: increment })
    }
  }
  const handleOnAnswer = (answer: number) => {
    // console.log('User has been answered.')
    if (index === 0) {
      setUserAnwser((userAnswer) => ({ ...userAnswer, question_I: answer }))
      setIndex((i) => i + 1)
    } else if (index === 1) {
      setUserAnwser((userAnswer) => ({ ...userAnswer, question_II: answer }))
      setIndex(-1)
    }
  }

  return (
    <div id="vote" className="App-Vote-content">
      {answered && <StatComponent />}
      {index > -1 && !answered && (
        <div className="question-container">
          <Title>{questions[index].question}</Title>
          <div className="vote-answer-box">
            {questions[index].answers.map((answer, index) => (
              <div key={index}>
                <div
                  className="answer-btn"
                  onClick={() => handleOnAnswer(answer.answer)}
                >
                  <Title style={{ margin: 0 }}>{answer.symbol}</Title>
                </div>
                <Title level={5}>{answer.description}</Title>
              </div>
            ))}
          </div>
        </div>
      )}
      {index === -1 && !answered && (
        <div>
          <Title>ขอบคุณสำหรับการตอบคำถามของท่าน</Title>
          <Title level={2}>ระบบกำลังบันทึกคำตอบของท่าน😇</Title>
          <Spin size="large" />
        </div>
      )}
    </div>
  )
}

export default Vote
