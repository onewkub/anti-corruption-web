import Banner from 'assets/banner.png'
import { Row, Col, Typography } from 'antd'

const { Title } = Typography

function Home() {
  return (
    <Row className="App-Banner">
      <Col xs={24} sm={24} md={14} className="banner-logo">
        <img className="banner-img" src={Banner} alt="banner of site" />
      </Col>
      <Col xs={24} sm={24} md={10} className="banner-content">
        <Title className="banner-title">Anti Corruption</Title>
        <Title level={3}>มุมมอง และ ความหมาย ของการทุตริต</Title>
        <Title level={4}>Chiangmai University</Title>
      </Col>
    </Row>
  )
}

export default Home
