import { Typography, Row, Col, Card, Image, Divider } from 'antd'
import NotFoundImage from 'assets/not-found-image.jpg'
import AboutUs from 'assets/about_us.json'

const { Title } = Typography

function About() {
  return (
    <div className="App-About">
      <Title>เกี่ยวกับพวกเรา</Title>
      <Row gutter={[8, 16]}>
        {AboutUs.map((item, index) => (
          <Col key={index} xs={24} sm={24} lg={12}>
            <Card className="profile-card" bodyStyle={{ padding: 4 }}>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Image
                    className="profile-image"
                    width="100%"
                    src={item.image}
                    fallback={NotFoundImage}
                  />
                </Col>
                <Col span={16} style={{ padding: 24 }}>
                  <Title level={4}>" {item.message} "</Title>
                  <Divider />
                  <div style={{ textAlign: 'right' }}>
                    <Title level={2} style={{ marginBottom: 2 }}>
                      {item.name}
                    </Title>
                    <Title level={4} style={{ margin: 0 }}>
                      นักศึกษาชั้นปีที่ {item.year} คณะ{item.faculty}
                    </Title>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default About
