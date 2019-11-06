import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import NotFound from './NotFound'
// pages
import Home from '../pages/home'
import Typography from '../pages/typography'
import Alerts from '../pages/alerts'
import Buttons from '../pages/buttons'
import Dialogs from '../pages/dialogs'
import Forms from '../pages/forms'
import Navigations from '../pages/navigations'

const App = () => {
  return (
    <Router>
      <Authenticated />
    </Router>
  )
}

const Authenticated = () => {
  return <>
    <Navigation />
    <main className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/typography" component={Typography} />
        <Route exact path="/alerts" component={Alerts} />
        <Route exact path="/buttons" component={Buttons} />
        <Route exact path="/dialogs" component={Dialogs} />
        <Route exact path="/forms" component={Forms} />
        <Route exact path="/navigations" component={Navigations} />
        <Route render={() => <NotFound />} />
      </Switch>
    </main>
  </>
}

export default App
