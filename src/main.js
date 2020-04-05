import React from 'react';
import { Layout, Menu, Row, Col, Card } from 'antd';
import {
  UserOutlined,
  HomeTwoTone,
} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';


const { Header,  Footer, Content } = Layout;

class SiderDemo extends React.Component {
constructor(props){
    super(props);
    this.state={
        collapsed: true,
        selectedmenu: '1'
    }
}
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="layout">
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                <HomeTwoTone />
                <span>SiKe</span>
                </Menu.Item>
                <Menu.Item key="2">
                <NavLink to="/user/">
                    <UserOutlined />
                    <span>Profile</span>
                </NavLink>
                </Menu.Item>
            </Menu>
        </Header>
          <Content
            style={{ padding: '114px 50px 0px 50px' }}
          >
          <div className="site-layout-content">
          <h1>SiKe Confessions</h1>
            <div className='conf-cont'>
                <p>Confess your deepest darkest desires, while staying completely anonymous!</p>
            </div>
            <div className="conf-cards">
                <Row gutter={16}>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card title="Default size card">
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card title="Default size card">
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card title="Default size card">
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card title="Default size card">
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    </Col>
                </Row>
            </div>
          </div>
           
          </Content>
          <Footer style={{ textAlign: 'center' }}>Sike Confessions 2020</Footer>
        </Layout>
    );
  }
}

export default SiderDemo