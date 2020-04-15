import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  useRef,
  useCallback,
} from 'react'
import { _arradd, _arrdel, _arrrep } from '../utils'
import { Card } from '../components/Card'
import '../styles/Tables.css'
import { Input, Select, ToggleToken, ToggleTokens } from '../components/Form'
import { Button, Dropdown } from '../components/Button'
import { Alert, Dialog, OffscreenContext } from '../components/Offscreen'
import shortid from 'shortid'

const initialState = {
  original: {
    meta: {
      version: 2,
      perPage: 5,
      sort: null,
    },
    head: [
      {
        title: 'Check',
        key: '97f97w',
        editable: false,
        component: 'TextColumn',
      },
      {
        title: 'Method',
        key: '0dag8a',
        editable: false,
        component: 'TextColumn',
      },
      {
        title: 'Yes',
        key: 'asv8na',
        editable: true,
        component: 'CheckboxColumn',
        group: 'Result',
      },
      {
        title: 'No',
        key: 'an32rq',
        editable: true,
        component: 'CheckboxColumn',
        group: 'Result',
      },
    ],
    sections: [
      {
        key: '7d9sad',
        title: null,
        values: [
          [
            'fsuoaa',
            [
              '1.1 Svi spojevi i vijci su dobro zategnuti',
              'Ispitati "povlačenjem" žica na spojevima s elementima',
              true,
              false,
            ],
          ],
          [
            'dsabka',
            [
              '1.2 Svi elementi van ploče su ugrađeni',
              'Uvodnice, svjetiljka, grijač, oprema na vratima',
              true,
              false,
            ],
          ],
        ],
      },
      {
        key: '7d99ad',
        title: '2. Električna ispitivanja',
        values: [
          [
            '8fa09fa',
            [
              '2.0 Ormar je ohmski ispitan i ožićenje odgovara shemi ',
              'Odraditi ohmsko ispitivanje ohmmetrom',
              true,
              false,
            ],
          ],
          [
            'sad90s',
            [
              '2.1 Ormar je funkcionalno ispitan i radi sukladno dostavljenoj shemi',
              'Ormar spojiti na privremeno napajanje i ispitati njegovu funkcionalnost',
              false,
              true,
            ],
          ],
        ],
      },
    ],
  },
  head: [],
  sections: [],
  undo: [],
  redo: [],
  perPage: 5,
  page: 1,
  sort: null,
  filter: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'original':
      return { ...state, original: action.payload }
    case 'head':
      return { ...state, head: action.payload }
    case 'sections':
      return { ...state, sections: action.payload }
    case 'undo':
      return { ...state, undo: [action.payload, ...state.undo].slice(0, 10) }
    case 'redo':
      return { ...state, redo: [action.payload, ...state.redo].slice(0, 10) }
    case 'undoApplyed':
      return { ...state, undo: [...state.undo].slice(1, 10) }
    case 'redoApplyed':
      return { ...state, redo: [...state.redo].slice(1, 10) }
    case 'perPage':
      return { ...state, perPage: action.payload }
    case 'page':
      return { ...state, page: action.payload }
    case 'sort':
      return { ...state, sort: action.payload }
    case 'filter':
      return { ...state, filter: action.payload }
    default:
      break
  }
}

const GridContext = React.createContext(null)

const DataGrid = ({ data, mode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    return !data
      ? (dispatch({ type: 'head', payload: state.original.head }),
        dispatch({ type: 'sections', payload: state.original.sections }))
      : (dispatch({ type: 'original', payload: data }),
        dispatch({ type: 'head', payload: data.head }),
        dispatch({ type: 'sections', payload: data.sections }))
  }, [])

  return (
    <GridContext.Provider value={{ state, dispatch }}>
      <Card className="p-3">
        <table className="table rwd-table">
          <thead>{state.head && <TableHeader mode={mode} />}</thead>
          <tbody>{state.sections && <TableBody mode={mode} />}</tbody>
        </table>
      </Card>
    </GridContext.Provider>
  )
}

function TableHeader({ mode, ...props }) {
  const { state, dispatch } = useContext(GridContext)
  const [dropTargetIdx, setDropTargetIdx] = useState(null)
  const [dragTargetIdx, setDragTargetIdx] = useState(null)
  const [dragEnded, setDragEnded] = useState(null)
  // const [illegalDrag, setIllegalDrag] = useState(null)

  useEffect(() => {
    // if (illegalDrag) {
    //   return
    // }
    if (!dragEnded) {
      setDragTargetIdx(null)
      setDropTargetIdx(null)
      return
    }
    if (dropTargetIdx === dragTargetIdx) {
      setDragEnded(false)
      return
    }
    console.log({ dropTargetIdx })
    console.log({ dragTargetIdx })

    const updatedHead = state.head.reduce((agg, col, idx, original) => {
      if (dropTargetIdx === idx) {
        return [
          ...agg,
          { ...original[dragTargetIdx], group: original[dropTargetIdx].group || null },
          col,
        ]
      }
      if (dragTargetIdx === idx) {
        return agg
      }
      return [...agg, col]
    }, [])
    const sections = state.sections.map(sec => ({
      ...sec,
      values: sec.values.map(([key, data]) => [
        key,
        data.reduce((agg, col, idx, original) => {
          if (dropTargetIdx === idx) {
            return [...agg, original[dragTargetIdx], col]
          }
          if (dragTargetIdx === idx) {
            return agg
          }
          return [...agg, col]
        }, []),
      ]),
    }))
    dispatch({ type: 'head', payload: updatedHead })
    dispatch({ type: 'sections', payload: sections })

    setDragEnded(false)
    setDragTargetIdx(null)
    setDropTargetIdx(null)
  }, [dragEnded])

  const handleRename = colIdx => e => {
    if (!e.target.textContent) {
      return
    }
    dispatch({
      type: 'head',
      payload: _arrrep(state.head, colIdx, {
        ...state.head[colIdx],
        title: e.target.textContent,
      }),
    })
  }
  const handleGroupRename = colIdx => e => {
    if (!e.target.textContent) {
      return
    }
    const old = state.head[colIdx].group
    dispatch({
      type: 'head',
      payload: state.head.map(col => {
        if (col.group === old) {
          return { ...col, group: e.target.textContent }
        }
        return col
      }),
    })
  }

  const handleDragEnter = colIdx => e => {
    e.preventDefault()
    if (colIdx === dragTargetIdx) {
      return
    }
    const target = e.target
    if (
      (state.head[colIdx].group && !state.head[dragTargetIdx].group) ||
      (!state.head[colIdx].group && state.head[dragTargetIdx].group)
    ) {
      target.nodeName === 'TH'
        ? target.classList.add('th-drop-invalid')
        : target.closest('th').classList.add('th-drop-invalid')
      setDropTargetIdx(null)
      return
    }
    target.nodeName === 'TH'
      ? target.classList.add('th-drop')
      : target.closest('th').classList.add('th-drop')
    setDropTargetIdx(colIdx)
  }
  const handleDragLeave = colIdx => e => {
    e.preventDefault()
    const target = e.target
    target.nodeName === 'TH'
      ? target.classList.remove('th-drop', 'th-drop-invalid')
      : target.closest('th').classList.remove('th-drop', 'th-drop-invalid')
  }
  const handleDragEnd = colIdx => e => {
    e.preventDefault()
    requestIdleCallback(
      () => {
        if (dropTargetIdx === colIdx || !dropTargetIdx) {
          return
        }
        const updatedHead = state.head.reduce((agg, col, idx, original) => {
          if (dropTargetIdx === idx) {
            return [...agg, original[colIdx], col]
          }
          if (colIdx === idx) {
            return agg
          }
          return [...agg, col]
        }, [])
        const sections = state.sections.map(sec => ({
          ...sec,
          values: sec.values.map(([key, data]) => [
            key,
            data.reduce((agg, col, idx, original) => {
              if (dropTargetIdx === idx) {
                return [...agg, original[colIdx], col]
              }
              if (colIdx === idx) {
                return agg
              }
              return [...agg, col]
            }, []),
          ]),
        }))
        dispatch({ type: 'head', payload: updatedHead })
        dispatch({ type: 'sections', payload: sections })
        setDragTargetIdx(null)
      },
      { timeout: 1000 }
    )
  }

  return state.head && state.head.some(col => col.group) ? (
    <>
      <tr>
        {mode === 'builder' && <th className="row-handle-th" rowSpan="2"></th>}
        {state.head.reduce((ths, data, idx) => {
          if (data.group) {
            const prev = state.head
              .slice(0, idx)
              .filter(col => col.group === data.group)
            if (prev.length > 0) {
              return ths
            }
            return [
              ...ths,
              <th
                key={data.key}
                colSpan={
                  state.head.filter(col => col.group === data.group).length
                }
              >
                <span
                  contentEditable={mode === 'builder' && true}
                  onBlur={mode === 'builder' && handleGroupRename(idx)}
                >
                  {data.group}
                </span>
              </th>,
            ]
          }
          return [
            ...ths,
            <th
              key={data.key}
              className={dropTargetIdx === idx ? 'th-drop' : ''}
              rowSpan="2"
              draggable={mode === 'builder'}
              onDragStart={() => setDragTargetIdx(idx)}
              onDragEnter={() => setDropTargetIdx(idx)}
              // onDragEnter={handleDragEnter(idx)}
              // onDragLeave={handleDragLeave(idx)}
              onDragEnd={() => {
                setDragEnded(true)
              }}
              // onDragEnd={handleDragEnd(idx)}
            >
              <span
                contentEditable={mode === 'builder' && true}
                onBlur={mode === 'builder' && handleRename(idx)}
              >
                {data.title}
              </span>
              {mode === 'builder' && <ColumnHandle colIdx={idx} />}
            </th>,
          ]
        }, [])}
      </tr>
      <tr>
        {state.head.reduce((ths, data, idx) => {
          if (data.group) {
            return [
              ...ths,
              <th
                key={data.key}
                className={dropTargetIdx === idx ? 'th-drop' : ''}
                draggable={mode === 'builder'}
                onDragStart={() => setDragTargetIdx(idx)}
                onDragEnter={() => setDropTargetIdx(idx)}
                // onDragEnter={handleDragEnter(idx)}
                // onDragLeave={handleDragLeave(idx)}
                onDragEnd={() => {
                  setDragEnded(true)
                }}
                // onDragEnd={handleDragEnd(idx)}
                // onDragStart={() => setDragTargetIdx(idx)}
                // onDragEnter={handleDragEnter(idx)}
                // onDragLeave={handleDragLeave(idx)}
                // onDragEnd={handleDragEnd(idx)}
              >
                <span
                  contentEditable={mode === 'builder' && true}
                  onBlur={mode === 'builder' && handleRename(idx)}
                >
                  {data.title}
                </span>
                {mode === 'builder' && <ColumnHandle colIdx={idx} />}
              </th>,
            ]
          }
          return ths
        }, [])}
      </tr>
    </>
  ) : (
    <tr>
      {mode === 'builder' && <th className="row-handle-th"></th>}
      {state.head.map((data, idx) => (
        <th
          key={data.key}
          draggable={mode === 'builder'}
          onDragEnter={handleDragEnter(idx)}
          onDragLeave={handleDragLeave(idx)}
        >
          <span>{data.title}</span>
          {mode === 'builder' && <ColumnHandle />}
        </th>
      ))}
    </tr>
  )
}

function TableBody({ mode, ...props }) {
  const { state, dispatch } = useContext(GridContext)
  const sections = state.sections

  return (
    sections.length > 0 && (
      <>
        {sections.reduce((rows, section, secIdx) => {
          if (section.title) {
            return [
              ...rows,
              <tr key={section.key} colSpan={state.original.head.length}>
                {mode === 'builder' && <td></td>}
                <td className="oblique">{section.title}</td>
              </tr>,
              ...section.values.map(([rowKey, row], rowIdx) => (
                <tr key={rowKey}>
                  {mode === 'builder' && (
                    <RowHandle position={{ secIdx, rowIdx }} />
                  )}
                  {row.map((value, colIdx) =>
                    CellComponent(state.head[colIdx].component, {
                      key: `${section.key}-${rowKey}-${state.head[colIdx].key}`,
                      title: state.head[colIdx].title,
                      value: value,
                    })
                  )}
                </tr>
              )),
            ]
          }
          return [
            ...rows,
            ...section.values.map(([rowKey, row], rowIdx) => (
              <tr key={rowKey}>
                {mode === 'builder' && (
                  <RowHandle position={{ secIdx, rowIdx }} />
                )}
                {row.map((value, colIdx) =>
                  CellComponent(state.head[colIdx].component, {
                    key: `${section.key}-${rowKey}-${state.head[colIdx].key}`,
                    title: state.head[colIdx].title,
                    value: value,
                  })
                )}
              </tr>
            )),
          ]
        }, [])}
      </>
    )
  )
}

function CellComponent(type, { key, ...props }) {
  switch (type) {
    case 'CheckboxColumn':
      return <CheckboxColumn key={key} position={key.split('-')} {...props} />
    case 'TextColumn':
      return <TextColumn key={key} position={key.split('-')} {...props} />
    default:
      break
  }
}

function CELL_TYPES(type) {
  const types = {
    CheckboxColumn: false,
    TextColumn: '',
  }
  return types[type]
}

function CheckboxColumn({ title, value, position, ...props }) {
  const { state, dispatch } = useContext(GridContext)

  const handleChange = e => {
    const [sectionKey, rowKey, columnKey] = position
    const [secIdx, section] = state.sections.reduce((res, sec, idx) => {
      if (sec.key === sectionKey) {
        return [idx, sec]
      }
      return res
    }, [])
    const [rowIdx, row] = section.values.reduce((res, [key, data], idx) => {
      if (key === rowKey) {
        return [idx, data]
      }
      return res
    }, 0)
    const columnIdx = state.head.reduce((res, col, idx) => {
      if (col.key === columnKey) {
        return res + idx
      }
      return res
    }, 0)
    const value = e.target.checked

    const updatedRowValues = _arrrep(row, columnIdx, value)
    const updatedSectionValues = _arrrep(section.values, rowIdx, [
      rowKey,
      updatedRowValues,
    ])

    dispatch({
      type: 'sections',
      payload: _arrrep(state.sections, secIdx, {
        ...section,
        values: updatedSectionValues,
      }),
    })
  }

  return (
    <td data-th={title}>
      <input
        type="checkbox"
        className="cell-input checkbox"
        defaultChecked={value}
        onChange={handleChange}
        {...props}
      />
    </td>
  )
}

function TextColumn({ title, value, position, ...props }) {
  const { state, dispatch } = useContext(GridContext)

  const handleChange = e => {
    const [sectionKey, rowKey, columnKey] = position
    const [secIdx, section] = state.sections.reduce((res, sec, idx) => {
      if (sec.key === sectionKey) {
        return [idx, sec]
      }
      return res
    }, [])
    const [rowIdx, row] = section.values.reduce((res, [key, data], idx) => {
      if (key === rowKey) {
        return [idx, data]
      }
      return res
    }, 0)
    const columnIdx = state.head.reduce((res, col, idx) => {
      if (col.key === columnKey) {
        return res + idx
      }
      return res
    }, 0)
    const value = e.target.textContent
    if (value === row[columnIdx]) {
      return
    }

    const updatedRowValues = _arrrep(row, columnIdx, value)
    const updatedSectionValues = _arrrep(section.values, rowIdx, [
      rowKey,
      updatedRowValues,
    ])

    dispatch({
      type: 'sections',
      payload: _arrrep(state.sections, secIdx, {
        ...section,
        values: updatedSectionValues,
      }),
    })
  }

  return (
    <td data-th={title}>
      <span
        className="contenteditable-cell"
        contentEditable={true}
        onBlur={handleChange}
      >
        {value}
      </span>
    </td>
  )
}

function RowHandle({ position, ...props }) {
  const { state, dispatch } = useContext(GridContext)
  const { secIdx, rowIdx } = position

  const handleAddRow = pos => e => {
    const rowValues = Array.from(state.head, h => CELL_TYPES(h.component))

    const section = state.sections[secIdx]
    const posIdx = pos === 'bellow' ? rowIdx + 1 : rowIdx
    const updatedSectionValues = _arradd(section.values, posIdx, [
      shortid.generate(),
      rowValues,
    ])

    dispatch({
      type: 'sections',
      payload: _arrrep(state.sections, secIdx, {
        ...section,
        values: updatedSectionValues,
      }),
    })
  }

  const handleAddRowGroup = pos => e => {
    const rowValues = Array.from(state.head, h => CELL_TYPES(h.component))

    const section = {
      key: shortid.generate(),
      title: 'untitled',
      values: [[shortid.generate(), rowValues]],
    }
    const posIdx = pos === 'bellow' ? secIdx + 1 : secIdx

    dispatch({
      type: 'sections',
      payload: _arradd(state.sections, posIdx, section),
    })
  }

  const handleDeleteRow = () => {
    const section = state.sections[secIdx]
    if (section.values.length <= 1) {
      // delete whole group?
      console.log('only one row, what are you trying to do?')
      return
    }
    const updatedSectionValues = _arrdel(section.values, rowIdx)
    dispatch({
      type: 'sections',
      payload: _arrrep(state.sections, secIdx, {
        ...section,
        values: updatedSectionValues,
      }),
    })
  }

  return (
    <td className="row-handle">
      <Dropdown className="btn-text">
        <Button addClass="btn-empty" onClick={handleAddRow('above')}>
          add row above
        </Button>
        <Button addClass="btn-empty" onClick={handleAddRow('bellow')}>
          add row bellow
        </Button>
        <Button addClass="btn-empty" onClick={handleAddRowGroup('above')}>
          add titled group above
        </Button>
        <Button addClass="btn-empty" onClick={handleAddRowGroup('bellow')}>
          add titled group bellow
        </Button>
        <Button addClass="btn-empty danger" onClick={handleDeleteRow}>
          delete row
        </Button>
      </Dropdown>
    </td>
  )
}

// function RowGroupHandle(props) {
//   return (
//     <td className="row-handle">
//       <Dropdown className="btn-text">
//         <Button addClass="btn-empty">add titled group above</Button>
//         <Button addClass="btn-empty">add titled group bellow</Button>
//         <Button addClass="btn-empty danger">delete group</Button>
//       </Dropdown>
//     </td>
//   )
// }

const ColumnAddForm = props => {
  const [state, setState] = useState({
    position: 'right',
    title: '',
    component: 'TextColumn',
    editable: false,
  })

  return (
    <form id="columnAddForm" onSubmit={props.onSubmit(state)}>
      <Select
        label="position"
        name="position"
        onChange={e => setState({ ...state, position: e.target.value })}
        note="left or right of selected column"
      >
        <option value="right">right</option>
        <option value="left">left</option>
      </Select>
      <Input
        name="title"
        label="column title"
        onChange={e => setState({ ...state, title: e.target.value })}
      ></Input>
      <Select
        onChange={e => setState({ ...state, component: e.target.value })}
        name="component"
        label="type"
        note="are you gonna write text or just make checks"
      >
        <option value="TextColumn">text</option>
        <option value="CheckboxColumn">checkbox</option>
      </Select>
      <ToggleToken
        id="editable"
        defaultChecked={state.editable}
        onChange={e => setState({ ...state, editable: !state.editable })}
      >
        editable
      </ToggleToken>
      {props.children}
    </form>
  )
}

const ColumnGroupAddForm = props => {
  const [state, setState] = useState({
    position: 'right',
    title: '',
    columns: [
      {
        title: '',
        component: 'CheckboxColumn',
        editable: false,
        key: shortid.generate(),
      },
    ],
  })

  return (
    <form id="columnGroupAddForm" onSubmit={props.onSubmit(state)}>
      <Input
        name="group title"
        label="group title"
        onChange={e =>
          setState({
            ...state,
            title: e.target.value,
          })
        }
      />
      <Select
        label="position"
        name="position"
        onChange={e => setState({ ...state, position: e.target.value })}
        note="left or right of selected column"
      >
        <option value="right">right</option>
        <option value="left">left</option>
      </Select>
      {state.columns.map((col, colIdx) => (
        <fieldset key={col.key} className="field">
          <div className="row jcb">
            <legend>{colIdx + 1}. column</legend>
            {state.columns.length > 1 && (
              <button
                type="button"
                className="btn-text red ls-1"
                onClick={e =>
                  setState({
                    ...state,
                    columns: _arrdel(state.columns, colIdx),
                  })
                }
              >
                <small>remove</small>
              </button>
            )}
          </div>
          <Input
            name={`${colIdx}-title`}
            label="column title"
            onChange={e =>
              setState({
                ...state,
                columns: _arrrep(state.columns, colIdx, {
                  ...state.columns[colIdx],
                  title: e.target.value,
                }),
              })
            }
            defaultValue={col.title}
          />
          {/* <p className="input-label">type</p>
          <ToggleTokens
            wrapClass="flex my-2"
            type="radio"
            name={`${colIdx}-component`}
            defaultChecked={col.component}
            onChange={e =>
              setState({
                ...state,
                columns: _arrrep(state.columns, colIdx, {
                  ...state.columns[colIdx],
                  component: e.target.value,
                }),
              })
            }>
            {[
              [`TextColumn`, 'text'],
              [`CheckboxColumn`, 'checkbox'],
            ]}
          </ToggleTokens> */}
          <Select
            onChange={e =>
              setState({
                ...state,
                columns: _arrrep(state.columns, colIdx, {
                  ...state.columns[colIdx],
                  component: e.target.value,
                }),
              })
            }
            value={col.component}
            name={`${colIdx}-component`}
            label="type"
            note="are you gonna write text or just make checks"
          >
            <option value="CheckboxColumn">checkbox</option>
            <option value="TextColumn">text</option>
          </Select>
          <ToggleToken
            id={`${colIdx}-editable`}
            defaultChecked={col.editable}
            onChange={e =>
              setState({
                ...state,
                columns: _arrrep(state.columns, colIdx, {
                  ...state.columns[colIdx],
                  editable: !state.editable,
                }),
              })
            }
          >
            editable
          </ToggleToken>
        </fieldset>
      ))}
      <div className="row">
        <button
          type="button"
          className="btn-empty brand ml-auto"
          onClick={e => {
            setState({
              ...state,
              columns: [
                ...state.columns,
                {
                  title: '',
                  component: 'CheckboxColumn',
                  editable: false,
                  key: shortid.generate(),
                },
              ],
            })
          }}
        >
          + add another
        </button>
      </div>
      {props.children}
    </form>
  )
}

function ColumnHandle({ colIdx, ...props }) {
  const { state, dispatch } = useContext(GridContext)
  const Offscreen = useContext(OffscreenContext)

  const handleColumnAddForm = e => {
    Offscreen.dispatch({
      type: 'show',
      payload: (
        <Dialog id="handleColumnAddForm">
          <div className="p-3">
            <ColumnAddForm onSubmit={handleColumnAddSubmit}>
              <hr className="hr1 mt-3" />
              <div className="row jcb mt-3">
                <button
                  type="button"
                  className="btn-empty"
                  onClick={() =>
                    Offscreen.dispatch({
                      type: 'close',
                      payload: 'handleColumnAddForm',
                    })
                  }
                >
                  fuhgeddaboudit
                </button>
                <button type="submit" className="btn brand">
                  add column
                </button>
              </div>
            </ColumnAddForm>
          </div>
        </Dialog>
      ),
    })
  }
  const handleColumnAddSubmit = form => e => {
    e.preventDefault()
    const { position, title, component, editable } = form
    if (!title) {
      Offscreen.dispatch({
        type: 'show',
        payload: (
          <Alert id="noColumnTitle" type="warning">
            Please provide some column title
          </Alert>
        ),
      })
      return
    }
    const posIdx = position === 'right' ? colIdx + 1 : colIdx
    const group = state.head[colIdx].group || null
    const columns = _arradd(state.head, posIdx, {
      key: shortid.generate(),
      title,
      editable,
      component,
      group,
    })
    const sections = state.sections.map(sec => ({
      ...sec,
      values: sec.values.map(([key, data]) => [
        key,
        _arradd(data, posIdx, CELL_TYPES(component)),
      ]),
    }))
    dispatch({ type: 'head', payload: columns })
    dispatch({ type: 'sections', payload: sections })
    Offscreen.dispatch({
      type: 'close',
      payload: 'handleColumnAddForm',
    })
  }

  const handleColumnGroupAddForm = e => {
    Offscreen.dispatch({
      type: 'show',
      payload: (
        <Dialog id="handleColumnGroupAddForm">
          <hr className="hr1 mt-3" />
          <div className="p-3">
            <ColumnGroupAddForm onSubmit={handleColumnGroupAddSubmit}>
              <div className="row jcb mt-3">
                <button
                  type="button"
                  className="btn-empty"
                  onClick={() =>
                    Offscreen.dispatch({
                      type: 'close',
                      payload: 'handleColumnGroupAddForm',
                    })
                  }
                >
                  fuhgeddaboudit
                </button>
                <button type="submit" className="btn brand">
                  add column
                </button>
              </div>
            </ColumnGroupAddForm>
          </div>
        </Dialog>
      ),
    })
  }
  const handleColumnGroupAddSubmit = form => e => {
    e.preventDefault()
    const { position, title, columns } = form
    const titles = [title, ...columns.map(c => c.title)]
    if (titles.some(t => !t)) {
      Offscreen.dispatch({
        type: 'show',
        payload: (
          <Alert id="noColumnTitles" type="warning">
            Please provide titles for group and columns
          </Alert>
        ),
      })
      return
    }
    const posIdx = position === 'right' ? colIdx + 1 : colIdx
    const updatedHead = state.head.reduce((res, col, idx) => {
      if (idx === posIdx) {
        return [
          ...res,
          ...columns.map(column => ({ ...column, group: title })),
          col,
        ]
      }
      return [...res, col]
    }, [])
    const sections = state.sections.map(sec => ({
      ...sec,
      values: sec.values.map(([key, data]) => [
        key,
        data.reduce((agg, val, idx) => {
          if (idx === posIdx) {
            return [
              ...agg,
              ...columns.map(column => CELL_TYPES(column.component)),
              val,
            ]
          }
          return [...agg, val]
        }, []),
      ]),
    }))
    dispatch({ type: 'head', payload: updatedHead })
    dispatch({ type: 'sections', payload: sections })
    Offscreen.dispatch({
      type: 'close',
      payload: 'handleColumnGroupAddForm',
    })
  }

  return (
    <span className="column-handle inline-block ml-2">
      <Dropdown className="btn-text">
        <Button addClass="btn-empty" onClick={handleColumnAddForm}>
          add column
        </Button>
        {!state.head[colIdx].group && (
          <Button addClass="btn-empty" onClick={handleColumnGroupAddForm}>
            add column group
          </Button>
        )}
        <Button addClass="btn-empty danger">delete column</Button>
      </Dropdown>
    </span>
  )
}

function ColumnGroupHandle(props) {
  return (
    <span className="column-handle inline-block ml-2">
      <Dropdown className="btn-text">
        <Button addClass="btn-empty">rename</Button>
        <Button addClass="btn-empty danger">delete group</Button>
      </Dropdown>
    </span>
  )
}
export { DataGrid }

// version detection and data rearrange
// move rows
// keyboard nav
