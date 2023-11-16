import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import meraStore, { persistor } from './Components/store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App'; 

ReactDOM.render(
  <Provider store={meraStore}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
