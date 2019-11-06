import React, { useEffect, useContext, useReducer } from 'react'
import { createPortal } from 'react-dom'
import '../styles/Dialog.css'

const DialogContext = React.createContext()

const initialState = {
  show: false,
  dialogCss: 'fade-in',
  bodyCss: 'drop-from-above',
  content: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'css':
      return { ...state, dialogCss: 'fade-out', bodyCss: 'pull-above' }
    case 'close':
      // kad zatvorimo postavljamo css za sljedece pojavljivanje
      document.getElementById('body').classList.remove('dialog-open')
      return {
        ...state,
        show: false,
        dialogCss: initialState.dialogCss,
        bodyCss: initialState.bodyCss,
        content: null
      }
    case 'show':
      document.getElementById('body').classList.add('dialog-open')
      return {
        ...state,
        content: action.payload || state.content,
        show: true
      }
    case 'content':
      return { ...state, content: action.payload }
    default:
      break
  }
}

function DialogContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <DialogContext.Provider value={value}>
      {props.children}
    </DialogContext.Provider>
  )
}

const Dialog = () => {
  const { state, dispatch } = useContext(DialogContext)

  useEffect(
    function backdropClose(e) {
      const handleClose = () => {
        dispatch({ type: 'css' })
        return setTimeout(() => dispatch({ type: 'close' }), 300)
      }

      function handleBackdropClose(e) {
        if (!e.target.classList.contains('dialog')) {
          return
        }
        handleClose(e)
      }
      document.addEventListener('mouseup', handleBackdropClose, {
        passive: true,
        capture: false
      })
      return () =>
        document.removeEventListener('mouseup', handleBackdropClose, {
          passive: true,
          capture: false
        })
    },
    [dispatch]
  )

  return (
    state.show &&
    createPortal(
      <div className={`dialog ${state.dialogCss}`}>
        <article className={`dialog-body card ${state.bodyCss}`}>
          {state.content}
        </article>
      </div>,
      document.getElementById('dialog-root')
    )
  )
}

export { Dialog, DialogContext, DialogContextProvider }
