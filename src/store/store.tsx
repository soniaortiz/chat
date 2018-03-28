import { persistStore, persistReducer } from 'redux-persist';
import { store as storeReducer } from './reducers';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, storeReducer);
const compeEnhancers = composeWithDevTools({ name: 'PrimitiveChat' }, );

export default () => {
    const store = createStore(persistedReducer, compeEnhancers(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return { store, persistor };
  };