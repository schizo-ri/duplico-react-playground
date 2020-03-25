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
          <h1 id="h1ead1-1">h1ead1-1</h1>
          <p>missing intersection observer to mark active</p>
          <h1 id="h1ead2-1">h1ead2-1</h1>
          <p>restrictions that apply:</p>
          <h2 id="h2ead2-2">h2ead2-2</h2>
          <p>it will only analyze first child</p>
          <h3 id="h3ead2-3">h3ead2-3</h3>
          <p>this can be changed in the future so that user can provide child level to check for</p>
          <h1 id="h1ead3-1">h1ead3-1</h1>
          <p>how it works?</p>
          <h2 id="h2ead3-2">h2ead3-2</h2>
          <p>you wrap your content inside a component</p>
          <h2 id="h2ead3-3">h2ead3-3</h2>
          <p>component will look for headings, create nav element with anchors to those headings</p>
          <h2 id="h2ead3-4">h2ead3-4</h2>
          <p>headings will be indented according to it's tag so it will appear tree-like</p>
          <h3 id="h3ead3-5">h3ead3-5</h3>
          <p>this nav will appear left or right. left is default</p>
          <h4 id="h4ead3-6">h4ead3-6</h4>
          <p>it will be described further when finished</p>
          <h3 id="h3ead3-7">h3ead3-7</h3>
          <h2 id="h2ead3-8">h2ead3-8</h2>
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
