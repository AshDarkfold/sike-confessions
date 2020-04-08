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
  const [user1, setUser] = useState(null);
  const [recaptok, setrecapTok] = useState(null);
  const [logbtnval, setlogbtn] = useState("Login");
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);
  const [sec, setSec] = useState(null);

  const verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    // console.log(recaptchaToken, "<= your recaptcha token")
    setrecapTok(recaptchaToken);
  }
  
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  const { Header,  Footer, Content } = Layout;

  const showDate=(endtime)=>{
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    
    setDay(days)
    setHour(hours)
    setMin(minutes)
    setSec(seconds)
  } 

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
            'g-recaptcha-response': recaptok
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
                localStorage.setItem("token", data.Token);
                localStorage.setItem('user', data.userId);
                localStorage.setItem("name", data.name)
                setlogbtn("Hey "+data.name)
                props.history.push("/user/"+data.userId)
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
  if(localStorage.getItem("user")){
    setUser(localStorage.getItem("user"))
  }
  if(user1){
    setlogbtn("Hey "+localStorage.getItem("name"))
  }else{
    setlogbtn("Login")
  }
  // setInterval(() => {
  //   showDate("April 14 2020 15:00:00 GMT+0530");
  // }, 1000);
},[user1])
 


const colorz = ['#BBB7FF', '#F4B7FF', '#FFB7BF', '#B7ECFF', '#CCFFB7', '#F6FFB7']

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
            </Menu>
            <Button className="loginbutton" type="dashed" onClick={gauth} >{logbtnval}</Button>
        </Header>
          <Content
          >
          <div className="site-layout-content">
          <h1>SiKe Confessions</h1>
            <div className='conf-cont'>
                <p>Confess your deepest darkest desires, while staying completely anonymous!</p>
            </div>
            <div className="conf-cards">
                <Row gutter={16}>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card style={{backgroundColor:colorz[Math.floor(Math.random() * colorz.length)]}}>
                        <p>Hey I think you're great! Hope we could talk more!</p>
                    </Card>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card style={{backgroundColor:colorz[Math.floor(Math.random() * colorz.length)]}}>
                        <p>I really dont like how you treated me in high school!</p>
                    </Card>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card style={{backgroundColor:colorz[Math.floor(Math.random() * colorz.length)]}}>
                        <p>Samantha you're a bitch</p>
                    </Card>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card style={{backgroundColor:colorz[Math.floor(Math.random() * colorz.length)]}}>
                        <p>I don't know how to start talking to you, your so pretty!</p>
                    </Card>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card style={{backgroundColor:colorz[Math.floor(Math.random() * colorz.length)]}}>
                      <h3>Time until the BIG giveaway! </h3>
                      <p>Days: {day}</p>
                      <p>, Hours: {hour}</p>
                      <p>, Minutes: {min}</p>
                      <p>, Seconds: {sec}</p>
                    </Card>
                    </Col>
   
                </Row>
            </div>
          </div>
           
          </Content>
          <Footer style={{ textAlign: 'center' }}>Sike Confessions | Hey! I created this website for fun among friends and strangers, feel free to share it among yours! </Footer>
          <ReCaptcha
                    sitekey="6Lc2lOcUAAAAAM6XhdDHUpSoNG1065CW_SiO0lix"
                    action='/'
                    verifyCallback={verifyCallback}
                />
        </Layout>
    );
  }

export default SiderDemo