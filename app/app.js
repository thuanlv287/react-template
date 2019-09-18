import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './configureStore';
import LanguageProvider from './containers/LanguageProvider/view';
import App from './containers/App/view';
import { translationMessages } from './i18n.js';
import history from './utils/history';
import './styles/ITcss'

const MOUNT_NODE = document.getElementById('app');

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

const renderApp = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
    , MOUNT_NODE
  )
}

renderApp(translationMessages);
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}