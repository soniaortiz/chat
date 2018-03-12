import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import {
  IntlProvider,
  // addLocaleData,
} from 'react-intl';

// addLocaleData([...es]);
const locale = window.navigator.language;
const appStringResources = require(`./locales.json`);

ReactDOM.render(
  <IntlProvider locale={locale || 'en-GB'} messages={appStringResources[locale]} >
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
