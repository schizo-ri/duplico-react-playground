import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navigation.css'
import '../styles/Button.css'

const Nav = () => {
  return (
    <nav className="navbar">
      <ul className="navlist grow">
        <li className="nav-collapse">
          <button className="nav-link btn-empty white" type="button">Menu</button>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn-empty white" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn-empty white" to="/typography">
            Typography
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn-empty white" to="/alerts">
            Alerts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn-empty white" to="/buttons">
            Buttons
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn-empty white" to="/dialogs">
            Dialogs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn-empty white" to="/forms">
            Forms
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn-empty white" to="/navigations">
            Navigations
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
