import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import './styles/functions.css'
// import { AlertBox, AlertContextProvider } from './components/Alert'
// import { Dialog, DialogContextProvider } from './components/Dialog'
import {
  ContextMenu,
  ContextMenuContextProvider,
} from './components/ContextMenu'
import { Offscreen, OffscreenContextProvider } from './components/Offscreen'
import App from './components/App'

ReactDOM.render(
  <OffscreenContextProvider>
    {/* <AlertContextProvider> */}
    {/* <DialogContextProvider> */}
    <ContextMenuContextProvider>
      {/* <AlertBox /> */}
      {/* <Dialog /> */}
      <ContextMenu />
      <Offscreen />
      <App />
    </ContextMenuContextProvider>
    {/* </DialogContextProvider> */}
    {/* </AlertContextProvider> */}
  </OffscreenContextProvider>,
  document.getElementById('root')
)
