import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import SiderDemo from './main';
import Users from './users'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={SiderDemo} />
          <Route exact path="/user" component={Users}/>
          <Route path="/user/:userid" component={Users}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
