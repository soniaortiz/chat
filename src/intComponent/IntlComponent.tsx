// import { connect } from 'react-redux';
// const appStringResources = require('../locales.json');

// const ConnectedIntl = () => {
//     return null;
// };

// export default connect<{ locale: string }, {}, {}, {
//     locale?: string,
//     // tslint:disable-next-line:no-any
//     messages?: any
// }, AppStore.Store>(
//     (st) => ({
//         locale: st.app.locale
//     }),
//     {},
//     (m2p, d2p, owp) => {
//         return {
//             locale: m2p.locale,
//             messages: appStringResources[m2p.locale]
//         };
//     }
// )(ConnectedIntl);