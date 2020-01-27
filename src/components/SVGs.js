import React from 'react'

const Ux2297 = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.467 135.467">
    <g transform="translate(0 -161.533)">
      <circle cx="67.733" cy="229.267" r="59.184" fill="none" stroke={props.stroke} strokeWidth="8.467" />
      <path stroke={props.stroke} strokeWidth=".149" d="M97.668 265.082l5.88-5.88-65.749-65.75-5.88 5.88z" />
      <path stroke={props.stroke} strokeWidth=".149" d="M31.918 259.2l5.881 5.882 65.75-65.75-5.881-5.881z" />
    </g>
  </svg>
)

const AddCol = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.467 135.467" style={props.style}>
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
      <circle cx="-229.699" cy="107.253" r="13.229" transform="rotate(-90)" stroke="#fff" strokeWidth="2.117" />
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.467 135.467" style={props.style}>
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
      <circle cx="67.733" cy="268.69" r="13.229" stroke={props.stroke} strokeWidth="2.117" />
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

function FolderIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 155.466 143.861"
      className="node-icon"
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

export { Ux2297, AddCol, AddRow, FolderIcon }
