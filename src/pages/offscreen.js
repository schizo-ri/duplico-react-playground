import React, { useContext } from 'react'
import { DialogContext } from '../components/Dialog'
import { AlertContext } from '../components/Alert'
import { Button } from '../components/Button'
import { delay } from '../utils'

const Dialogs = () => {
  const Dialog = useContext(DialogContext)

  // shouldn't this be in a component?
  const closeDialog = async () => {
    Dialog.dispatch({ type: 'css' })
    await delay(300)
    Dialog.dispatch({ type: 'close' })
  }

  const handleClose = e => closeDialog()

  const handleDialog = payload => e => {
    Dialog.dispatch({ type: 'show', payload })
  }

  return (
    <div className="p-3">
      <h1>Dialogs</h1>
      <p>At this time only one dialog can be visible.</p>
      <Button
        addClass="info"
        onClick={handleDialog(
          <div>
            <div className="p-3">
              <p>
                Replace or be replaced. But that is OK, there shouldn't be open more than one document. Also, dialog
                body is completaly unstyled so style content in your component.
              </p>
              <p>You can provide close handling function through component props.</p>
            </div>
            <div className="p-3">
              <Button onClick={handleClose}>Close</Button>
            </div>
          </div>
        )}
      >
        Open
      </Button>
      <h3 className="mt-3">Long content</h3>
      <Button onClick={handleDialog(<BigComponent />)}>Long</Button>
    </div>
  )
}

const Alerts = () => {
  const Alert = useContext(AlertContext)

  const handleAlert = e => {
    Alert.dispatch({
      type: 'show',
      payload: { msg: `This is the ${e.target.dataset.type} alert`, type: e.target.dataset.type },
    })
  }

  const handleBigAlert = e => {
    Alert.dispatch({
      type: 'show',
      payload: { msg: <BigComponent />, type: e.target.dataset.type },
    })
  }

  return (
    <div className="p-3">
      <h1>Alert</h1>
      <p>At this time only one alert can be visible. Next alert will replace previous.</p>
      <Button onClick={handleAlert}>Default!</Button>
      <Button addClass="ml-2 success" data-type="success" onClick={handleAlert}>
        Success!
      </Button>
      <Button addClass="ml-2 warning" data-type="warning" onClick={handleAlert}>
        Warning!
      </Button>
      <Button addClass="ml-2 danger" data-type="error" onClick={handleAlert}>
        Error!
      </Button>
      <Button addClass="ml-2 info" data-type="info" onClick={handleAlert}>
        Info!
      </Button>
      <h3 className="mt-3">Any payload</h3>
      <p>Components inside alerts are also supported. I should tweak CSS for it.</p>
      <Button addClass="info" data-type="info" onClick={handleBigAlert}>
        Long!
      </Button>
    </div>
  )
}

function BigComponent() {
  return (
    <div>
      <h2>Paragraph</h2>
      <p>
        This is a pragraph with standard lorem ipsum fill. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <h2>Lists</h2>
      <h3>Unordered list</h3>
      <ul>
        <li>Red</li>
        <li>Green</li>
        <li>Blue</li>
        <li>Alpha</li>
      </ul>
      <h3>Ordered list</h3>
      <ol>
        <li>Red</li>
        <li>Green</li>
        <li>Blue</li>
        <li>Alpha</li>
      </ol>
    </div>
  )
}

const Offscreen = () => (
  <>
    <Dialogs />
    <Alerts />
  </>
)

export default Offscreen
