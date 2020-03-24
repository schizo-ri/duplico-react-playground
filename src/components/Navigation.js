import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Select } from "../components/Form";
import { Dropdown } from '../components/Button'
import '../styles/Navigation.css'
import '../styles/Button.css'
import '../styles/Form.css'

const Nav = props => {
  const [fit, setFit] = useState(true)
  const [warmth, setWarmth] = useState(localStorage.getItem('warmth') || 'warm');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)') || 'light');

  const handleWarmthSwitch = e => {
    setWarmth(e.target.value)
    document.documentElement.dataset.warmth = e.target.value
    localStorage.setItem('warmth', e.target.value)
  }

  const handleThemeSwitch = e => {
    setTheme(e.target.value)
    document.documentElement.dataset.theme = e.target.value
    localStorage.setItem('theme', e.target.value)
  }

  useLayoutEffect(function menuFit() {
    function calculateFit() {
      // 100 is an estimation, there should be a better way
      // useCallback may be the one: https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
      // wrap whole component inside Aside if it doesn't fit?
      NAV_ITEMS.length * 100 >= window.innerWidth ? setFit(false) : setFit(true)
      return
    }
    calculateFit()
    document.documentElement.dataset.warmth = warmth
    document.documentElement.dataset.theme = theme
    window.addEventListener('resize', calculateFit)
    return () => window.removeEventListener('resize', calculateFit)
  }, [])

  return (
    <>
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
      </nav>
      <div className="row bg-teal">
        <div className="row ml-auto p-2">
          <Select id="select-theme" label="Theme" wrap="mb-0" inline="inline" onChange={handleThemeSwitch} value={theme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
          <Select id="select-warmth" label="Warmth" wrap="mb-0" inline="inline" onChange={handleWarmthSwitch} value={warmth}>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </Select>
        </div>
      </div>
    </>
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
