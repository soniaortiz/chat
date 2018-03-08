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

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { composeWithDevTools } from 'remote-redux-devtools';

const getTheme = () => {
  let overwrites = {};
  return getMuiTheme(baseTheme, overwrites);
};

const compeEnhancers = composeWithDevTools({name: 'PrimitiveChat'}, );
// export const store = createStore(storeReducer, composeWithDevTools( applyMiddleware(thunk)));
export const store =  createStore(storeReducer, compeEnhancers(applyMiddleware(thunk)));
// store.dispatch
class App extends React.Component {
  render() {
    return (
      < Provider store={store}>
        <MuiThemeProvider muiTheme={getTheme()}>
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={Signup} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </ Provider>
    );
  }
}
export default App;
