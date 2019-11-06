import React, { useContext, useReducer } from 'react'
import { createPortal } from 'react-dom'
import '../styles/Alert.css'

const AlertContext = React.createContext()

const initialState = {
  show: false,
  css: 'drop-short',
  timer: null,
  content: {
    title: '',
    msg: '',
    type: '',
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'css':
      return { ...state, css: 'pull-short' }
    case 'show':
      return { ...state, show: false, css: 'drop-short' }
    case 'timer':
      return { ...state, timer: action.payload }
    case 'content':
      return { ...state, content: action.payload }
    case 'set':
      return {
        ...state,
        content: action.payload,
        show: true,
      }
    default:
      break
  }
}

function AlertContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <AlertContext.Provider value={value}>
      {props.children}
    </AlertContext.Provider>
  )
}

const AlertContextConsumer = AlertContext.Consumer

const AlertBox = () => {
  const { state, dispatch } = useContext(AlertContext)

  const removeAlert = () => {
    dispatch({ type: 'css' })
    setTimeout(() => dispatch({ type: 'show' }), 500)
  }

  const colors = {
    error: 'alert-error',
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
  }

  return (
    state.show &&
    createPortal(
      <div
        className={`alert ${state.css} ${colors[state.content.type]}`}
        role="alert"
        onClick={removeAlert}
      >
        <div className="alert-msg">
          <span>
            {state.content.title}{' '}
          </span>
          {state.content.msg}
        </div>
        <span className="alert-close-msg">click to close</span>
      </div>,
      document.getElementById('alert-root')
    )
  )
}

export { AlertBox, AlertContext, AlertContextProvider, AlertContextConsumer }