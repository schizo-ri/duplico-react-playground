import React, { useState, useRef } from 'react'
import { Button } from '../components/Button'
import Stepper from '../components/Tabs'
import { AnchorsNav } from '../components/AnchorsNav'
import '../styles/Form.css'

const Navigations = () => {
  const username = useRef(null)
  const missingUsername = () => {
    if (!username.current.value) {
      username.current.classList.add('invalid')
      username.current.focus()
      return true
    }
  }

  return (
    <div style={{ padding: '0 1rem' }}>
      <h1>Navigations</h1>
      <section>
        <h2>Main menu</h2>
        <p>
          Example above. Menu should expand when all of the items can fit to screen. It's quite lacking for now as the
          collapse point is just an estimate.
        </p>
      </section>
      <section>
        <h2>Tabs</h2>
        <p>No standard component for now. It's fairly easy to implement.</p>
        <Tabs />
        <hr className="hr1" />
        <h2>Stepper</h2>
        <Stepper preventSkip={false} onSubmit={console.log} pageBlockers={[missingUsername]}>
          <div label="signin">
            Page 1
            <input
              className="input"
              ref={username}
              type="text"
              name="username"
              onChange={() => username.current.classList.remove('invalid')}
              placeholder="Can not be empty!"
            />
          </div>
          <p label="organization">Page 2</p>
          <p label="contact">Page 3</p>
          <p>Page 4</p>
        </Stepper>
        <hr className="hr1" />
        <h2>Anchors</h2>
        <AnchorsNav>
          <h1 id="hea1">heading 1</h1>
          <h2 id="hea2">heading 2</h2>
        </AnchorsNav>
      </section>
    </div>
  )
}

const Tabs = props => {
  const [idx, setIdx] = useState(1)

  const handleTabSwitch = e => {
    const idx = e.target.dataset.idx
    setIdx(Number(idx))
  }

  return (
    <>
      <div className="tab-links">
        <Button addClass={[idx === 1 ? 'active' : '', 'tab-btn'].join(' ')} data-idx="1" onClick={handleTabSwitch}>
          Red
        </Button>
        <Button addClass={[idx === 2 ? 'active' : '', 'tab-btn'].join(' ')} data-idx="2" onClick={handleTabSwitch}>
          Green
        </Button>
        <Button addClass={[idx === 3 ? 'active' : '', 'tab-btn'].join(' ')} data-idx="3" onClick={handleTabSwitch}>
          Blue
        </Button>
      </div>
      {/* instead of using classes we can conditionally render components */}
      <div className="bdt-gray">
        <div className={idx !== 1 ? 'd-none' : ''}>
          <span className="c-red">Red</span>
        </div>
        <div className={idx !== 2 ? 'd-none' : ''}>
          <span className="c-green">Green</span>
        </div>
        <div className={idx !== 3 ? 'd-none' : ''}>
          <span className="c-blue">Blue</span>
        </div>
      </div>
    </>
  )
}
export default Navigations
