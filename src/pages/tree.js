import React, { useState } from 'react'
import { ToggleToken } from '../components/Form'
import { nodes } from './tree-object'
import '../styles/Tree.css'

const Items = ({ nodes, ...props }) => {
  return nodes.reduce((list, node) => {
    if (node.children.length > 0) {
      return [
        ...list,
        <li key={node.id}>
          <ToggleToken id={node.id} type="radio" name="node-tree">
            {node.name}
          </ToggleToken>
          <ul>
            <Items nodes={node.children} />
          </ul>
        </li>,
      ]
    }
    return [
      ...list,
      <li key={node.id}>
        <ToggleToken id={node.id} type="radio" name="node-tree">
          {node.name}
        </ToggleToken>
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

export default Tree

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
