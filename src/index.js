import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//store
import { store } from './store'
//route
import App from './routes/App';
//styles
import './index.css';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

