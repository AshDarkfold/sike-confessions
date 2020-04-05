import React from 'react';
import { Layout, Menu, Row, Col, Card, Form, Input, Button  } from 'antd';
import {
  UserOutlined,
  HomeTwoTone,
} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';

const { Header, Footer, Content } = Layout;

class Users extends React.Component {
constructor(props){
    super(props);
    this.state={
        collapsed: true,
    }
    console.log(props)
}
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  onFinish=(val)=>{
      console.log(val)
  }

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">
                    <NavLink to="/">
                    <HomeTwoTone />
                    <span>SiKe</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <UserOutlined />
                    <span>Profile</span>
                </Menu.Item>
            </Menu>
        </Header>
        <Content
            style={{ padding: '114px 50px 0px 50px' }}
          >
          <div className="site-layout-content">
            <h1>Joe Goldberg's Profile</h1>
            <div className='conf-cont'>
                <Form onFinish={this.onFinish} name="conf-form">
                    <Form.Item name="message" rules={[{
                        max: 100,
                        message: 'maximum 100 characters only!'
                    }]}>
                        <Input placeholder="Confess out!"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="conf-cards">
            <h2>Confessions for you -</h2>
                <Row gutter={16}>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card title="6/4/2020">
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

export default Users