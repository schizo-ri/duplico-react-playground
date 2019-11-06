import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from './Button'
import { ToggleToken } from './form'

import './reset.css'
import './functions.css'
import './styles.css'

function App() {
  return (
    <div className="App">
      <h1>Play with React</h1>
      <h2>Create some components with styles</h2>
      <p>Don't skip a11y</p>
      <ul>
        <li>Dropdown with any content</li>
        <ul>
          <li>Position aware</li>
          <li>Select</li>
          <li>Multiselect</li>
          <li>Items with description</li>
        </ul>
        <li>Dialogs</li>
      </ul>
      <section>
        <h3>These are components</h3>

        <section>
          <h4>Form</h4>
          <ToggleToken className="toggle-token">toggle</ToggleToken>
        </section>
        <section>
          <h4>Buttons</h4>
          <div className="mt-4">
            <Button className="btn brand" text="brand" />
            <Spacer />
            <Button className="btn cancel" text="cancel" />
            <Spacer />
            <Button className="btn danger" text="danger" />
            <Spacer />
            <Button className="btn brand" text="disabled" disabled />
          </div>
          <div className="mt-4">
            <Button className="btn-empty brand" text="brand" />
            <Spacer />
            <Button className="btn-empty" text="cancel" />
            <Spacer />
            <Button className="btn-empty danger" text="danger" />
            <Spacer />
            <Button className="btn-empty" text="disabled" disabled />
          </div>
        </section>
        <section className="mt-4">
          <h4>Card</h4>
          <div className="flex wrap">
            <article className="card">
              <header className="card-header">
                <h4>Demo Company Ltd.</h4>
              </header>
              <section className="card-section flex wrap">
                <dl className="dl mr-5">
                  <dt>Active</dt>
                  <dd>Yes</dd>
                  <dt>Elements</dt>
                  <dd>243</dd>
                  <dt>Users</dt>
                  <dd>4</dd>
                </dl>
                <div className="flex column">
                  <header className="dl-title">Licence</header>
                  <div className="flex">
                    <dl className="dl mr-5">
                      <dt>started</dt>
                      <dd>23.04.2019</dd>
                    </dl>
                    <dl className="dl mr-3">
                      <dt>elements</dt>
                      <dd>500</dd>
                      <dt>storage</dt>
                      <dd>5000</dd>
                    </dl>
                  </div>
                </div>
              </section>
              <section className="card-section flex jcend">
                <Button className="btn-empty danger" text="delete" />
                <Button className="btn-empty" text="edit" />
              </section>
            </article>
            <article className="card">
              <header className="card-header header-dark">
                <h4>Title</h4>
              </header>
              <section className="card-section">Less structured data</section>
              <section className="card-section">
                Some general text for this undefined card with several sections
              </section>
            </article>

            <article className="card card-h">
              <header className="card-h-title">
                <h4>Demo Company Ltd.</h4>
                <section className="">
                  <MenuButton />
                </section>
              </header>
              <section className="card-h-logo">
                <div className="fake-card-logo" />
              </section>
              <section className="card-h-body flex wrap">
                <dl className="dl-compact mr-5">
                  <dt>Active</dt>
                  <dd>Yes</dd>
                  <dt>Elements</dt>
                  <dd>243</dd>
                  <dt>Users</dt>
                  <dd>4</dd>
                </dl>
                <dl className="dl-compact mr-5">
                  <dt>started</dt>
                  <dd>23.04.2019</dd>
                  <dt>elements</dt>
                  <dd>500</dd>
                  <dt>storage</dt>
                  <dd>5000</dd>
                </dl>
              </section>
            </article>
          </div>
        </section>
      </section>
    </div>
  )
}

const MenuButton = props => (
  <button className="btn-empty menu-dots" type="button" {...props}>
    ...
  </button>
)

function Spacer(params) {
  return <span className="mx-3" />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
