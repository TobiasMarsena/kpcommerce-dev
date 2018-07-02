import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css'
import 'mdbreact/dist/css/mdb.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

const store = createStore( reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store = { store }><App /></Provider>,
  document.querySelector('#root')
);
