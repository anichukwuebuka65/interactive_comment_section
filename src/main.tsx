import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserContext from './components/context/UserContext'
import ModalContextProvider from './components/context/ModalContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContext>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </UserContext>
  </React.StrictMode>,
)
