import React, { useState } from 'react'
import { Transition } from 'react-transition-group'
import { FolderIcon } from '../components/SVGs'
import { _arradd, _arrdel } from '../utils'
// import { ToggleToken } from '../components/Form'
import { nodes } from './tree-object'
import '../styles/Tree.css'

const duration = 300

const defaultStyle = {
  transition: `all ${duration}ms ease`
}

const transitionStyles = {
  entering: { height: 'auto', opacity: 1 },
  entered: { height: 'auto', opacity: 1 },
  exiting: { height: 0, opacity: 0 },
  exited: { height: 0, opacity: 0 }
}

const NodeItem = props => (
  <div className={['node-item', props.className].join(' ')}>
    <input
      id={props.id}
      type="radio"
      name={`${props.name || props.id}`}
      onChange={props.onChange || null}
    />
    <label htmlFor={`${props.id}`}>
      <FolderIcon />
      {props.children}
    </label>
  </div>
)

const Items = ({ nodes, ...props }) => {
  const [collapsed, setCollapsed] = useState([306])

  const handleCollapse = (collapse, node) => {
    collapse
      ? setCollapsed([...collapsed, node])
      : setCollapsed(collapsed.filter(n => n === node))
  }

  return nodes.reduce((list, node) => {
    if (node.children.length > 0) {
      return [
        ...list,
        <li key={node.id}>
          <div className="flex aic">
            {/* <input type="radio" className="btn-text" value={node.name} /> */}
            <NodeItem
              id={node.id}
              type="radio"
              name="node-tree"
              onChange={e =>
                handleCollapse(!collapsed.includes(node.id), node.id)
              }
            >
              {node.name}
            </NodeItem>
          </div>
          <Transition in={!collapsed.includes(node.id)} timeout={duration}>
            {state => (
              <ul
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                <Items nodes={node.children} />
              </ul>
            )}
          </Transition>
        </li>
      ]
    }
    return [
      ...list,
      <li key={node.id}>
        <div className="flex aic">
          {/* <input type="radio" className="btn-text" value={node.name} /> */}
          <NodeItem
            id={node.id}
            type="radio"
            name="node-tree"
            onChange={e =>
              handleCollapse(!collapsed.includes(node.id), node.id)
            }
          >
            {node.name}
          </NodeItem>
        </div>
      </li>
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
  const [nodeTree, setNodeTree] = useState(buildObjectTree(nodes, null))
  return (
    <div className="tree">
      {
        <ul>
          <Items nodes={nodeTree} />
        </ul>
      }
    </div>
  )
}

export default Tree
