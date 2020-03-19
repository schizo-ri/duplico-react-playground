import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import './styles/functions.css'
import './styles/Typography.css'
import {
  ContextMenu,
  ContextMenuContextProvider,
} from './components/ContextMenu'
import { Offscreen, OffscreenContextProvider } from './components/Offscreen'
import App from './components/App'

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
