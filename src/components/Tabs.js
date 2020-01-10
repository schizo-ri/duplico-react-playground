import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
// import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group'
import '../styles/Transitions.css'
// import { Button } from './Button'

// necemo tabove vec samo stepove. ustvari ovo moze biti skup tab kompnenti
// cini se da se i stepovi prikazuju i skrivaju css-om
const Stepper = ({ children, initalStep = 0, onSubmit, pageBlockers, preventSkip }) => {
  const [idx, setIdx] = useState(initalStep)
  const [ids, setIds] = useState([])
  // const [allowNext, setAllowNext] = useState(!preventSkip)

  useEffect(() => {
    const ids = children.reduce((agg, c) => {
      if (c.id) {
        return [...agg, c.id]
      }
      return [...agg, shortid.generate()]
    }, [])
    setIds(ids)
  }, [children])

  const handleTabSwitch = page => {
    const blocker = pageBlockers && pageBlockers[idx]
    if (blocker && blocker.call(null)) {
      return
    }
    setIdx(page)
  }

  return (
    Boolean(ids.length) && (
      <>
        <div className="steppers" role="tablist">
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
        </div>
        <form className="tabpanel-container" onSubmit={onSubmit}>
          {children.map((child, childIdx) => (
            <div
              id={`${ids[childIdx]}-panel`}
              key={`${ids[childIdx]}-panel`}
              tabIndex="0"
              role="tabpanel"
              aria-labelledby={`${ids[childIdx]}-tab`}
              className={['tabpanel', 'fade-in', childIdx !== idx ? 'd-none' : ''].join(' ')}
              // className="tabpanel"
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
            {onSubmit && idx + 1 === children.length && <button className="btn">Submit</button>}
          </div>
        </form>
      </>
    )
  )
}

export default Stepper
