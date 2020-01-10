import React from 'react'
import '../styles/Form.css'

const ToggleTokens = ({ type, name, children, ...props }) => {
  return (
    <div {...props}>
      {children.map(c => (
        <ToggleToken key={c[0]} id={c[0]} name={name} type={type}>
          {c[1]}
        </ToggleToken>
      ))}
    </div>
  )
}

const ToggleToken = props => (
  <div className={['input-tt', props.className].join(' ')}>
    <input id={props.id} type={props.type || 'checkbox'} name={`${props.name || props.id}`} />
    <label htmlFor={`${props.id}`}>{props.children}</label>
  </div>
)
// spread props?
const Input = ({ label, note, children, ref, wrapClass, inputClass, labelClass, noteClass, ...inputProps }) => {
  // const { label, note, children, ref, wrapClass, inputClass, labelClass, ...inputProps } = { ...props }
  return (
    <div className={`input-wrap ${wrapClass || ''}`}>
      {note && <span className={`input-note ${noteClass || ''}`}>{note}</span>}
      <input className={`input ${inputClass || ''}`} type="text" {...inputProps} />
      <label htmlFor={inputProps.name || inputProps.id} className={`input-label ${labelClass || ''}`}>
        {label}
      </label>
    </div>
  )
}
const Select = props => {
  const { label, note, children, ...inputProps } = { ...props }
  return (
    <div className="input-wrap">
      {note && <span className="input-note">{note}</span>}
      <select className="input" {...inputProps}>
        {children}
      </select>
      <label htmlFor={inputProps.name || inputProps.id} className="input-label">
        {label}
      </label>
    </div>
  )
}

export { ToggleToken, ToggleTokens, Input, Select }
