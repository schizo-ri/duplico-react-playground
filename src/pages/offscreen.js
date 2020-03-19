import React, { useContext } from 'react'
// import { DialogContext } from '../components/Dialog'
// import { AlertContext } from '../components/Alert'
import { Alert, Dialog, Aside, OffscreenContext } from '../components/Offscreen'
import { Button } from '../components/Button'
// import { delay } from '../utils'
import RegistrationForm from '../components/EgRegister'

const OffscreenPage = () => {
  const Offscreen = useContext(OffscreenContext)

  return (
    <div className="p-3">
      <h1>Dialogs and Alerts</h1>
      <p>Context Menu and maybe more will be added later</p>
      <h2>Dialogs</h2>
      <Button
        addClass="brand"
        onClick={e =>
          Offscreen.dispatch({
            type: 'show',
            payload: (
              <Dialog id="nuevo-dialogo-1" backdropClose={true}>
                <RegistrationForm />
              </Dialog>
            ),
          })
        }
      >
        Registration
      </Button>
      <h2>Alerts</h2>
      <Button
        addClass="info mr-3"
        onClick={e =>
          Offscreen.dispatch({
            type: 'show',
            payload: (
              <Alert id="info-alert" type="info">
                Info alert. Action completed, no warnings, just notify.
              </Alert>
            ),
          })
        }
      >
        Info
      </Button>
      <Button
        addClass="warning mr-3"
        onClick={e =>
          Offscreen.dispatch({
            type: 'show',
            payload: (
              <Alert id="warning-alert" type="warning">
                Warning alert. Action done but with some warnings.
              </Alert>
            ),
          })
        }
      >
        Warning
      </Button>
      <Button
        addClass="success mr-3"
        onClick={e =>
          Offscreen.dispatch({
            type: 'show',
            payload: (
              <Alert id="success-alert" type="success">
                Success alert. Action completed successfully. This one could've
                failed so yay!.
              </Alert>
            ),
          })
        }
      >
        Success
      </Button>
      <Button
        addClass="error mr-3"
        onClick={e =>
          Offscreen.dispatch({
            type: 'show',
            payload: (
              <Alert id="error-alert" type="error">
                Error alert. Oops, something didn't go right. Investigate and
                make further actions.
              </Alert>
            ),
          })
        }
      >
        Error
      </Button>
      <h2>Aside</h2>
      <Button
        addClass="mr-3"
        onClick={e =>
          Offscreen.dispatch({
            type: 'show',
            payload: (
              <Aside id="left-side" backdrop={true}>
                <BigComponent />
              </Aside>
            ),
          })
        }
      >
        Left
      </Button>
      <Button
        addClass="info mr-3"
        onClick={e =>
          Offscreen.dispatch({
            type: 'show',
            payload: (
              <Aside id="right-side" position="right" backdrop={true}>
                <BigComponent />
              </Aside>
            ),
          })
        }
      >
        Right
      </Button>
    </div>
  )
}

// const Alerts = () => {
//   const Alert = useContext(AlertContext)

//   const handleAlert = e => {
//     Alert.dispatch({
//       type: 'show',
//       payload: {
//         msg: `This is the ${e.target.dataset.type} alert`,
//         type: e.target.dataset.type,
//       },
//     })
//   }

//   const handleBigAlert = e => {
//     Alert.dispatch({
//       type: 'show',
//       payload: { msg: <BigComponent />, type: e.target.dataset.type },
//     })
//   }

//   return (
//     <div className="p-3">
//       <h1>Alert</h1>
//       <p>
//         At this time only one alert can be visible. Next alert will replace
//         previous.
//       </p>
//       <Button onClick={handleAlert}>Default!</Button>
//       <Button addClass="ml-2 success" data-type="success" onClick={handleAlert}>
//         Success!
//       </Button>
//       <Button addClass="ml-2 warning" data-type="warning" onClick={handleAlert}>
//         Warning!
//       </Button>
//       <Button addClass="ml-2 danger" data-type="error" onClick={handleAlert}>
//         Error!
//       </Button>
//       <Button addClass="ml-2 info" data-type="info" onClick={handleAlert}>
//         Info!
//       </Button>
//       <h3 className="mt-3">Any payload</h3>
//       <p>
//         Components inside alerts are also supported. I should tweak CSS for it.
//       </p>
//       <Button addClass="info" data-type="info" onClick={handleBigAlert}>
//         Long!
//       </Button>
//     </div>
//   )
// }

function BigComponent() {
  return (
    <div>
      <h2>Paragraph</h2>
      <p>
        This is a pragraph with standard lorem ipsum fill. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

// const AlertNovi = () => {
//   const AC = useContext(OffscreenContext)

//   return (
//     <div>
//       <Button
//         addClass="warning"
//         onClick={e =>
//           AC.dispatch({
//             type: 'show',
//             payload: (
//               <AlertO id="first-alert" type="warning">
//                 This is a new alert which probably doesn't work This is a new
//                 alert which probably doesn't work This is a new alert which
//                 probably doesn't work This is a new alert which probably doesn't
//                 work This is a new alert which probably doesn't work This is a
//                 new alert which probably doesn't work This is a new alert which
//                 probably doesn't work This is a new alert which probably doesn't
//                 work
//               </AlertO>
//             ),
//           })
//         }
//       >
//         First!
//       </Button>
//       <Button
//         addClass="error"
//         onClick={e =>
//           AC.dispatch({
//             type: 'show',
//             payload: (
//               <AlertO id="second-alert" type="error">
//                 This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br /> This is a new alert which probably doesn't work
//                 <br />
//               </AlertO>
//             ),
//           })
//         }
//       >
//         Another!
//       </Button>
//     </div>
//   )
// }

// const Offscreen = () => (
//   <>
//     <Dialogs />
//     <Alerts />
//     <AlertNovi />
//   </>
// )

export default OffscreenPage
