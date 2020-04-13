import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import SiderDemo from './main';
import Users from './users';
import {AuthProvider} from './auth';
import { loadReCaptcha } from 'react-recaptcha-v3';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}


function App() {
  useEffect(() => {
    loadReCaptcha("6Lc2lOcUAAAAAM6XhdDHUpSoNG1065CW_SiO0lix");
  })
  return (
    <AuthProvider>
          <BrowserRouter>
            <AlertProvider template={AlertTemplate} {...options}>
                <Route exact path="/" component={SiderDemo} />
                <Route exact path="/user" component={Users}/>
                <Route path="/user/:userid" component={Users}/>
            </AlertProvider>
          </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
