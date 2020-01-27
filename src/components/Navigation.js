import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from '../components/Button'
import '../styles/Navigation.css'
import '../styles/Button.css'
import '../styles/Form.css'

const THEME_SWITCH = {
  'theme-cold': 'theme-warm',
  'theme-warm': 'theme-cold',
}

const Nav = props => {
  const [fit, setFit] = useState(true)
  // const [warmth, setWarmth] = useState('cold');

  const handleWarmthSwitch = e => {
    const theme = e.target.checked ? 'theme-cold' : 'theme-warm'
    const body = document.body
    const classes = body.classList
    classes.length === 0
      ? body.classList.add(theme)
      : body.classList.replace(THEME_SWITCH[theme], theme)
  }

  useLayoutEffect(function menuFit() {
    function calculateFit() {
      // 100 is an estimation, there should be a better way
      NAV_ITEMS.length * 100 >= window.innerWidth ? setFit(false) : setFit(true)
      return
    }
    calculateFit()
    window.addEventListener('resize', calculateFit)
    return () => window.removeEventListener('resize', calculateFit)
  }, [])

  return (
    <nav className="navbar flex jcb aic">
      {fit ? (
        <ul className="navlist">
          <NavItems collapsed={fit} />
        </ul>
      ) : (
        <Dropdown id="nav-collapse" className="btn-empty fix-white" text="Menu">
          <NavItems collapsed={fit} />
        </Dropdown>
      )}
      <div className="ml-auto">
        <div className="switch">
          <input
            type="checkbox"
            id="theme-switch"
            className="switch-input"
            onChange={handleWarmthSwitch}
          />
          <label htmlFor="theme-switch" className="switch-label c-white">
            Warmth
          </label>
        </div>
      </div>
    </nav>
  )
}

const NAV_ITEMS = [
  ['Home', '/'],
  ['Typography', 'typography'],
  ['Buttons', 'buttons'],
  ['Forms', 'forms'],
  ['Navigations', 'navigations'],
  ['Offscreen', 'offscreen'],
  ['Tables', 'tables'],
  ['Tree', 'tree'],
]

const NavItems = props => {
  const linkClass = props.collapsed ? 'btn-empty fix-white' : 'btn-empty'

  return NAV_ITEMS.map(([label, route]) => (
    <li key={label} className="nav-item">
      <Link className={linkClass} to={route}>
        {label}
      </Link>
    </li>
  ))
}

export default Nav
