import React, { useEffect, useReducer, useContext } from 'react'
import shortid from 'shortid'
import {
  formCollection,
  dumbArrayCompare,
  cloneDeep,
  _arradd,
  _arrdel,
  _arrrep,
} from '../utils'
import { Card } from "../components/Card";
import '../styles/Tables.css'
// import { Input } from '../components/Form'
// import { Button, Dropdown } from '../components/Button'

const initialState = {
  original: {
    meta: {
      version: 2,
      perPage: 5,
      sort: null,
    },
    head3: [
      { title: 'Check', key: '97f97w', editable: false, componente: 'TextColumn' },
      { title: 'Method', key: '0dag8a', editable: false, componente: 'TextColumn' },
      { title: 'Yes', key: 'asv8na', editable: true, componente: 'CheckboxColumn', group: 'Result' },
      { title: 'No', key: 'an32rq', editable: true, componente: 'CheckboxColumn', group: 'Result' },
    ],
    headGroups: {
      u1fasi: {
        title: 'Result',
        columns: ['vas0v8', '89rwq8'],
      },
    },
    headDefinition: {
      '692dsf': {
        props: { title: 'Column 1', editable: false },
        component: 'TextColumn',
      },
      '2ds12f': {
        props: { title: 'Column 2', editable: false },
        component: 'TextColumn',
      },
      vas0v8: {
        props: { title: 'A', group: 'u1fasi', editable: true },
        component: 'CheckboxColumn',
      },
      '89rwq8': {
        props: { title: 'B', group: 'u1fasi', editable: true },
        component: 'CheckboxColumn',
      },
    },
    head: {
      '692dsf': {
        props: { title: 'Column 1', editable: false },
        component: 'TextColumn',
      },
      '2ds12f': {
        props: { title: 'Column 2', editable: false },
        component: 'TextColumn',
      },
      u1fasi: {
        props: { title: 'Result' },
        columns: {
          vas0v8: {
            props: { title: 'A', editable: true },
            component: 'CheckboxColumn',
          },
          '89rwq8': {
            props: { title: 'B', editable: true },
            component: 'CheckboxColumn',
          },
        },
      },
    },
    sections: [
      { key: '7d9sad',
        title: null,
        values: [
          [
            '1.1 Svi spojevi i vijci su dobro zategnuti',
            'Ispitati "povlačenjem" žica na spojevima s elementima',
            true,
            false,
          ],
          [
            '1.2 Svi elementi van ploče su ugrađeni',
            'Uvodnice, svjetiljka, grijač, oprema na vratima',
            true,
            false,
          ],
        ],
      },
      {key: '7d99ad',
        title: '2. Električna ispitivanja',
        values: [
          [
            '2.0 Ormar je ohmski ispitan i ožićenje odgovara shemi ',
            'Odraditi ohmsko ispitivanje ohmmetrom',
            true,
            false,
          ],
          [
            '2.1 Ormar je funkcionalno ispitan i radi sukladno dostavljenoj shemi',
            'Ormar spojiti na privremeno napajanje i ispitati njegovu funkcionalnost',
            false,
            true,
          ],
        ],
      },
    ],
  },
  head: [],
  colDefinitions: [],
  colKeys: [],
  sections: [],
  rowKeys: [],
  undo: [],
  redo: [],
  perPage: 5,
  page: 1,
  sort: null,
  filter: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return { ...state, head: action.payload.head, data: action.payload.data }
    case 'head':
      return { ...state, head: action.payload }
    case 'colDefinitions':
      return { ...state, colDefinitions: action.payload }
    case 'colKeys':
      return { ...state, colKeys: action.payload }
    case 'sections':
      return { ...state, data: action.payload }
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

const DataGrid = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const definitions = Object.entries(state.original.head).reduce((keys, [key, data]) => {
      if (data.columns) {
        return [
          ...keys,
          ...Object.entries(data.columns).map(([colKey, colData]) => ([colKey, colData.component]))
        ]
      }
      return [...keys, [key, data.component]]
    }, [])

    dispatch({ type: 'colDefinitions', payload: definitions })
  }, [])

  return (
    <GridContext.Provider value={{ state, dispatch }}>
      <Card className="p-3">
        <table className="table rwd-table">
          {/* <thead><TableHeader head={state.original.head} /></thead> */}
          {/* <tbody><TableBody sections={state.original.sections} /></tbody> */}
        </table>
      </Card>
    </GridContext.Provider>
  )
}

function TableHeader({ head, mode, ...props }) {
  const { state, dispatch } = useContext(GridContext)

  return Object.values(head).some(def => def.columns) ? (
    <>
      <tr>
        {Object.entries(head).reduce((fRow, [key, data]) => {
          if (data.columns) {
            return [
              ...fRow,
              <th key={key} colSpan={Object.keys(data.columns).length}>
                {data.props.title}
              </th>,
            ]
          }
          return [
            ...fRow,
            <th key={key} rowSpan="2">
              {data.props.title}
            </th>,
          ]
        }, [])}
      </tr>
      <tr>
        {Object.entries(head).reduce((fRow, [key, data]) => {
          if (data.columns) {
            return [...fRow, ...Object.entries(data.columns).map(([colKey, colData]) => (
              <th key={colKey}>{colData.props.title}</th>
            ))]
          }
          return fRow
        }, [])}
      </tr>
    </>
  ) : (
    <tr>
      {Object.entries(head).map(([key, data]) => (
        <th key={key}>{data.props.title}</th>
      ))}
    </tr>
  )
}

function TableBody({ sections, mode, ...props }) {
  const { state, dispatch } = useContext(GridContext)

  return (state.colDefinitions.length > 0 &&
    <>{
      Object.entries(sections).reduce((rows, [sectionKey, sectionData], idx) => {
        if (sectionData.title) {
          return [
              ...rows,
              <tr key={sectionKey} colSpan="5">
                <td>{sectionData.title}</td>
              </tr>,
              ...sectionData.values.map(row =>
                  <tr key={sectionKey + idx}>
                    {row.map(
                      (col, colIdx) =>
                        CellComponent(state.colDefinitions[colIdx][1], { title: state.colDefinitions[colIdx][0], value: col})
                    )}
                  </tr>
              )
            ]
          }
          return [
            ...rows,
            ...sectionData.values.map(row =>
                <tr key={sectionKey + idx}>
                  {row.map(
                    (col, colIdx) =>
                      CellComponent(state.colDefinitions[colIdx][1], { title: state.colDefinitions[colIdx][0], value: col})
                  )}
                </tr>
            )
          ]
        }, [])
      }
    </>
  )
}

function CellComponent(type, props) {
  switch (type) {
    case 'CheckboxColumn':
      return <CheckboxColumn {...props} />
    case 'TextColumn':
      return <TextColumn {...props} />
    default:
      break
  }
}

function CheckboxColumn(props) {
  return (
    <td key={props.title} data-th={props.title}>
      <input
        type="checkbox"
        className="cell-input checkbox"
        value={props.value}
        name="dt-input"
      />
    </td>
  )
}

function TextColumn(props) {
  return (
    <td key={props.title} data-th={props.title}>
      <div
        className="contenteditable-cell"
        data-name="dt-input"
        contentEditable={true}
      >
        {props.value}
      </div>
    </td>
  )
}

// function flattenToEntries(object, key, init = []) {
//   return Object.entries(object).reduce((res, [key, data]) => {
//     if (data[]) {

//     }
//   }, init)
// }

// function cellLookup(head, key) {
//   return Object.values(head).some(def => def.columns)
//     ? Object.entries(head).reduce((col, [key, data]) => {
//       if (Object.keys(col).length > 0) {
//         return col
//       }
//       if (data.columns) {
//         const
//       }
//     }, {})
// }

export { DataGrid }