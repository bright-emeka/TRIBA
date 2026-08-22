import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './app/providers'
import { router } from './app/router'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)

function App() {
  return <AppRouter />
}

function AppRouter() {
  const { RouterProvider } = require('react-router-dom')
  return <RouterProvider router={router} />
}
