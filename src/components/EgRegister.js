import React, { useContext, useReducer } from 'react'
import { Input } from '../components/Form'
import Stepper from '../components/Tabs'

const initialState = {
  blocked: {
    name: true,
    email: true,
    password: true,
    'company.name': true,
    'company.nin': true,
    'company.country': true,
  },
  invalid: {},
  value: {},
  msg: {},
  reveal: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'value':
      return { ...state, value: { ...state.value, ...action.payload } }
    case 'blocked':
      const [key, value] = Object.entries(action.payload)[0]
      return {
        ...state,
        blocked: { ...state.blocked, [key]: Boolean(value) },
        invalid: { ...state.invalid, [key]: Boolean(value) ? 'invalid' : 'valid' },
        msg: { ...state.msg, [key]: value },
      }
    case 'reveal':
      return { ...state, reveal: !state.reveal }
    default:
      break
  }
}
const NICE_NAMES = {
  0: {
    name: 'your name',
  },
  1: {
    'company.name': "organization's name",
    'company.nin': "organization's national identifier number",
    'company.country': "organization's country",
  },
}
const RegisterContext = React.createContext(null)

function RegistrationForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const reevaluate = page => {
    const noMatchingMsg = Object.keys(NICE_NAMES[page]).filter(key => {
      if (state.blocked[key] === true && Boolean(state.msg[key]) === false) {
        return true
      }
      return false
    })
    if (noMatchingMsg.length === 0) {
      return
    }
    for (const k of noMatchingMsg) {
      dispatch({ type: 'blocked', payload: { [k]: `Please check that ${NICE_NAMES[page][k]} is filled ok.` } })
    }
  }
  const pageBlocker = keys => page => {
    const blocked = keys.map(k => state.blocked[k]).some(v => v === true)
    if (blocked) {
      reevaluate(page)
      return true
    }
    return false
  }

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      <div className="p-3">
        <Stepper
          preventSkip={false}
          onSubmit={e => {
            e.preventDefault()
            console.log(state.value)
          }}
          pageBlockers={[
            pageBlocker(['name', 'email', 'password']),
            pageBlocker(['company.name', 'company.nin', 'company.country']),
          ]}
          vertical={true}
        >
          <FormUsername />
          <FormOrganization />
          <FormOrganizationContact />
        </Stepper>
        {Object.entries(state.msg).length > 0 && (
          <div className="form-warnings ">
            {Object.values(state.msg).map(
              m =>
                m && (
                  <p key={btoa(m)} className="c-yellow">
                    {m}
                  </p>
                )
            )}
          </div>
        )}
      </div>
    </RegisterContext.Provider>
  )
}

function FormUsername() {
  const { state, dispatch } = useContext(RegisterContext)
  const handleChange = key => e => {
    dispatch({ type: 'value', payload: { [key]: e.target.value } })
  }
  const speculate = (key, value) => {
    if (!state.value[`company.contact.${key}`]) {
      dispatch({ type: 'value', payload: { [`company.contact.${key}`]: value } })
    }
  }
  const checkEmpty = key => e => {
    if (e.target.value !== '') {
      dispatch({ type: 'blocked', payload: { [key]: false } })
      if (['name', 'phone'].includes(key)) {
        speculate(key, e.target.value)
      }
      return
    }
    dispatch({ type: 'blocked', payload: { [key]: `Input with ${NICE_NAMES[0][key]} shouldn't be empty.` } })
  }
  const checkEmail = e => {
    if (
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        e.target.value
      )
    ) {
      dispatch({ type: 'blocked', payload: { email: false } })
      if (!state.value['company.contact.email']) {
        dispatch({ type: 'value', payload: { 'company.contact.email': e.target.value } })
      }
      return
    }
    dispatch({ type: 'blocked', payload: { email: 'Please use valid email' } })
  }
  const checkPassword = e => {
    if (e.target.value.length >= 12) {
      dispatch({ type: 'blocked', payload: { password: false } })
      return
    }
    dispatch({
      type: 'blocked',
      payload: {
        password: 'We want to ensure you use strong password. Please use 12 characters as minimum.',
      },
    })
  }

  return (
    <div>
      <Input
        id="user.name"
        type="text"
        label="Your name"
        placeholder="first(s) last(s) and middle(s)"
        required={true}
        onChange={handleChange('name')}
        onBlur={checkEmpty('name')}
        wrapClass={state.invalid.name}
      />
      <Input
        id="user.phone"
        type="text"
        label="Your phone"
        placeholder="if you want to"
        onChange={handleChange('name')}
      />
      <Input
        id="user.email"
        type="email"
        label="Your email"
        placeholder="this will also be used to login"
        required={true}
        onChange={handleChange('email')}
        onBlur={checkEmail}
        wrapClass={state.invalid.email}
      />
      <Input
        id="user.password"
        type={state.reveal ? 'text' : 'password'}
        label="Your strong password"
        placeholder="long and firm"
        required={true}
        onChange={handleChange('password')}
        onBlur={checkPassword}
        wrapClass={state.invalid.password}
        note={
          <>
            <button type="button" className="btn-text info" onClick={e => dispatch({ type: 'reveal' })}>
              Reveal
            </button>
            <span>
              &nbsp;password to make sure you wrote it right. Please use 12+ signs! No need for uppercase, numbers and
              such but ok to use. The longer the better, but also something rememberable, like a phrase. Spaces are ok
              too, so it can be a sentance for example.
            </span>
          </>
        }
      />
    </div>
  )
}

function FormOrganization() {
  const { dispatch } = useContext(RegisterContext)
  const handleChange = key => e => {
    dispatch({ type: 'value', payload: { [key]: e.target.value } })
  }
  const checkEmpty = key => e => {
    if (e.target.value !== '') {
      dispatch({ type: 'blocked', payload: { [key]: false } })
      return
    }
    dispatch({ type: 'blocked', payload: { [key]: `Input with ${NICE_NAMES[1][key]} shouldn't be empty.` } })
  }
  return (
    <div>
      <Input
        id="company.name"
        type="text"
        label="Company name"
        placeholder="your company/organization name"
        required={true}
        onChange={handleChange('company.name')}
        onBlur={checkEmpty('company.name')}
        note="If you're not part of company or organization you can put your own name or some made up one, like Trotters Independent Traders"
      />
      <Input
        id="company.nin"
        type="text"
        label="Company NIN"
        placeholder="national identifier number"
        required={true}
        onChange={handleChange('company.nin')}
        onBlur={checkEmpty('company.nin')}
        note="If you're not part of any company/organization with one than put your own here as this is a mandatory field."
      />
      <Input id="company.address" type="text" label="Company address" placeholder="if you want to" />
      <Input
        id="company.country"
        type="text"
        label="Company country"
        placeholder="pick the right one"
        list="country-list"
        required={true}
        onChange={handleChange('company.country')}
        onBlur={checkEmpty('company.country')}
      />
      <datalist id="country-list">
        <option value="Bosna i Hercegovina" />
        <option value="Deutschland" />
        <option value="Hrvatska" />
        <option value="Italia" />
        <option value="Magyarország" />
        <option value="Österreich" />
        <option value="Serbija" />
        <option value="Slovenija" />
      </datalist>
    </div>
  )
}

function FormOrganizationContact() {
  const { state, dispatch } = useContext(RegisterContext)
  const handleChange = key => e => {
    dispatch({ type: 'value', payload: { [key]: e.target.value } })
  }
  const checkEmail = e => {
    if (
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        e.target.value
      ) ||
      e.target.value === ''
    ) {
      dispatch({ type: 'blocked', payload: { 'company.contact.email': false } })
      return
    }
    dispatch({ type: 'blocked', payload: { 'company.contact.email': 'Please use valid email' } })
  }
  return (
    <div>
      <Input
        id="company.contact.name"
        type="text"
        label="Contact's name"
        defaultValue={state.value['company.contact.name']}
        onChange={handleChange('company.contact.name')}
        placeholder="person to contact when needed"
      />
      <Input
        id="company.contact.email"
        type="email"
        label="Contact's email"
        defaultValue={state.value['company.contact.email']}
        onChange={handleChange('company.contact.email')}
        onBlur={checkEmail}
        placeholder="use valid email"
      />
      <Input
        id="company.contact.phone"
        type="text"
        label="Contact's phone"
        onChange={handleChange('company.contact.phone')}
        placeholder="if needed"
      />
    </div>
  )
}

export default RegistrationForm
