import React, { useReducer } from 'react'
import { Input } from '../components/Form'
import Stepper from '../components/Tabs'

const initialState = {
  blocked: {
    name: true,
    email: true,
    password: true,
    nin: true,
  },
  invalid: {},
  value: {},
  msg: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'value':
      return { ...state, value: action.payload }
    case 'blocked':
      return { ...state, blocked: { ...state.blocked, ...action.payload } }
    case 'invalid':
      return { ...state, invalid: { ...state.invalid, ...action.payload } }
    case 'alert':
      return { ...state, msg: action.payload }
    default:
      break
  }
}

function RegistrationForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (name, value) => {
    dispatch({ type: 'value', payload: { ...state.value, [name]: value } })
  }

  const pageBlocker = keys => () => {
    const blocked = keys.map(k => state.blocked[k]).some(v => v === true)
    if (blocked) {
      return true
    }
    return false
  }

  return (
    <div className="p-3">
      <Stepper preventSkip={false} onSubmit={console.log} pageBlockers={[pageBlocker(['name', 'email', 'password'])]}>
        <section label="user">
          <Input
            id="user.name"
            type="text"
            label="Your name"
            placeholder="first(s) last(s) and middle(s)"
            required={true}
            onChange={e => handleChange('name', e.target.value)}
            // onBlur={e => checkName(e.target.value)}
            // wrapClass={state.invalid.name}
          />
          <Input id="user.phone" type="text" label="Your phone" placeholder="if you want to" />
          <Input
            id="user.email"
            type="email"
            label="Your email"
            placeholder="this will also be used to login"
            required={true}
            // onChange={e => clearInvalid('email')}
            // onBlur={e => checkEmail(e.target.value)}
            // wrapClass={state.invalid.email}
          />
          <Input
            id="user.password"
            type="password"
            label="Your strong password"
            placeholder="long and firm"
            required={true}
            // onChange={e => clearInvalid('password')}
            // onBlur={e => checkPassword(e.target.value)}
            // wrapClass={state.invalid.password}
            note="12+ signs! No need for uppercase, numbers and such but ok to use. The longer the better, but also something rememberable, like a phrase. Spaces are ok too, so it can be a sentance for example."
          />
        </section>
        <section label="organization">
          <Input
            id="company.name"
            type="text"
            label="Company name"
            placeholder="your company/organization name"
            required={true}
            note="If you're not part of company or organization you can put your own name or some made up one, like Trotters Independent Traders"
          />
          <Input
            id="company.nin"
            type="text"
            label="Company NIN"
            placeholder="national identifier number"
            required={true}
            note="If you're not part of any company/organization with one than put your own here as this is a mandatory field."
          />
          <Input id="company.address" type="text" label="Company address" placeholder="if you want to" />
          <Input
            id="company.country"
            type="text"
            label="Company country"
            placeholder="pick the right one"
            list="country-list"
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
        </section>
        <section label="contact">
          <Input
            id="company.contact.name"
            type="text"
            label="Contact's name"
            placeholder="person to contact when needed"
          />
          <Input id="company.contact.email" type="email" label="Contact's email" placeholder="use valid email" />
          <Input id="company.contact.phone" type="text" label="Contact's phone" placeholder="if needed" />
        </section>
      </Stepper>
    </div>
  )
}

export default RegistrationForm

// const clearInvalid = key => e => {
//   // dispatch({ type: 'value', payload: { [key]: e.target.value } })
//   // dispatch({ type: 'invalid', payload: { [key]: '' } })
// }

// const checkName = name => {
//   // if (name !== '') {
//   //   dispatch({ type: 'invalid', payload: { name: 'valid' } })
//   //   dispatch({ type: 'blocked', payload: { name: false } })
//   //   return
//   // }
//   // dispatch({ type: 'invalid', payload: { name: 'invalid' } })
//   // dispatch({ type: 'blocked', payload: { name: true } })
// }
// const checkEmail = email => {
//   // if (email !== '') {
//   //   dispatch({ type: 'invalid', payload: { email: 'valid' } })
//   //   dispatch({ type: 'blocked', payload: { email: false } })
//   //   return
//   // }
//   // dispatch({ type: 'invalid', payload: { email: 'invalid' } })
//   // dispatch({ type: 'blocked', payload: { email: true } })
// }
// const checkPassword = password => {
//   // if (password !== '') {
//   //   dispatch({ type: 'invalid', payload: { password: 'valid' } })
//   //   dispatch({ type: 'blocked', payload: { password: false } })
//   //   return
//   // }
//   // dispatch({ type: 'invalid', payload: { password: 'invalid' } })
//   // dispatch({ type: 'blocked', payload: { password: true } })
// }
