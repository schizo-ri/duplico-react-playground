import React, { useState } from 'react'
import { ToggleToken } from '../components/Form'
import { nodes } from './tree-object'
import '../styles/Tree.css'

const NodeItem = props => (
  <div className={['node-item', props.className].join(' ')}>
    <input id={props.id} type="radio" name={`${props.name || props.id}`} />
    <label htmlFor={`${props.id}`}>
      <FolderIcon />
      {props.children}
    </label>
  </div>
)

const Items = ({ nodes, ...props }) => {
  return nodes.reduce((list, node) => {
    if (node.children.length > 0) {
      return [
        ...list,
        <li key={node.id}>
          <div className="flex aic">
            {/* <input type="radio" className="btn-text" value={node.name} /> */}
            <NodeItem id={node.id} type="radio" name="node-tree">
              {node.name}
            </NodeItem>
          </div>
          <ul>
            <Items nodes={node.children} />
          </ul>
        </li>,
      ]
    }
    return [
      ...list,
      <li key={node.id}>
        <div className="flex aic">
          {/* <input type="radio" className="btn-text" value={node.name} /> */}
          <NodeItem id={node.id} type="radio" name="node-tree">
            {node.name}
          </NodeItem>
        </div>
      </li>,
    ]
  }, [])
}

const buildObjectTree = (arr, parent = null) =>
  arr.reduce((agg, e, i) => {
    if (e.parent === parent) {
      e.children = buildObjectTree(arr, e.id)
      agg.push(e)
    }
    return agg
  }, [])

const Tree = props => {
  return (
    <div className="tree">
      {
        <ul>
          <Items nodes={buildObjectTree(nodes, null)} />
        </ul>
      }
    </div>
  )
}

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

export default Tree

{
  /* <svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 147.467 135.861"
className="node-icon"
>
<g transform="translate(-59.454 -94.871)" fill="none" stroke="#000">
  <circle cx="89.717" cy="200.469" r="23.509" strokeWidth="13.507" />
  <circle cx="133.188" cy="125.133" r="23.509" strokeWidth="13.507" />
  <circle cx="176.658" cy="200.469" r="23.509" strokeWidth="13.507" />
  <path
    d="M115.18 141.502l-19.895 34.46M151.193 141.502l19.895 34.46"
    strokeWidth="11.081"
  />
</g>
</svg> */
}
{
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147.467 135.861" className="node-icon">
<g transform="translate(-59.454 -94.871)">
  <circle cx="92.012" cy="198.174" r="27.848" />
  <circle cx="133.187" cy="127.429" r="27.848" />
  <circle cx="174.363" cy="198.174" r="27.848" />
  <path
    d="M96.272 180.5l31.946-45.623M138.156 134.878L170.1 180.5"
    fill="none"
    stroke="#000"
    strokeWidth="10.403"
  />
</g>
</svg> */
}
{
  /* <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 147.467 135.861"
      className="node-icon"
    >
      <g transform="translate(-59.454 -94.871)">
        <circle cx="92.012" cy="198.174" r="27.848" strokeWidth="7.421" />
        <circle cx="133.187" cy="127.429" r="27.848" strokeWidth="7.421" />
        <circle cx="174.363" cy="198.174" r="27.848" strokeWidth="7.421" />
        <path d="M115.772 152.52l-17.155 17.156" strokeWidth="8.087" />
        <path d="M167.86 169.662l-17.242-17.241" strokeWidth="8.128" />
      </g>
    </svg> */
}

// const buildJSXTree = (arr, parent) => {
//   return arr.reduce((agg, e) => {
//     if (e.parent_node == parent) {
//       agg.concat(withChildren(e.name))
//       agg.concat(tree(arr, e.id))
//       agg.concat(`</ul></li>`)
//       return agg
//     } else {
//       agg.concat(noChild(e.name))
//       return agg
//     }
//     // return agg
//   }, '')
// }
