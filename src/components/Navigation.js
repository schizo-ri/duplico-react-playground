import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from '../components/Button'
import '../styles/Navigation.css'
import '../styles/Button.css'

const Nav = props => {
  const [fit, setFit] = useState(true)

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
    <nav className="navbar">
      {fit ? (
        <ul className="navlist">
          <NavItems collapsed={fit} />
        </ul>
      ) : (
        <Dropdown id="nav-collapse" className="btn-empty white" text="Menu">
          <NavItems collapsed={fit} />
        </Dropdown>
      )}
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
]

const NavItems = props => {
  const linkClass = props.collapsed ? 'btn-empty white' : 'btn-empty'

  return NAV_ITEMS.map(([label, route]) => (
    <li key={label} className="nav-item">
      <Link className={linkClass} to={route}>
        {label}
      </Link>
    </li>
  ))
}

export default Nav
