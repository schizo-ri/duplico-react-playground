import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

export default () => (
  <div className="fs light center">
    <p>Sorry, there doesn't seem to be anything here.</p>
    <h3>
      Check URL or go{' '}
      <Link to="/">
        <strong>home</strong>
      </Link>
    </h3>
  </div>
)
