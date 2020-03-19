import React, {
  useContext,
  useReducer,
  useState,
  useEffect,
  // useLayoutEffect,
} from 'react'
import { createPortal } from 'react-dom'
import '../styles/Offscreen.css'
import shortid from 'shortid'
import { _arrdel } from '../utils'
import { Transition } from 'react-transition-group'

const initialState = {
  ids: [],
  components: [],
}

// document.getElementById('root').classList.remove('overflow-hidden')
const reducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return {
        ...state,
        ids: state.ids.filter(id => action.payload !== id),
        // components: _arrdel(state.components, idx),
      }
    case 'unmount':
      const idx = state.components.reduce((result, component, index) => {
        if (action.payload === component.props.id) {
          return index
        }
        return result
      }, -1)
      if (idx === -1) {
        return state
      }
      return {
        ...state,
        components: _arrdel(state.components, idx),
      }
    case 'show':
      try {
        if (
          action.payload.props.id &&
          state.components.filter(
            component => component.props.id === action.payload.props.id
          ).length > 0
        ) {
          throw new Error('Component with the same Id already shown.')
        }
      } catch (error) {
        console.log(error)
        return state
      }
      const id = action.payload.props.id || shortid.generate()
      return {
        ...state,
        ids: [...state.ids, id],
        components: [...state.components, action.payload],
      }
    default:
      break
  }
}

const OffscreenContext = React.createContext()

function OffscreenContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <OffscreenContext.Provider value={value}>
      {props.children}
    </OffscreenContext.Provider>
  )
}

const alertAnimationDuration = 300
const alertStyle = {
  alert: {
    width: '100%',
    position: 'relative',
    boxShadow: 'var(--box-shadow-lg)',
    transform: 'translateY(-10vh)',
    opacity: 0,
    transition: `all ${alertAnimationDuration}ms ease-in-out`,
  },
  info: {
    color: 'var(--cold-fixed-white)',
    // background: 'linear-gradient(to bottom, var(--cyan3) 0%, var(--cyan) 100%)',
    backgroundColor: 'var(--cyan3)',
  },
  warning: {
    color: 'var(--warm-fixed-white)',
    // background: 'linear-gradient(to bottom, var(--yellow3) 0%, var(--yellow) 100%)',
    backgroundColor: 'var(--yellow3)',
  },
  error: {
    color: 'var(--warm-fixed-white)',
    // background: 'linear-gradient(to bottom, var(--red) 0%, var(--red3) 100%)',
    backgroundColor: 'var(--red3)',
  },
  success: {
    color: 'var(--cold-fixed-white)',
    // background: 'linear-gradient(to bottom, var(--teal3) 0%, var(--teal) 100%)',
    backgroundColor: 'var(--teal3)',
  },
  msg: {
    padding: '1rem',
    minWidth: '0',
  },
  close: {
    fontSize: '0.75rem',
    fontStyle: 'oblique',
    position: 'absolute',
    bottom: '0.25rem',
    right: '0.5rem',
    cursor: 'pointer',
  },
}
// translate bi volio da je prema nekoj stvarnijoj velicini
const alertStyleTransitions = {
  entering: {},
  entered: { transform: 'translateY(0)', opacity: 1 },
  exiting: { transform: 'translateY(-100vh)', opacity: 0 },
  exited: {},
}
const Alert = props => {
  const { state, dispatch } = useContext(OffscreenContext)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch({ type: 'close', payload: props.id })
    }, props.timeout || 5000)
    setTimer(timerId)
    return () => {
      clearTimeout(timerId)
      setTimer(timerId)
    }
  }, [props, dispatch])

  const handleMouseEnter = e => {
    clearTimeout(timer)
    setTimer(null)
  }

  const handleMouseLeave = () => {
    const timerId = setTimeout(() => {
      dispatch({ type: 'close', payload: props.id })
    }, props.timeout || 5000)
    setTimer(timerId)
    return () => {
      clearTimeout(timerId)
      setTimer(timerId)
    }
  }

  return (
    <Transition
      in={state.ids.includes(props.id)}
      timeout={{
        enter: 0,
        exit: alertAnimationDuration,
      }}
      appear={true}
      onExited={() => dispatch({ type: 'unmount', payload: props.id })}
    >
      {state => (
        <div
          style={{
            ...alertStyle.alert,
            ...alertStyle[props.type],
            ...alertStyleTransitions[state],
          }}
          role="alert"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={alertStyle.msg}>{props.children}</div>
          <span
            style={alertStyle.close}
            onClick={() => dispatch({ type: 'close', payload: props.id })}
          >
            click to close
          </span>
        </div>
      )}
    </Transition>
  )
}
const dialogAnimationDuration = 300
const backdropStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  opacity: 0,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'baseline',
  backgroundColor: 'var(--backdrop-soft)',
  overflowY: 'auto',
  willChange: 'opacity',
  transition: `opacity ${dialogAnimationDuration}ms`,
}
const dialogStyle = {
  position: 'relative',
  paddingTop: '1rem',
  // display: 'flex',
  // flexDirection: 'column',
  pointerEvents: 'auto',
  backgroundClip: 'padding-box',
  backgroundColor: 'var(--white)',
  outline: 0,
  opacity: 1,
  transform: 'translateY(-50vh)',
  boxShadow: 'var(--box-shadow-lg)',
  // borderRadius: 'var(--radius)',
  // width: '100vw',
  willChange: 'transform, opacity',
  transition: `all ${dialogAnimationDuration}ms ease-in-out`,
}
const backdropStyleTransitions = {
  entering: {},
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: {},
}
const dialogStyleTransitions = {
  entering: {},
  entered: { transform: 'translateY(0)', opacity: 1 },
  exiting: { transform: 'translateY(-100vh)', opacity: 0 },
  exited: {},
}
// dispatch i glovbalni store da indiciramo da je dialog upaljen
// mozemo i tranzicije spremiti
const Dialog = ({ id, close = true, backdropClose = false, ...props }) => {
  const { state, dispatch } = useContext(OffscreenContext)

  const handleBackdropClose = e => {
    if (!backdropClose) {
      return
    }
    if (e.target.dataset?.target !== 'backdrop') {
      return
    }
    dispatch({ type: 'close', payload: id })
  }

  return (
    <Transition
      in={state.ids.includes(id)}
      timeout={{
        enter: 0,
        exit: dialogAnimationDuration,
      }}
      appear={true}
      onExited={() => dispatch({ type: 'unmount', payload: id })}
    >
      {state => (
        <div
          style={{
            ...backdropStyle,
            ...backdropStyleTransitions[state],
          }}
          role="dialog"
          data-target="backdrop"
          onClick={handleBackdropClose}
        >
          <div
            style={{
              ...dialogStyle,
              ...dialogStyleTransitions[state],
            }}
            className="dialog-body"
            role="document"
          >
            {props.children}
            {close && (
              <span
                style={{
                  ...alertStyle.close,
                  bottom: 'initial',
                  top: '0.25rem',
                  color: 'var(--red)',
                }}
                onClick={() => dispatch({ type: 'close', payload: id })}
              >
                close
              </span>
            )}
          </div>
        </div>
      )}
    </Transition>
  )
}
const asideAnimationDuration = 300
const transparentBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'transparent',
}
const asideStyle = {
  default: {
    position: 'fixed',
    // top: 0,
    // bottom: 0,
    height: '100vh',
    width: '22rem',
    maxWidth: '22rem',
    // opacity: 0,
    backgroundColor: 'var(--black)',
    color: 'var(--white)',
    overflowY: 'auto',
    willChange: 'transform',
    transition: `transform ${dialogAnimationDuration}ms ease-in-out`,
  },
  left: {
    transform: 'translateX(-25rem)',
    boxShadow: 'var(--box-shadow-right)',
  },
  right: {
    transform: 'translateX(calc(100vw + 25rem))',
    boxShadow: 'var(--box-shadow-left)',
  },
}
const asideStyleTransitions = {
  left: {
    entering: {},
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(-100vw)' },
    exited: {},
  },
  right: {
    entering: {},
    entered: { transform: 'translateX(calc(100vw - 22rem))' },
    exiting: { transform: 'translateX(200vw)' },
    exited: {},
  },
}
const Aside = ({ id, backdrop = false, position = 'left', ...props }) => {
  const { state, dispatch } = useContext(OffscreenContext)

  const handleBackdropClose = e => {
    if (!backdrop) {
      return
    }
    if (e.target.dataset?.target !== 'backdrop') {
      return
    }
    dispatch({ type: 'close', payload: id })
  }

  return (
    <Transition
      in={state.ids.includes(id)}
      timeout={{
        enter: 0,
        exit: asideAnimationDuration,
      }}
      appear={true}
      onExited={() => dispatch({ type: 'unmount', payload: id })}
    >
      {state => (
        <div
          style={transparentBackdropStyle}
          data-target="backdrop"
          onClick={handleBackdropClose}
        >
          <aside
            style={{
              ...asideStyle.default,
              ...asideStyle[position],
              ...asideStyleTransitions[position][state],
            }}
          >
            {props.children}
            <span
              style={{
                ...alertStyle.close,
                bottom: 'initial',
                top: '0.25rem',
                color: 'var(--red)',
              }}
              onClick={() => dispatch({ type: 'close', payload: id })}
            >
              close
            </span>
          </aside>
        </div>
      )}
    </Transition>
  )
}

const Keykeeper = props => <>{props.children}</>

const Offscreen = () => {
  const { state } = useContext(OffscreenContext)

  return (
    // state.components.length > 0 &&
    createPortal(
      state.components.map(component => (
        <Keykeeper key={component.props.id}>{component}</Keykeeper>
      )),
      document.getElementById('offscreen-root')
    )
  )
}
// context menu
export {
  Alert,
  Dialog,
  Aside,
  Offscreen,
  OffscreenContext,
  OffscreenContextProvider,
}
