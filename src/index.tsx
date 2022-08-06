import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/cairo/300.css';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/500.css';
import '@fontsource/cairo/700.css';
import UserProvider from './components/UserProvider';
import MessageProvider from './components/MessageProvider';
import LanguageProvider from './components/LanguageProvider';
import PageProvider from './components/PageProvider';

ReactDOM.render(
  <React.StrictMode> 
    <LanguageProvider>
      <MessageProvider>
        <UserProvider>
          <PageProvider>
            <App />
          </PageProvider>
        </UserProvider>
      </MessageProvider>
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
