import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as ReactRouter from 'react-router-dom';
import {Signup} from './components/signup';
import {Login} from './components/login';
const {BrowserRouter, Route} = ReactRouter;

import './index.css';

  ReactDOM.render(
    (
      <BrowserRouter> 
        <div>
          <Route path="/" component={Login}/>
          <Route path="/registration" component={Signup}/>
        </div>        
      </BrowserRouter>
    ), document.getElementById('root')
  )
registerServiceWorker();
