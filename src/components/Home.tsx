import Banner from 'assets/banner.png'
import NotFoundImage from 'assets/not-found-image.jpg'
import { Row, Col, Typography, Image } from 'antd'

const { Title } = Typography

function Home() {
  return (
    <Row className="App-Banner">
      <Col xs={24} sm={24} md={14} className="banner-logo">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            className="banner-img"
            src={Banner}
            alt="banner of site"
            preview={false}
            fallback={NotFoundImage}
          />
        </div>
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
