import React from 'react'
import ReactDOM from 'react-dom'
import {
  ContextMenu,
  ContextMenuContextProvider,
} from './components/ContextMenu'
import { Offscreen, OffscreenContextProvider } from './components/Offscreen'
import App from './components/App'
import './styles/index.css'
import './styles/Typography.css'

ReactDOM.render(
  <OffscreenContextProvider>
    <ContextMenuContextProvider>
      <ContextMenu />
      <Offscreen />
      <App />
    </ContextMenuContextProvider>
  </OffscreenContextProvider>,
  document.getElementById('root')
)
