import React, { useState, useLayoutEffect } from 'react'
import { Transition } from 'react-transition-group'

const Ux2297 = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.467 135.467">
    <g transform="translate(0 -161.533)">
      <circle
        cx="67.733"
        cy="229.267"
        r="59.184"
        fill="none"
        stroke={props.stroke}
        strokeWidth="8.467"
      />
      <path
        stroke={props.stroke}
        strokeWidth=".149"
        d="M97.668 265.082l5.88-5.88-65.749-65.75-5.88 5.88z"
      />
      <path
        stroke={props.stroke}
        strokeWidth=".149"
        d="M31.918 259.2l5.881 5.882 65.75-65.75-5.881-5.881z"
      />
    </g>
  </svg>
)

const AddCol = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 135.467 135.467"
    style={props.style}
  >
    <g transform="translate(0 -161.533)">
      <rect
        width="111.125"
        height="111.125"
        x="-284.997"
        y="12.003"
        ry="1.984"
        transform="rotate(-90)"
        fill="none"
        stroke={props.stroke}
        strokeWidth="7.938"
      />
      <rect
        width="112.853"
        height="33.478"
        x="-285.861"
        y="90.514"
        ry="1.196"
        transform="rotate(-90)"
        stroke={props.stroke}
        strokeWidth="6.209"
      />
      <rect
        width="112.21"
        height="1.614"
        x="-285.539"
        y="51.148"
        ry="1.826"
        transform="rotate(-90)"
        stroke={props.stroke}
        strokeWidth="6.852"
      />
      <circle
        cx="-229.699"
        cy="107.253"
        r="13.229"
        transform="rotate(-90)"
        stroke="#fff"
        strokeWidth="2.117"
      />
      <rect
        width=".269"
        height="19.848"
        x="-229.833"
        y="97.462"
        ry="3.176"
        transform="rotate(-90)"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1.848"
      />
      <rect
        width=".269"
        height="19.848"
        x="106.722"
        y="219.907"
        ry="3.176"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1.848"
      />
    </g>
  </svg>
)

const AddRow = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 135.467 135.467"
    style={props.style}
  >
    <g transform="translate(0 -161.533)">
      <rect
        width="111.125"
        height="111.125"
        x="12.435"
        y="173.44"
        ry="1.984"
        fill="none"
        stroke={props.stroke}
        strokeWidth="7.938"
      />
      <rect
        width="112.853"
        height="33.478"
        x="11.571"
        y="251.95"
        ry="1.196"
        stroke={props.stroke}
        strokeWidth="6.209"
      />
      <rect
        width="112.21"
        height="1.614"
        x="11.893"
        y="212.585"
        ry="1.826"
        stroke={props.stroke}
        strokeWidth="6.852"
      />
      <circle
        cx="67.733"
        cy="268.69"
        r="13.229"
        stroke={props.stroke}
        strokeWidth="2.117"
      />
      <rect
        width=".269"
        height="19.848"
        x="67.599"
        y="258.898"
        ry="3.176"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1.848"
      />
      <rect
        width=".269"
        height="19.848"
        x="268.158"
        y="-77.525"
        ry="3.176"
        transform="rotate(90)"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1.848"
      />
    </g>
  </svg>
)

function FolderIcon({
  size = '1rem',
  fill = 'var(--black)',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 155.466 143.861"
      className="node-icon"
      style={{ width: size, height: size, stroke: fill }}
    >
      <g transform="translate(-55.454 -90.87)">
        <circle cx="89.717" cy="200.469" r="23.509" strokeWidth="13.507" />
        <circle cx="133.188" cy="125.133" r="23.509" strokeWidth="13.507" />
        <circle cx="176.658" cy="200.469" r="23.509" strokeWidth="13.507" />
        <path
          d="M115.18 141.502l-19.895 34.46M151.193 141.502l19.895 34.46"
          strokeWidth="11.081"
        />
      </g>
    </svg>
  )
}

function Plus({
  size = '1rem',
  init = true,
  fill = 'var(--black)',
  duration = 300,
  clickAction = null,
  ...props
}) {
  const [collapsed, setCollapsed] = useState(init)
  const svgStyle = {
    width: size,
    height: size,
    flexShrink: 0,
  }
  const rectStyle = {
    transition: `all ${duration}ms ease`,
    transformOrigin: '50% 50%',
    fill: fill,
  }
  const transitionHorizontal = {
    exiting: { transform: 'scaleY(0)' },
    exited: { transform: 'scaleY(0)' },
  }
  const transitionVertical = {
    exiting: { transform: 'rotate(90deg)' },
    exited: { transform: 'rotate(90deg)' },
  }

  useLayoutEffect(() => {
    setCollapsed(init)
  }, [init])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      style={svgStyle}
      className="btn-text"
      onClick={e => {
        // setCollapsed(!collapsed)
        clickAction && clickAction.call(null, e)
      }}
    >
      <Transition in={collapsed} timeout={duration}>
        {state => (
          <rect
            style={{ ...rectStyle, ...transitionVertical[state] }}
            x="37.5"
            width="25"
            height="100"
            rx="10"
            ry="10"
          />
        )}
      </Transition>
      <Transition in={collapsed} timeout={duration}>
        {state => (
          <rect
            style={{ ...rectStyle, ...transitionHorizontal[state] }}
            y="37.5"
            width="100"
            height="25"
            rx="10"
            ry="10"
          />
        )}
      </Transition>
    </svg>
  )
}

function Circle({
  size = '1rem',
  fill = 'var(--black)',
  additionalStyle = {},
  clickAction = null,
  ...props
}) {
  const svgStyle = {
    width: size,
    height: size,
    flexShrink: 0,
    ...additionalStyle,
  }
  const circleStyle = {
    transformOrigin: '50% 50%',
    fill: fill,
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      style={svgStyle}
      onClick={() => {
        clickAction && clickAction.call(null)
      }}
    >
      <circle
        style={circleStyle}
        cx="50"
        cy="247"
        r="50"
        transform="translate(0 -197)"
      />
    </svg>
  )
}

export { Ux2297, AddCol, AddRow, FolderIcon, Plus, Circle }
