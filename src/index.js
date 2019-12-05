import React from 'react'
import ReactDOM from 'react-dom'
// import './styles/reset.css'
// import './styles/root.css'
import './styles/index.css'
import './styles/functions.css'
import { AlertBox, AlertContextProvider } from './components/Alert'
import { Dialog, DialogContextProvider } from './components/Dialog'
import { ContextMenu, ContextMenuContextProvider } from './components/ContextMenu'
import App from './components/App'

ReactDOM.render(
  <AlertContextProvider>
    <DialogContextProvider>
      <ContextMenuContextProvider>
        <AlertBox />
        <Dialog />
        <ContextMenu />
        <App />
      </ContextMenuContextProvider>
    </DialogContextProvider>
  </AlertContextProvider>,
  document.getElementById('root')
)
