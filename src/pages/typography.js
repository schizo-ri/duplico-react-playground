import React from 'react'
import { Card } from '../components/Card'
import '../styles/Typography.css'

const Typography = () => {
  return (
    <div style={{ padding: '0 1rem' }}>
      <h1>Typography, also a {'<h1>'} element</h1>
      <h2>Headings, also a {'<h2>'} element</h2>
      <h3>3rd level headings</h3>
      <h4>4th level headings</h4>
      <h5>5th level headings</h5>
      <h6>6th level headings</h6>
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
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, var(--width-mobile))',
          gridGap: 'var(--gap)',
          alignItems: 'start',
        }}
      >
        <Card>
          <h3>Unordered list</h3>
          <ul className="ul">
            <li>Red</li>
            <li>Green</li>
            <li>Blue</li>
            <li>Alpha</li>
          </ul>
        </Card>
        <Card>
          <h3>Ordered list</h3>
          <ol className="ol">
            <li>Red</li>
            <li>Green</li>
            <li>Blue</li>
            <li>Alpha</li>
          </ol>
        </Card>
        <Card>
          <h3>Unstyled list</h3>
          <p>
            <small>
              Is there any meaningful use case for this? BTW this is a{' '}
              {'<small>'} text
            </small>
          </p>
          <ul className="unlist">
            <li>Red</li>
            <li>Green</li>
            <li>Blue</li>
            <li>Alpha</li>
          </ul>
        </Card>
        <Card>
          <h3>Definition list</h3>
          <dl className="dl">
            <dt>1. title</dt>
            <dd>description of a first</dd>
            <dt>second</dt>
            <dd>this one has</dd>
            <dd>two descriptions</dd>
            <dt>third one</dt>
            <dd>but everything should be the same</dd>
            <dt>and the last</dt>
            <dd>but not least</dd>
          </dl>
        </Card>
      </section>
    </div>
  )
}

export default Typography
