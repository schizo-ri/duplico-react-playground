import React, { useReducer, useEffect } from 'react'
import api from '../config/socket'

const StoreContext = React.createContext()

const initialState = {
  fetching: true,
  // jwt: localStorage.getItem('feathers-jwt'),
  authenticated: false,
  user: null,
  company: null,
  currency: null,
  country: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return { ...state, fetching: action.payload || !state.fetching }
    case 'signout':
      return {
        ...state,
        authenticated: false,
        user: null,
        company: null,
        fetching: false
      }
    case 'profile':
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        company: action.payload.company
      }
    case 'authenticated':
      return { ...state, authenticated: true }
    case 'user':
      return { ...state, user: action.payload }
    case 'company':
      return { ...state, company: action.payload }
    case 'currency':
      return { ...state, currency: action.payload }
    case 'country':
      return { ...state, country: action.payload }
    default:
      break
  }
}

function StoreContextProvider(props) {
  const [store, dispatch] = useReducer(reducer, initialState)
  const value = { store, dispatch }

  useEffect(() => {
    api
      .service('users')
      .on('patched', user => dispatch({ type: 'user', payload: user }))
  }, [dispatch])

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  )
}

const StoreContextConsumer = StoreContext.Consumer

export { StoreContext, StoreContextProvider, StoreContextConsumer }
