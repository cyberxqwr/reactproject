import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { ApolloProvider } from '@apollo/client';
import App from './App.jsx'
import client from '../ApolloClient.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)