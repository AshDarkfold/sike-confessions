import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Layout, Menu, Row, Col, Card, Button } from 'antd';
import {
  UserOutlined,
  HomeTwoTone,
} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import {AuthContext} from './auth';
import app from "./base.js";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { ReCaptcha } from 'react-recaptcha-v3';





const SiderDemo =(props)=> {
  const [currUser, setCurr] = useState(null)
  const [user1, setUser] = useState([])
  const [recaptok, setrecapTok] = useState(null)

  const verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    // console.log(recaptchaToken, "<= your recaptcha token")
    setrecapTok(recaptchaToken);
  }
  
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  const { Header,  Footer, Content } = Layout;



  const gauth = useCallback(
    async event => {
      event.preventDefault();
      try {
        await app
          .auth()
          .signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token)
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            let values = {
              "name":user.displayName,
              "email":user.email
            }
            fetch(process.env.REACT_APP_BASEURL+"api/user/login", {
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(values), // Coordinate the body type with 'Content-Type'
            headers: new Headers({
            'Content-Type': 'application/json',
            'g-recaptcha-response': setrecapTok
            }),
        }).then(response => {
            if(response.status === 200 || response.status===201 || response.status===202){
                return response.json();
            }else{
                // console.log(response)
                if(response.code===406){
                    alert("Recaptcha not verified. Try again later")
                }
            }
            })
            .then(data => {
                console.log(data)
                setUser(data.userId)
                localStorage.setItem("token", data.User.token);
                localStorage.setItem('user', data.userId)

            })
            .catch(error => {
                console.log(error);
            });
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            console.log(error)
            // ...
          });
        // history.push("/");
      } catch (error) {
        // alert(error);
        console.log(error)
      }
    },
    [alert, provider]
  );


const { currentUser } = useContext(AuthContext);

useEffect(() => {
  if (currentUser) {
    // return <Redirect to="/" />;
    // console.log(currentUser)
    setCurr(currentUser.uid)
  }
  // const fetchData = async() =>{
  //   const db = app.firestore()
  //   const data = await db.collection("users").get()
  //   setUsers(data.docs.map(doc=>doc.data()))
  //   console.log(users)
  // }
  // fetchData()
},[currentUser])
    

 

    return (
      <Layout className="layout">
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                <HomeTwoTone />
                <span>SiKe</span>
                </Menu.Item>
                <Menu.Item key="2">
                <NavLink to={'/user/'+user1}>
                    <UserOutlined />
                    <span>Profile</span>
                </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <Button type="dashed" onClick={gauth}>Login with G</Button>
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
          <ReCaptcha
                    sitekey="6Lc2lOcUAAAAAM6XhdDHUpSoNG1065CW_SiO0lix"
                    action='/'
                    verifyCallback={verifyCallback}
                />
        </Layout>
    );
  }

export default SiderDemo