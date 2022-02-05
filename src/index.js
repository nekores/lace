import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './containers/App';
import Store from './stores';
import reportWebVitals from './reportWebVitals';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-virtualized/styles.css';

import './style.css';

ReactDOM.render(
  <Provider {...Store()}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
