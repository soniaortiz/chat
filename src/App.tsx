import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
const { BrowserRouter, Route } = ReactRouter;
import { Signup } from './components/Signup/signup';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboardIndex';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { store as storeReducer } from './store/reducers';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { composeWithDevTools } from 'remote-redux-devtools';
import { IntlProvider } from 'react-intl';

const getTheme = () => {
  let overwrites = {};
  return getMuiTheme(baseTheme, overwrites);
};

const locale = window.navigator.language;
const appStringResources = require(`./locales.json`);

const compeEnhancers = composeWithDevTools({ name: 'PrimitiveChat' }, );
export const store = createStore(storeReducer, compeEnhancers(applyMiddleware(thunk)));

const ConnectedIntl = connect<{ locale: string }, {}, {}, {
  locale?: string,
  // tslint:disable-next-line:no-any
  messages?: any
}, AppStore.Store>(
  (st) => ({
    locale: ''
  }),
  {},
  (m2p, d2p, owp) => {
    return {
      locale: m2p.locale,
      messages: appStringResources[m2p.locale]
    };
  }
)(IntlProvider);

console.log(ConnectedIntl);

class App extends React.Component {
  render() {
    return (
      < Provider store={store}>
        <MuiThemeProvider muiTheme={getTheme()}>

          <IntlProvider locale={locale || 'en-GB'} messages={appStringResources[locale]} >
            <BrowserRouter>

              <div>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Signup} />
                <Route exact path="/dashboard" component={Dashboard} />
              </div>

            </BrowserRouter>
          </IntlProvider>

        </MuiThemeProvider>
      </ Provider>
    );
  }
}
export default App;