import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import initialization from 'utils/initialization';
import reportWebVitals from 'reportWebVitals';
import App from 'App';
import ErrorBoundary from 'features/Error/ErrorBoundary';
import './assets/themes/index.scss';

initialization();
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
