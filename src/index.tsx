import { store } from '@/store';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const defaultTheme = createTheme({
  typography: {
    fontFamily: ['Noto Serif', 'Courier New', 'Courier', 'monospace'].join(','),
  },
  palette: {
    // text: { primary: '#4e3925' },
    // divider: '#5a413e',
    // background: { default: '#F0E9E1', paper: '#F0E9E1' },
    primary: { main: '#6A4B47' },
    secondary: { main: '#47666a' },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
