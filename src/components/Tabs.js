import React, { useState } from 'react'
import shortid from 'shortid'
// import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group'
import '../styles/Transitions.css'
// import { Button } from './Button'

// slider bi ustvari bio fora
const Stepper = ({ children, initalStep = 0, onSubmit, pageBlockers, preventSkip, vertical }) => {
  const [idx, setIdx] = useState(initalStep)
  const [ids, setIds] = useState(Array.from(Array(children.length), _ => shortid.generate()))
  const [preventAccidentalSubmit, setPreventAccidentalSubmit] = useState(true)

  const handleTabSwitch = page => {
    setPreventAccidentalSubmit(true)
    const blocker = pageBlockers && pageBlockers[idx]
    if (blocker && blocker.call(null, idx)) {
      return
    }
    if (onSubmit && page + 1 === children.length) {
      setTimeout(() => setPreventAccidentalSubmit(false), 3000)
    }
    setIdx(page)
  }

  const steppersDirection = vertical ? 'steppers steppers-vertical' : 'steppers'
  return (
    Boolean(ids.length) && (
      <div style={vertical ? { display: 'flex', flexDirection: 'columns' } : {}}>
        <nav className={steppersDirection} role="tablist">
          {ids.map((id, stepIdx) => (
            <button
              id={`${id}-tab`}
              key={`${id}-tab`}
              className={['step-btn', stepIdx === idx ? 'step-active' : ''].join(' ')}
              onClick={() => handleTabSwitch(stepIdx)}
              role="tab"
              aria-selected={stepIdx === idx}
              aria-controls={`${id}-panel`}
              disabled={preventSkip && stepIdx > idx ? true : false}
            >
              {children[stepIdx]['props']['label'] || stepIdx + 1}
            </button>
          ))}
        </nav>
        <form className="tabpanel-container" onSubmit={onSubmit}>
          {children.map((child, childIdx) => (
            <div
              id={`${ids[childIdx]}-panel`}
              key={`${ids[childIdx]}-panel`}
              tabIndex="0"
              role="tabpanel"
              aria-labelledby={`${ids[childIdx]}-tab`}
              className={['tabpanel', 'fade-in', childIdx !== idx ? 'd-none' : ''].join(' ')}
            >
              {child}
            </div>
            // back and next buttons
          ))}
          <div className="flex jcb">
            {idx > 0 && (
              <button type="button" className="btn-empty brand" onClick={() => handleTabSwitch(idx - 1)}>
                Previous
              </button>
            )}
            {idx + 1 < children.length && (
              <button type="button" className="btn-empty brand ml-auto" onClick={() => handleTabSwitch(idx + 1)}>
                Next
              </button>
            )}
            {onSubmit && idx + 1 === children.length && (
              <button type="submit" className="btn brand" disabled={preventAccidentalSubmit}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    )
  )
}

export default Stepper
