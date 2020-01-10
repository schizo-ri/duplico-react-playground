import React, { useContext, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { delay } from '../utils'
import '../styles/Dialog.css'

const DialogContext = React.createContext()

const initialState = {
  show: false,
  dialogCss: 'fade-in',
  bodyCss: 'drop-from-above',
  content: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'css':
      return { ...state, dialogCss: 'fade-out', bodyCss: 'pull-above' }
    case 'close':
      // kad zatvorimo postavljamo css za sljedece pojavljivanje
      document.getElementById('root').classList.remove('dialog-open')
      return {
        ...state,
        show: false,
        dialogCss: initialState.dialogCss,
        bodyCss: initialState.bodyCss,
        content: null,
      }
    case 'show':
      document.getElementById('root').classList.add('dialog-open')
      return {
        ...state,
        content: action.payload || state.content,
        show: true,
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

  return <DialogContext.Provider value={value}>{props.children}</DialogContext.Provider>
}

const Dialog = () => {
  const { state, dispatch } = useContext(DialogContext)

  const handleClose = async e => {
    if (!e.target.classList.contains('dialog')) {
      return
    }
    dispatch({ type: 'css' })
    await delay(300)
    dispatch({ type: 'close' })
  }

  return (
    state.show &&
    createPortal(
      <div className={`dialog ${state.dialogCss}`} onClick={handleClose}>
        {/* <div className="dialog-close">
          <button type="button" className="btn-empty danger double p-2" onClick={handleClose}>
            {String.fromCharCode(10007)}
          </button>
        </div> */}
        <article className={`dialog-body ${state.bodyCss}`}>{state.content}</article>
      </div>,
      document.getElementById('dialog-root')
    )
  )
}

const closeDialog = async Dialog => {
  Dialog.dispatch({ type: 'css' })
  await delay(300)
  Dialog.dispatch({ type: 'close' })
}

export { Dialog, closeDialog, DialogContext, DialogContextProvider }
