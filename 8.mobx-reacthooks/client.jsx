import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './App';
import StoreProvider from './Context';

const Hot = hot(App);

// <StoreProvider>
// </StoreProvider>,
ReactDOM.render(
  <Hot />,
  document.querySelector('#root'),
);
