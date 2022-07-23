import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import dotenv from 'dotenv';
import axios from 'axios';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import global_es from '../src/Translations/global_es.json'
import global_en from '../src/Translations/global_en.json'

dotenv.config();

i18next.init({
  interpolation: {escapeValue: false},
  lng: "en",
  resources :{
    es:{
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}> 
        <BrowserRouter>
          <App />
        </BrowserRouter>  
        </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
