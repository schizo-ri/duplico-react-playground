import React, { useContext, useEffect, useReducer } from 'react'
import { createPortal } from 'react-dom'

const ContextMenuContext = React.createContext()

const initialState = {
  target: null,
  className: '',
  style: {},
  content: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'show':
      return {
        ...state,
        target: action.payload.target,
        content: action.payload.content,
        ...calculatePosition(action.payload.target, action.payload.countChildren),
      }
    case 'hide':
      return { ...state, target: null }
    default:
      break
  }
}

const calculatePosition = (target, countChildren = 1) => {
  // this children count and hardcoded 35px child size should be done better
  const yDirection = window.innerHeight - target.y < countChildren * 35 ? 'top' : 'bottom'
  const xDirection = target.x < window.innerWidth / 2 ? 'left' : 'right'

  const y = yDirection === 'bottom' ? target.y : window.innerHeight - target.y
  const x = xDirection === 'right' ? window.innerWidth - target.x : target.x

  return {
    style: {
      [yDirection === 'bottom' ? 'top' : 'bottom']: y,
      [xDirection]: x,
    },
    className: [yDirection, xDirection].join('-'),
  }
}

function ContextMenuContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return <ContextMenuContext.Provider value={value}>{props.children}</ContextMenuContext.Provider>
}

const ContextMenu = () => {
  const { state, dispatch } = useContext(ContextMenuContext)

  function handleBackdropClose(e) {
    dispatch({ type: 'hide' })
  }

  const listClass = [state.className, 'context-menu pop-in'].join(' ')

  return (
    state.target &&
    createPortal(
      <div className="backdrop" onClick={handleBackdropClose}>
        <div className={listClass} x-placement={state.className} style={state.style}>
          {state.content}
        </div>
      </div>,
      document.getElementById('contextmenu-root')
    )
  )
}

export { ContextMenu, ContextMenuContext, ContextMenuContextProvider }
