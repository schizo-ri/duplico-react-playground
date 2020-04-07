import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react'
import { Transition } from 'react-transition-group'
import { Card } from '../components/Card'
import { Input } from '../components/Form'
// import { Button } from "../components/Button";
import { Circle, Plus } from '../components/SVGs'
import { nodes, elements } from './tree-object'
import { throttle } from '../utils'
import '../styles/Tree.css'

// Context
const initialState = {
  collapsed: [305],
  nodeTree: [],
  // this will go to store context
  selectedNode: 305,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'collapsed':
      return { ...state, collapsed: action.payload }
    case 'nodes':
      return { ...state, nodes: action.payload }
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
    <input id={'node-' + id} type="radio" name={name} {...props} />
    <label htmlFor={'node-' + id}>{children}</label>
  </div>
)
const NodeInfo = ({ node }) => {
  return (
    <article className="rounded shadow-lg bg-white">
      <header className="px-3 pt-3">
        <h3>{node.nice_name || node.name}</h3>
      </header>
      <section className="px-3">
        <dl className="dl">
          <dt>category</dt>
          <dd>{node.category || '-'}</dd>
          <dt>location</dt>
          <dd>{node.location || '-'}</dd>
          <dt>lead</dt>
          <dd>{node.lead || '-'}</dd>
        </dl>
        {node.description && (
          <details className="pb-3">
            <summary className="small uppercase">description</summary>
            <p>{node.description}</p>
          </details>
        )}
      </section>
    </article>
  )
}
function ElementItem({ element, ...props }) {
  return (
    <article className="rounded shadow-lg bg-white mb-3">
      <header className="px-3 pt-3">
        <h3>{element.name}</h3>
      </header>
      <section className="row wrap jcb px-3">
        <dl className="dl">
          <dt>category</dt>
          <dd>{element.category || '-'}</dd>
          <dt>code</dt>
          <dd>{element.code || '-'}</dd>
        </dl>
        <dl className="dl">
          <dt>model</dt>
          <dd>{element.model || '-'}</dd>
          <dt>manufacturer</dt>
          <dd>{element.manufacturer || '-'}</dd>
        </dl>
        <dl className="dl">
          <dt>created_by</dt>
          <dd>{element.created_by || '-'}</dd>
          <dt>created_at</dt>
          <dd>{element.created_at || '-'}</dd>
        </dl>
        <dl className="dl">
          <dt>modified_by</dt>
          <dd>{element.modified_by || '-'}</dd>
          <dt>lead</dt>
          <dd>{element.lead || '-'}</dd>
        </dl>
        {element.description && (
          <details className="pb-3">
            <summary className="small uppercase">description</summary>
            <p>{element.description}</p>
          </details>
        )}
      </section>
    </article>
  )
}
// Transition states
const duration = 300
const defaultStyle = {
  transformOrigin: 'left top 0',
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
// draw tree based on object tree
const Items = ({ context = TreeContext, nodes, handleChange, ...props }) => {
  const { state, dispatch } = useContext(context)

  // useEffect(() => console.log({ state }), [state]);

  const handleCollapse = nodeId => {
    !state.collapsed.includes(nodeId)
      ? dispatch({ type: 'collapsed', payload: [...state.collapsed, nodeId] })
      : dispatch({
          type: 'collapsed',
          payload: state.collapsed.filter(n => n !== nodeId),
        })
  }

  return nodes.reduce((list, node) => {
    if (node.children.length > 0) {
      return [
        ...list,
        <li key={node.id}>
          <div className="flex aic item-box">
            <Plus
              size="0.75rem"
              fill="var(--gray3)"
              init={state.collapsed.includes(node.id)}
              clickAction={() => handleCollapse(node.id)}
            />
            <NodeItem
              id={`node-${node.id}`}
              className="ml-2"
              type="radio"
              name="node-tree"
              // defaultChecked={node.parent === null}
              checked={state.selectedNode === node.id}
              onChange={() => handleChange(node.id)}>
              {node.name}
            </NodeItem>
          </div>
          <Transition in={state.collapsed.includes(node.id)} timeout={duration}>
            {state => (
              <>
                <ul
                  className="node-tree-branch"
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}>
                  <Items
                    nodes={node.children}
                    handleChange={handleChange}
                    context={context}
                  />
                </ul>
              </>
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
            checked={state.selectedNode === node.id}
            onChange={() => handleChange(node.id)}>
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

const findParents = (arr, id) => {
  const find = (arr, id, init = []) =>
    arr.reduce((parents, obj, idx, original) => {
      if (obj.id === id) {
        const parent = original.filter(o => o.id === obj.parent)[0]
        if (parent) {
          return find(arr, parent.id, [...parents, parent])
        }
      }
      return [...parents]
    }, init)
  return find(arr, id).map(p => p.id)
}

const defaultTreeCollapseStyle = {
  marginTop: 'calc(-1 * var(--radius))',
  backgroundColor: 'var(--white)',
  boxShadow: 'var(--shadow-lg)',
  transition: `all ${duration}ms ease-in-out`,
}
const transitionTreeCollapseStyles = height => {
  return {
    entering: { overflow: 'hidden', maxHeight: height },
    entered: { overflow: 'auto', maxHeight: height } /* maxHeight: 'initial' */,
    exiting: { overflow: 'hidden', maxHeight: 0 },
    exited: { overflow: 'hidden', maxHeight: 0 },
  }
}
const defaultSearchCollapseStyle = {
  position: 'absolute',
  overflow: 'hidden',
  zIndex: 3,
  marginTop: 'calc(-1 * var(--radius))',
  backgroundColor: 'var(--black)',
  color: 'var(--white)',
  boxShadow: 'var(--shadow-lg)',
  borderRadius: '0 var(--radius) var(--radius) var(--radius)',
  transition: `all ${duration}ms ease-in-out`,
}
const transitionSearchCollapseStyles = {
  entering: { overflow: 'hidden', maxHeight: '100vh' },
  entered: { overflow: 'auto', maxHeight: '100vh' },
  exiting: { overflow: 'hidden', maxHeight: 0 },
  exited: { overflow: 'hidden', maxHeight: 0 },
}
const Tree = props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [treeCollapse, setTreeCollapse] = useState('100vh')
  const [searchCollapse, setSearchCollapse] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const treeBody = useRef(null)
  // const searchBody = useRef(null);

  useEffect(() => {
    dispatch({ type: 'nodes', payload: nodes })
    dispatch({ type: 'nodeTree', payload: buildObjectTree(nodes, null) })
  }, [dispatch])

  useEffect(() => {
    if (!!treeCollapse) {
      return
    }
    const resize = throttle(setTreeCollapse, 500)
    const handleResize = e => {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      if (width < 960) {
        return
      }
      resize(calculateHight(treeBody.current))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [treeCollapse])

  // collapsed === expanded
  const handleChange = nodeId => {
    dispatch({ type: 'selectNode', payload: nodeId })
    dispatch({
      type: 'collapsed',
      payload: Array.from(
        new Set([
          ...state.collapsed,
          ...findParents(state.nodes, nodeId),
          nodeId,
        ])
      ),
    })
    if (searchTerm) {
      setTimeout(() => setSearchTerm(''), 300)
    }
  }

  const calculateHight = target => {
    const top = target.offsetTop
    const maxHeight = `calc(100vh - var(--gap) - ${top}px`
    return maxHeight
  }

  const handleCollapse = e => {
    if (!!treeCollapse) {
      setTreeCollapse(0)
      return
    }
    setTreeCollapse(calculateHight(treeBody.current))
  }

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const handleSearchCollapse = show => {
    setSearchCollapse(show)
  }

  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      <div id="nei-grid">
        <div>
          <div id="node-tree-toolbar" className="row mb-2">
            <button type="button" className="btn brand ml-auto">+ add project</button>
          </div>
        <div className="nodes-tree rounded shadow-lg bg-white relative">
          <div className="rounded p-2 row jcb aic overflow-hidden">
            <Input
              id="search-node"
              type="search"
              label="Search projects"
              placeholder="Search projects"
              wrapClass="m-0"
              labelClass="d-none"
              onFocus={() => handleSearchCollapse(true)}
              onBlur={() => handleSearchCollapse(false)}
              onChange={handleSearch}
              value={searchTerm}
            />
            <button
              type="button"
              className="btn-empty px-2 muted"
              onClick={handleCollapse}
              data-toggle="nodes-tree">
              {String.fromCharCode(9207)}
            </button>
          </div>
          <Transition in={searchCollapse} timeout={duration}>
            {searchState => {
              return (
                <div
                  className="shadow-lg"
                  style={{
                    ...defaultSearchCollapseStyle,
                    ...transitionSearchCollapseStyles[searchState],
                  }}>
                  {!!searchTerm ? (
                    <ul className="unlist px-3 pt-3">
                      {nodes
                        .filter(node =>
                          `
                            ${node.name}
                            ${node.location || ''}
                            ${node.category || ''}
                          `
                            .toUpperCase()
                            .includes(searchTerm.toUpperCase())
                        )
                        .map(node => (
                          <li key={node.id}>
                            <button
                              type="button"
                              className="btn-text"
                              onClick={() => handleChange(node.id)}>
                              {node.name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="px-3 pt-3 h4 muted">Enter some term</p>
                  )}
                </div>
              )
            }}
          </Transition>
          <Transition in={!!treeCollapse} timeout={duration}>
            {collapseState => {
              return (
                <div
                  className="collapse-body rounded-bottom"
                  style={{
                    ...defaultTreeCollapseStyle,
                    ...transitionTreeCollapseStyles(treeCollapse)[
                      collapseState
                    ],
                  }}
                  ref={treeBody}>
                  <ul className="unlist pl-3">
                    <Items nodes={state.nodeTree} handleChange={handleChange} />
                  </ul>
                </div>
              )
            }}
          </Transition>
        </div>
        </div>
        <div className="select-info">
          {state.selectedNode && (
            <>
              <section>
                <h3 className="mt-3 mx-3 mb-0">Project Info</h3>
                <hr className="hr-rainbow" />
                <NodeInfo
                  node={nodes.filter(n => n.id === state.selectedNode)[0]}
                />
              </section>
              <section>
                <div className="row jcb aie">
                  <h3 className="mt-3 mx-3 mb-0">Elements</h3>
                  <div>
                    <button type="button" className="btn-empty brand">
                      + add
                    </button>
                  </div>
                </div>
                <hr className="hr-rainbow" />
                <div>
                  {elements.filter(e => e.node_id === state.selectedNode)
                    .length === 0 ? (
                    <div className="rounded shadow-lg bg-white p-3">
                      <p className="double muted mb-0">
                        No elements created for this project. To add an element to this project press the <span className="brand">+ add</span> button above
                      </p>
                    </div>
                  ) : (
                    elements
                      .filter(e => e.node_id === state.selectedNode)
                      .map((e, idx) => <ElementItem key={e.id} element={e} />)
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </TreeContext.Provider>
  )
}

export default Tree
