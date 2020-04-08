import React,{useContext, useCallback, useState, useEffect}  from 'react';
import { Layout, Menu, Row, Col, Card, Form, Input, Button  } from 'antd';
import {
  UserOutlined,
  HomeTwoTone,
} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';
import {AuthContext} from './auth';
import app from "./base.js";
import { loadReCaptcha } from 'react-recaptcha-v3';

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

const { Header, Footer, Content } = Layout;

const Users = (props) => {
const [sameuser, setuser] = useState(false)
const [currentData, newcurrData] = useState([])
const [confs, newConfs] = useState([])


  // const gauth = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     try {
  //       await app
  //         .auth()
  //         .signInWithPopup(provider).then(function(result) {
  //           // This gives you a Google Access Token. You can use it to access the Google API.
  //           var token = result.credential.accessToken;
  //           console.log(token)
  //           // The signed-in user info.
  //           var user = result.user;
  //           console.log(user)
  //           // ...
  //         }).catch(function(error) {
  //           // Handle Errors here.
  //           console.log(error)
  //           // ...
  //         });
  //       // history.push("/");
  //     } catch (error) {
  //       // alert(error);
  //       console.log(error)
  //     }
  //   },
  //   [props.history]
  // );

  const { currentUser } = useContext(AuthContext);
useEffect(() => {
  if (localStorage.getItem("token")) {
    if(localStorage.getItem("user") === props.match.params.userid){
      setuser(true)
      fetch(process.env.REACT_APP_BASEURL+"api/user/getmydata",{
        headers: new Headers({
          token: localStorage.getItem("token") 
        })
      })
      .then(response => response.json())
      .then(data =>{
        console.log(data)
        newcurrData({
          'name':data.name,
          'bio':data.bio,
          'userID':data.userId
        })
        newConfs(data.confessions)
        console.log(sameuser, currentData, confs)

      })
    }else{
      setuser(false)
      console.log(props)
      fetch(process.env.REACT_APP_BASEURL+"api/user/gethisdata/"+props.match.params.userid,{
        headers: new Headers({
          token: localStorage.getItem("token") 
        })
      })
      .then(response => response.json())
      .then(data =>{
        newcurrData({
          'name':data.name,
          'bio':data.bio,
        })
        newConfs(null)
        console.log(sameuser, currentData, confs)
      })
    }
  }
  else{
      props.history.push("/")
    }

}, [currentUser, props, sameuser, confs, currentData])
 
// console.log(props.match.params.userid)
// console.log(sameuser)

const sgnout=()=>{
  app.auth().signOut().then(function() {
    // Sign-out successful.\
    localStorage.removeItem("token")
    props.history.push("/")
  }).catch(function(error) {
    // An error happened.
  });
}

 const onFinish=(val)=>{
  if(val){
    let data = {
      'userId':localStorage.getItem("user"),
      'confess': val.message
    }
    console.log(JSON.stringify(data))
    fetch(process.env.REACT_APP_BASEURL+"api/user/addConfession/"+props.match.params.userid, {
      method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
        })
      // token: localStorage.getItem("token")
    })
    .then(response => response.json())
    .then(data=>{
      console.log(data)
})
    .catch(error=> console.error(error))
  }
}

const colorz = ['#BBB7FF', '#F4B7FF', '#FFB7BF', '#B7ECFF', '#CCFFB7', '#F6FFB7']
    return (
      <Layout className="layout">
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
            <Button type="dashed" className="loginbutton" onClick={sgnout}>Sign out</Button>
        </Header>
        <Content
          >
          <div className="site-layout-content">
            <h1>{currentData.name}'s Profile</h1>
            <p>{currentData.bio}</p>
            <Input />
            <Button>Update Bio</Button>
            <div className='conf-cont'>
                <Form onFinish={onFinish} name="conf-form">
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
                    {
          
                      confs?(
                      confs.map(con=>{
                        let a = Math.random(0,5);
                        return(
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                        <Card style={{backgroundColor:colorz[Math.floor(Math.random() * colorz.length)]}}>
                          <p>{con.confess}</p>
                        </Card>
                    </Col>

                      )})
                    ):<div>You don't have any confessions yet! Share the url on social media to get some!</div>
                      
                    }
                </Row>
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Sike Confessions | Hey! I created this website for fun among friends and strangers, feel free to share it among yours! </Footer>
        </Layout>
    );
  }

export default Users