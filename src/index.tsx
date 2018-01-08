import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as ReactRouter from 'react-router-dom';
import {Signup} from './components/signup'
const {BrowserRouter, Route} = ReactRouter;
import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// );

  ReactDOM.render(
    (
      <BrowserRouter> 
        <Route path="/registration" component={Signup}/>
      </BrowserRouter>
    ), document.getElementById('root')
  )
registerServiceWorker();
