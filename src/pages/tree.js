import React, { useEffect, useReducer, useContext } from 'react'
import { Transition } from 'react-transition-group'
import { Circle, Plus } from '../components/SVGs'
import { nodes, elements } from './tree-object'
import '../styles/Tree.css'

// Transition states
const duration = 300
const defaultStyle = {
  transition: `all ${duration}ms ease`,
}
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: {
    maxHeight: 0,
    transform: 'scale(0)',
    opacity: 0,
    visibility: 'hidden',
  },
  exited: {
    maxHeight: 0,
    transform: 'scale(0)',
    opacity: 0,
    visibility: 'hidden',
  },
}
// Context
const initialState = {
  collapsed: [306],
  nodeTree: [],
  // this will go to store context
  selectedNode: null,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'collapsed':
      return { ...state, collapsed: action.payload }
    case 'nodeTree':
      return { ...state, nodeTree: action.payload }
    case 'selectNode':
      return { ...state, selectedNode: action.payload }
    default:
      break
  }
}
const TreeContext = React.createContext(null)
// Tree node item component
const NodeItem = ({ id, name, children, ...props }) => (
  <div className={['node-item', props.className].join(' ')}>
    <input id={id} type="radio" name={name} {...props} />
    <label htmlFor={id}>{children}</label>
  </div>
)
// Element item component
const ElementItem = ({ id, name, children, ...props }) => (
  <div className={['element-item', props.className].join(' ')}>
    <input id={id} type="radio" name={name} {...props} />
    <label htmlFor={id}>{children}</label>
  </div>
)
// draw tree based on object tree
const Items = ({ nodes, ...props }) => {
  const { state, dispatch } = useContext(TreeContext)

  const handleCollapse = (collapse, nodeId) => e => {
    collapse
      ? dispatch({ type: 'collapsed', payload: [...state.collapsed, nodeId] })
      : dispatch({
          type: 'collapsed',
          payload: state.collapsed.filter(n => n !== nodeId),
        })
  }

  const handleChange = (collapse, nodeId) => e => {
    dispatch({ type: 'selectNode', payload: nodeId })
    !collapse &&
      dispatch({
        type: 'collapsed',
        payload: state.collapsed.filter(n => n !== nodeId),
      })
  }

  return nodes.reduce((list, node) => {
    if (node.children.length > 0) {
      return [
        ...list,
        <li key={node.id
          <div className="flex aic item-box">
            <Plus
              size="0.75rem"
              fill="var(--gray2)"
              init={state.collapsed.includes(node.id)}
              clickAction={handleCollapse(
                !state.collapsed.includes(node.id),
                node.id
              )}
            />
            <NodeItem
              id={`node-${node.id}`}
              className="ml-2"
              type="radio"
              name="node-tree"
              defaultChecked={node.parent === null}
              onChange={handleChange(
                !state.collapsed.includes(node.id),
                node.id
              )}
            >
              {node.name}
            </NodeItem>
          </div>
          <Transition
            in={!state.collapsed.includes(node.id)}
            timeout={duration}
          >
            {state => (
              <ul
                className="node-tree-branch"
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <Items nodes={node.children} />
              </ul>
            )}
          </Transition>
        </li>,
      ]
    }
    return [
      ...list,
      <li key={node.id}>
        <div className="flex aic item-box">
          <Circle
            size="0.5rem"
            fill="var(--gray2)"
            additionalStyle={{ margin: '0 0.125rem' }}
          />
          <NodeItem
            id={node.id}
            className="ml-2"
            type="radio"
            name="node-tree"
            onChange={handleChange(!state.collapsed.includes(node.id), node.id)}
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
  // setNodeTree would be used in fetch
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'nodeTree', payload: buildObjectTree(nodes, null) })
  }, [])

  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      <div id="nei-grid">
        <div className="nodes-tree">
          {
            <ul>
              <Items nodes={state.nodeTree} />
            </ul>
          }
        </div>
        <div className="elements-list">
          <ul>
            {elements
              .filter(e => e.node_id === state.selectedNode)
              .map((e, idx) => (
                <li key={e.id}>
                  <ElementItem
                    id={`element-${e.id}`}
                    className="ml-2"
                    type="radio"
                    name="element-list"
                    defaultChecked={idx === 0}
                  >
                    {e.name}
                  </ElementItem>
                </li>
              ))}
          </ul>
        </div>
        <div className="select-info">
          {state.selectedNode &&
            JSON.stringify(nodes.filter(n => n.id === state.selectedNode))}
        </div>
      </div>
    </TreeContext.Provider>
  )
}

export default Tree
