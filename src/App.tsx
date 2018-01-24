import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
const { BrowserRouter, Route } = ReactRouter;
import { Signup } from './components/signup';
import Login from './components/login';
import { Dashboard } from './components/dashboard/dashboardIndex';
import { MuiThemeProvider, getMuiTheme, lightBaseTheme } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { store as storeReducer } from './store/reducers';

const store = createStore(storeReducer, applyMiddleware(thunk));

class App extends React.Component {
  render() {
    return (
      < Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
