import { Typography, Row, Col } from 'antd'
import { Bar, defaults } from 'react-chartjs-2'

const { Title } = Typography

function Stat() {
  defaults.global.defaultFontFamily = "'Kanit', sans-serif"
  defaults.global.defaultFontSize = 16
  const data = {
    labels: ['ไม่มี😀', 'น้อย😌', 'ปานกลาง😞', 'ค่อนข้างมาก😠', 'มาก😤'],
    datasets: [
      {
        label: 'คะแนน',
        data: [1, 2, 3, 4, 5],
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
            fontColor: 'black'
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

  return (
    <>
      <Title>คำตอบทั้งหมด</Title>
      <Row>
        <Col xs={24} sm={24} lg={12}>
          <Bar data={data} options={options}></Bar>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <Bar data={data} options={options}></Bar>
        </Col>
      </Row>
    </>
  )
}

export default Stat
