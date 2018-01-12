import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
const { BrowserRouter, Route } = ReactRouter;
import { Signup } from './components/signup';
import { Login } from './components/login';
import { Dashboard } from './components/dashboard/dashboardIndex';
import { MuiThemeProvider, getMuiTheme, lightBaseTheme } from 'material-ui/styles';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/registration" component={Signup} />
            <Route path="/dashboard"
              render={() => <div><Dashboard /></div>
              } />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}
export default App;
