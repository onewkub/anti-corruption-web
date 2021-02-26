import { Typography, Spin } from 'antd'
import { useState } from 'react'

const { Title, Text } = Typography

interface IAnswer {
  symbol: string
  description: string
  answer: number
}

interface IQuestion {
  question: string
  answers: IAnswer[]
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
        symbol: '😀',
        description: 'แย่',
        answer: 1,
      },
      {
        symbol: '😌',
        description: 'ค่อนข้างแย่',
        answer: 2,
      },
      {
        symbol: '😞',
        description: 'ปานกลาง',
        answer: 3,
      },
      {
        symbol: '😠',
        description: 'ค่อนข้างดี',
        answer: 4,
      },
      {
        symbol: '😤',
        description: 'ดีมาก',
        answer: 5,
      },
    ],
  },
]

function Vote() {
  const [index, setIndex] = useState<number>(0)
  const handleOnAnswer = (answer: number) => {
    console.log('User has been answered.')
    // go to next question
    if (index === 0) {
      setIndex((i) => i + 1)
    } else if (index === 1) {
      setIndex(-1)
    }
  }
  return (
    <div id="vote" className="App-Vote-content">
      {index !== -1 && (
        <div>
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
                <Text strong>{answer.description}</Text>
              </div>
            ))}
          </div>
        </div>
      )}
      {index === -1 && (
        <div>
          <Title>ขอบคุณสำหรับการตอบคำถามของท่าน</Title>
          <Title level={2}>กำลังบันทึกคำตอบของท่าน😇</Title>
          <Spin size="large"/>
        </div>
      )}
    </div>
  )
}

export default Vote
