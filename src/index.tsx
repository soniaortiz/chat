import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as ReactRouter from 'react-router-dom';
import {Signup} from './components/signup';
import {Login} from './components/login';
import {Dashboard} from './components/dashboard/dashboardIndex';
const {BrowserRouter, Route} = ReactRouter;

import './index.css';
  ReactDOM.render(
    (
      <BrowserRouter> 
        <div>
          <Route exact path="/" component={Login}/>
          <Route exact path="/registration" component={Signup}/>
          <Route path="/dashboard" 
                render={()=><div><Dashboard /></div>
                } />
          </div>
      </BrowserRouter>
    ), document.getElementById('root')
  )
registerServiceWorker();
