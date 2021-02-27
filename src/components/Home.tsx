import Banner from 'assets/banner.png'
import NotFoundImage from 'assets/not-found-image.jpg'
import { Row, Col, Typography, Image, Button } from 'antd'
import { CommentOutlined, VideoCameraOutlined, BarChartOutlined } from '@ant-design/icons'

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
        <Title level={3} className="banner-subtitle">
          ความหมาย ของการทุตริต
        </Title>
        <Title level={4}>Chiangmai University</Title>
        <div style={{ padding: '24px 0' }}>
          <Button
            size="large"
            type="primary"
            style={{ marginBottom: 6, width: 180 }}
            danger
            icon={<VideoCameraOutlined />}
            onClick={() =>
              document
                .getElementById('video')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            ดูวีดีโอ
          </Button>
          <br />
          <Button
            size="large"
            type="primary"
            style={{ marginBottom: 6,width: 180 }}
            icon={<CommentOutlined />}
            onClick={() =>
              document
                .getElementById('comment')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            แสดงความคิดเห็น
          </Button>
          <br />
          <Button
            size="large"
            style={{ width: 180}}
            icon={<BarChartOutlined />}
            onClick={() =>
              document
                .getElementById('vote')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            โหวตคะแนน
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default Home
