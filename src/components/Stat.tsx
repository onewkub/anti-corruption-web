import { useState, useEffect } from 'react'
import { Typography, Row, Col, Spin } from 'antd'
import { Bar, defaults } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import { RootState } from 'store/reducers'
import ChartDataLabels from 'chartjs-plugin-datalabels'

interface IQuestion {
  id: string
  1: number
  2: number
  3: number
  4: number
  5: number
}
const { Title } = Typography

function Stat() {
  useFirestoreConnect<IQuestion[]>([{ collection: 'stats' }])

  const question: IQuestion[] = useSelector(
    (state: RootState) => state.firestore.ordered.stats,
  )

  const [data_q1, setQ1] = useState<number[]>([0, 0, 0, 0, 0])
  const [data_q2, setQ2] = useState<number[]>([0, 0, 0, 0, 0])
  // const [data_1, setData_1] = useState<any>({
  //   labels: ['ไม่มี😀', 'น้อย😌', 'ปานกลาง😞', 'ค่อนข้างมาก😠', 'มาก😤'],
  //   datasets: [
  //     {
  //       label: 'คะแนน',
  //       data: [0, 0, 0, 0, 0],
  //       backgroundColor: 'white',
  //     },
  //   ],
  // })

  useEffect(() => {
    if (isLoaded(question)) {
      const quest_q1 = [
        question[0][1],
        question[0][2],
        question[0][3],
        question[0][4],
        question[0][5],
      ]
      // console.log(quest_q1)
      setQ1(quest_q1)
      // setData_1((value: any) => ({
      //   ...value,
      //   datasets: [
      //     {
      //       ...value.datasets,
      //       data: quest_q1,
      //     },
      //   ],
      // }))
      const quest_q2 = [
        question[1][1],
        question[1][2],
        question[1][3],
        question[1][4],
        question[1][5],
      ]
      setQ2(quest_q2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  // console.log(question)

  defaults.global.defaultFontFamily = "'Kanit', sans-serif"
  defaults.global.defaultFontSize = 16
  const data_1 = {
    labels: ['ไม่มี😀', 'น้อย😌', 'ปานกลาง😞', 'ค่อนข้างมาก😠', 'มาก😤'],
    datasets: [
      {
        label: 'คะแนน',
        data: data_q1,
        backgroundColor: 'white',
      },
    ],
  }
  const data_2 = {
    labels: ['แย่😤', 'ค่อนข้างแย่😠', 'ปานกลาง😞', 'ค่อนข้างดี😌', 'ดี😀'],
    datasets: [
      {
        label: 'คะแนน',
        data: data_q2,
        backgroundColor: 'white',
      },
    ],
  }
  const options = {
    fontFamily: "'Kanit', sans-serif",
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: false,
          ticks: {
            padding: 8,
            fontColor: 'black',
          },
        },
      ],
      yAxes: [
        {
          gridLines: false,
          ticks: {
            display: false,
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
    title: {
      display: true,
      text: 'คุณคิดว่ารัฐบาลชุดนี้มีการทุจริตหรือไม่?',
      fontColor: 'black',
      fontSize: 24,
    },
    legend: false,
  }
  const options_2 = {
    fontFamily: "'Kanit', sans-serif",
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: false,
          ticks: {
            padding: 8,
            fontColor: 'black',
          },
        },
      ],
      yAxes: [
        {
          gridLines: false,
          ticks: {
            display: false,
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
    title: {
      display: true,
      text: 'คุณคิดว่ารัฐบาลชุดนี้ทำงานได้ดีหรือไม่',
      fontColor: 'black',
      fontSize: 24,
    },
    legend: false,
  }
  if (!isLoaded(question)) {
    return <Spin />
  }
  return (
    <>
      <Title>
        จำนวนคำตอบทั้งหมด :{' '}
        {data_q1.reduce((ac: number, cur: number) => ac + cur, 0)}{' '}
      </Title>
      <Row>
        <Col xs={24} sm={24} lg={12}>
          <Bar
            data={data_1}
            options={options}
            plugins={[ChartDataLabels]}
          ></Bar>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <Bar
            data={data_2}
            options={options_2}
            plugins={[ChartDataLabels]}
          ></Bar>
        </Col>
      </Row>
    </>
  )
}

export default Stat
