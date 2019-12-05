import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import NotFound from './NotFound'
// pages
const Home = lazy(() => import('../pages/home'))
const Typography = lazy(() => import('../pages/typography'))
const Buttons = lazy(() => import('../pages/buttons'))
const Forms = lazy(() => import('../pages/forms'))
const Navigations = lazy(() => import('../pages/navigations'))
const Offscreen = lazy(() => import('../pages/offscreen'))
const Tables = lazy(() => import('../pages/tables'))

const App = () => {
  return (
    <Router>
      <Authenticated />
    </Router>
  )
}

const Authenticated = () => {
  return (
    <>
      <Navigation />
      <main className="main">
        <Suspense fallback={<p>...loading</p>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/typography" component={Typography} />
            <Route exact path="/buttons" component={Buttons} />
            <Route exact path="/forms" component={Forms} />
            <Route exact path="/navigations" component={Navigations} />
            <Route exact path="/offscreen" component={Offscreen} />
            <Route exact path="/tables" component={Tables} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Suspense>
      </main>
    </>
  )
}

export default App
