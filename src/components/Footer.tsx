import { Typography } from 'antd'

const { Title } = Typography

function Footer() {
  return (
    <div className="App-Footer">
      <Title level={4} style={{ color: '#ffd5cd' }}>
        เว็บไซต์นี้จัดทำเพื่อเก็บข้อมูลและนำเสนอความหมายของการทุจริตเพื่อเป็นรายงานนำเสนอในวิชา
        Anti Corruption (140103)
      </Title>
    </div>
  )
}

export default Footer
