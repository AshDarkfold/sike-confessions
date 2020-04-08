import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import SiderDemo from './main';
import Users from './users';
import {AuthProvider} from './auth';
import { loadReCaptcha } from 'react-recaptcha-v3';



function App() {
  useEffect(() => {
    loadReCaptcha("6Lc2lOcUAAAAAM6XhdDHUpSoNG1065CW_SiO0lix");
  })
  return (
    <AuthProvider>
        <BrowserRouter>
          <Route exact path="/" component={SiderDemo} />
          <Route exact path="/user" component={Users}/>
          <Route path="/user/:userid" component={Users}/>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
