import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import {
  IntlProvider,
  addLocaleData,
} from 'react-intl';

import * as es from 'react-intl/locale-data/es';
addLocaleData([...es]);
const locale = 'es-419';
const appStringResources = require(`./locales.json`);

// console.log('!@#$%^&*() ', appStringResources[locale]);

ReactDOM.render(
  <IntlProvider locale={locale || 'en-GB'} messages={appStringResources[locale]} >
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
