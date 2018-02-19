import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
const { BrowserRouter, Route } = ReactRouter;
import { Signup } from './components/Signup/signup';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboardIndex';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { store as storeReducer } from './store/reducers';

const store = createStore(storeReducer, applyMiddleware(thunk));

class App extends React.Component {
  render() {
    return (
      < Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme({
          palette: {
            primary1Color: '#e91e63',
            primary2Color: '#00bcd4',
            primary3Color: '#fafafa'
          },
          avatar: {
            color: '#ffffff'
          },
          badge: {
            textColor: '#000000'
          }
        })}>
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={Signup} />
              <Route path="/dashboard" component={Dashboard} />
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </ Provider>
    );
  }
}
export default App;
