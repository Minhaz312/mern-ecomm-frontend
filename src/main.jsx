import React from 'react';
import ReactDOM from 'react-dom/client';
import './admin.css';
import './global.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css"

import {CategoryPorvider} from "./contexts/CategoryPorvider"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoryPorvider>
      <App />
    </CategoryPorvider>
  </React.StrictMode>
);
