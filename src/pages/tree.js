import React, { useEffect, useReducer, useContext } from 'react'
import { Transition } from 'react-transition-group'
import { Circle, Plus } from '../components/SVGs'
import { nodes } from './tree-object'
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
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'collapsed':
      return { ...state, collapsed: action.payload }
    case 'nodeTree':
      return { ...state, nodeTree: action.payload }
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
// draw tree based on object tree
const Items = ({ nodes, ...props }) => {
  const { state, dispatch } = useContext(TreeContext)

  const handleCollapse = (collapse, node) => {
    collapse
      ? dispatch({ type: 'collapsed', payload: [...state.collapsed, node] })
      : dispatch({
          type: 'collapsed',
          payload: state.collapsed.filter(n => n !== node),
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
              clickAction={e =>
                handleCollapse(!state.collapsed.includes(node.id), node.id)
              }
            />
            <NodeItem
              id={`node-${node.id}`}
              className="ml-2"
              type="radio"
              name="node-tree"
              defaultChecked={node.parent === null}
            >
              {node.name}
            </NodeItem>
          </div>
          <Transition
            in={!state.collapsed.includes(node.id)}
            timeout={duration}
            // onEnter={node => node.classList.remove('d-none')}
            // onExit={node => node.classList.add('d-none')}
          >
            {state => (
              <ul
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
          <NodeItem id={node.id} className="ml-2" type="radio" name="node-tree">
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
      <div className="tree">
        {
          <ul>
            <Items nodes={state.nodeTree} />
          </ul>
        }
      </div>
    </TreeContext.Provider>
  )
}

export default Tree
