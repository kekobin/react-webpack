require('es6-object-assign').polyfill();
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers/mapp'
import Mapp from './containers/Mapp'
import 'normalize.css';
import './assets/sass/commonMain.scss';
import Helper from './assets/js/helper'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <Mapp />
  </Provider>,
  document.getElementById('mainRoot')
)

