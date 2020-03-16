# Offscreen

Offscreen component should provide easy way to show and hide offscreen components like dialogs, alerts or sidebars. It's meant for dynamic content like this since they will be unmounted upon closing. Long lived content like sidebar menus should take other route,

## Usage

### Container

This component is using React's createPortal as a position to mount to inside DOM. So for this to work edit your public html template like this:

```html
...
<div id="offscreen-root"></div>
<div id="root"></div>
...
```

### Context Provider

Next wrap your App component with Offscreen Context Provider. Ofcourse import all as needed.

```js
ReactDOM.render(
  <OffscreenContextProvider>
    <Offscreen />
    <App />
  </OffscreenContextProvider>
  document.getElementById('root')
)
```

### Showing content example

```js
import React, { useContext } from 'react'
import { Dialog, Alert, Aside, OffscreenContext } from '../components/Offscreen'

const Example = () => {
  const Offscreen = useContext(OffscreenContext)

  const handleClose = id => e =>
    Offscreen.dispatch({ type: 'close', payload: id })

  const showDialog = payload => e => {
    Offscreen.dispatch({ type: 'show', payload })
  }

  return (
    <div>
      <button
        onClick={showDialog(
          <Dialog id="example-dialog">
            <div>This is a dialog</div>
          </Dialog>
        )}
      >
        Show dialog
      </button>
      <button
        onClick={Offscreen.dispatch({
          type: 'show',
          payload: (
            <Alert type="warning">
              <p>Urgent alert message</p>
            </Alert>
          ),
        })}
      >
        Show alert
      </button>
      <button
        onClick={Offscreen.dispatch({
          type: 'show',
          payload: (
            <Aside id="aside-example" from="right">
              <h1>Aside</h1>
              <p>This can be some help or docs for example</p>
              <ul>
                <li>Item #1</li>
                <li>Item #2</li>
                <li>Item #3</li>
              </ul>
              <p>
                Provide your close button
              </p>
              <button class="btn" onClick={handleClose('aside-example')}>
                close
              </button>
            </Alert>
          ),
        })}
      >
        Show aside
      </button>
    </div>
  )
}
```
