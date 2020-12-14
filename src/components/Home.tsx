import Banner from 'assets/banner.png'
import {Row, Col} from 'antd'
function Home() {
  return (
    <Row className="App-Banner">
      <Col xs={24} sm={24} md={14} className="banner-logo">
        <img className="banner-img" src={Banner} alt="banner of site"/>

      </Col>
      <Col xs={24} sm={24} md={10} className="banner-content">
        <h1 className="banner-title">Anti Corruption</h1>
        <h2>มุมมอง และ ความหมาย ของการทุตริต</h2>
        <h3>Chiangmai University</h3>
      </Col>
    </Row>
  )
}

export default Home
