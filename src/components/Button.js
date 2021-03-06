import React, { useState, useRef } from 'react'

const Button = props => {
  const { children, addClass, ...bp } = { ...props }
  return (
    <button type="button" className={[addClass && /btn/.test(addClass) ? '' : 'btn', addClass].join(' ')} {...bp}>
      {children}
    </button>
  )
}

const Dropdown = props => {
  const [show, setShow] = useState({ position: '', visible: false })
  const childrenContainer = useRef(null)

  const toggle = e => {
    !show.visible
      ? setShow({
          position: calculatePosition(e.target),
          visible: !show.visible,
        })
      : setShow({ ...show, visible: !show.visible })
  }

  const calculatePosition = target => {
    const positions = target.getBoundingClientRect()
    const countChildren = childrenContainer.current.children.length
    // target.nextElementSibling.children.length !== 1
    // ? target.nextElementSibling.childElementCount
    // : target.nextElementSibling.children[0].childElementCount

    const y = window.innerHeight - positions.bottom < countChildren * 35 ? 'top' : 'bottom'
    const x = positions.left < window.innerWidth / 2 ? 'left' : 'right'
    return [y, x].join('-')
  }

  function handleBackdropClose(e) {
    // if (!e.target.closest(".dropdown-menu") && e.target.id !== props.id) {
    if (e.target.nodeName !== 'INPUT') {
      setShow({ ...show, visible: false })
    }
    return
  }
  // useEffect(
  //   function backdropClose() {
  //     function handleBackdropClose(e) {
  //       // if (!e.target.closest(".dropdown-menu") && e.target.id !== props.id) {
  //       if (e.target.nodeName !== 'INPUT') {
  //         setShow({ ...show, visible: false })
  //       }
  //       return
  //     }
  //     document.addEventListener('mouseup', handleBackdropClose, {
  //       passive: true,
  //       capture: false,
  //     })
  //     return () =>
  //       document.removeEventListener('mouseup', handleBackdropClose, {
  //         passive: true,
  //         capture: false,
  //       })
  //   },
  //   [props.id, show]
  // )

  const listClass = [!show.visible ? 'd-none' : '', show.position, 'dropdown-menu pop-in'].join(' ')

  return (
    <div className="dropdown">
      <button
        id={props.id}
        className={[!props.text ? 'menu-dots' : '', 'dropdown-button', props.className].join(' ')}
        type="button"
        aria-haspopup="true"
        aria-expanded={show.visible && 'true'}
        onClick={toggle}
      >
        {props.text || ''}
      </button>
      {show.visible && <div className="event-backdrop" onClick={handleBackdropClose} />}
      <div
        ref={childrenContainer}
        className={listClass}
        aria-labelledby={props.id}
        x-placement={show.position}
        onClick={handleBackdropClose}
      >
        {props.children}
      </div>
    </div>
  )
}

export { Button, Dropdown }
