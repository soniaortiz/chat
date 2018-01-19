import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
const { BrowserRouter, Route } = ReactRouter;
import { Signup } from './components/signup';
import Login from './components/login';
import { Dashboard } from './components/dashboard/dashboardIndex';
import { MuiThemeProvider, getMuiTheme, lightBaseTheme } from 'material-ui/styles';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {store as storeReducer} from './reducers';
const store = createStore(storeReducer);

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
            <Route path="/dashboard"
              render={() => <div><Dashboard /></div>
              } />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
      </ Provider>
    )
  }
}
export default App;
