import React, { useEffect, useReducer, useContext } from 'react'
import shortid from 'shortid'
import { formCollection, dumbArrayCompare, cloneDeep, _arradd, _arrdel, _arrrep } from '../utils'
import { DialogContext, closeDialog } from '../components/Dialog'
import { Input } from '../components/Form'
import { Button, Dropdown } from '../components/Button'
import { ContextMenuContext } from '../components/ContextMenu'
import { AlertContext } from '../components/Alert'

// dodati i opciju da se sakrije odredjena kolumna, recimo id
// - zapravo bi u slucaju da ne postoji id mi mogli umetati nase keyeve na poziciju 0
// - if (!idPosition) row = [shortid, ...data.row]
// - render <Row key={data[0]} />

// dodati mogucnost da se head dobije iz json keyeva, da korisnik ne mora odvajati
// navigacija tipkovnicom

const initialState = {
  head: [],
  data: [],
  rowKeys: [],
  colKeys: [],
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
    case 'data':
      return { ...state, data: action.payload }
    case 'keys':
      return {
        ...state,
        rowKeys: action.payload.rowKeys ? action.payload.rowKeys : state.rowKeys,
        colKeys: action.payload.colKeys ? action.payload.colKeys : state.colKeys,
      }
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

const DataTable = ({ data, editable, savecb }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const Dialog = useContext(DialogContext)
  const Alert = useContext(AlertContext)
  const ContextMenu = useContext(ContextMenuContext)

  useEffect(() => {
    const set = cloneDeep(data)
    initialKeys(set)
    dispatch({
      type: 'init',
      payload: set,
    })
  }, [data])

  const updateRowKeys = pos => (addOrDel = 'add') => {
    dispatch({
      type: 'keys',
      payload: {
        rowKeys: addOrDel === 'add' ? _arradd(state.rowKeys, pos, shortid.generate()) : _arrdel(state.rowKeys, pos),
      },
    })
  }

  const updateColKeys = pos => (addOrDel = 'add') => {
    dispatch({
      type: 'keys',
      payload: {
        colKeys: addOrDel === 'add' ? _arradd(state.colKeys, pos, shortid.generate()) : _arrdel(state.colKeys, pos),
      },
    })
  }

  const initialKeys = data => {
    const rowKeys = data.data.map(_ => shortid.generate())
    const colKeys = data.head.map(_ => shortid.generate())
    dispatch({ type: 'keys', payload: { rowKeys, colKeys } })
  }

  const handleCellChange = ridx => cidx => e => {
    const updatedData = state.data.reduce((agg, curr, idx) => {
      if (idx === ridx) {
        const rowToUpdate = [...curr].map((c, i) => (i === cidx ? e.target.value : c))
        return [...agg, rowToUpdate]
      }
      return [...agg, curr]
    }, [])
    dispatch({ type: 'data', payload: updatedData })
  }

  const handleAddRow = (idx, pos = 'bellow') => e => {
    // clear filter so row can be shown in the table
    dispatch({ type: 'filter', payload: '' })
    // create row based on head length
    const row = Array.from(state.head, _ => '...')
    // real index based on position we are adding
    const posIdx = pos === 'bellow' ? idx + 1 : idx
    // save current state for undo
    updateUndo({ idx: posIdx, action: 'del', loc: 'row' })
    // add key before changing data
    updateRowKeys(posIdx)('add')
    // commit new state
    dispatch({ type: 'data', payload: _arradd(state.data, posIdx, row) })

    // change page if neccessary. row can appear on different page
    const startIdx = (state.page - 1) * state.perPage
    const stopIdx = startIdx + state.perPage - 1

    if (posIdx >= startIdx && posIdx <= stopIdx) {
      return
    }

    const page = Math.ceil((posIdx + 1) / state.perPage)
    dispatch({ type: 'page', payload: page })
  }

  const handleAddCol = (idx, pos = 'right') => e => {
    // real index based on position we are adding
    const posIdx = pos === 'right' ? idx + 1 : idx
    // save current state for undo
    updateUndo({ idx: posIdx, action: 'del', loc: 'col' })
    // add key before changing data
    updateColKeys(posIdx)('add')
    // commit new state
    dispatch({
      type: 'init',
      payload: {
        head: _arradd(state.head, posIdx, 'title...'),
        data: state.data.map(row => _arradd(row, posIdx, '...')),
      },
    })
  }

  const handleDeleteRow = idx => e => {
    // don't allow deleting last row. we could allow this but than should add table global actions
    if (state.data.length === 1) {
      Alert.dispatch({
        type: 'show',
        payload: { msg: <p>You can't delete last row. Please modify values if you wish so.</p>, type: 'info' },
      })
      return
    }
    // save current state for undo
    updateUndo({ idx, action: 'add', loc: 'row' })
    // delete unneccessary key before changing data
    updateRowKeys(idx)('del')
    // commit new state
    dispatch({ type: 'data', payload: _arrdel(state.data, idx) })
  }

  const handleDeleteCol = idx => e => {
    // don't allow deleting last column. we could allow this but than should add table global actions
    if (state.head.length === 1) {
      Alert.dispatch({
        type: 'show',
        payload: { msg: <p>You can't delete last column. Please modify it's title if you wish so.</p>, type: 'info' },
      })
      return
    }
    // save current state for undo
    updateUndo({ idx, action: 'add', loc: 'col' })
    // delete unneccessary key before changing data
    updateColKeys(idx)('del')
    // commit new state
    dispatch({
      type: 'init',
      payload: { head: _arrdel(state.head, idx), data: state.data.map(row => _arrdel(row, idx)) },
    })
  }

  const updateUndo = key => {
    // if undo first step exists
    if (state.undo.length !== 0) {
      // check if data is same, so there are no same states in steps
      if (dumbArrayCompare(state.undo[0].data)(state.data) && dumbArrayCompare(state.undo[0].head)(state.head)) {
        return
      }
    }
    // update undo with current state
    dispatch({
      type: 'undo',
      payload: { head: [...state.head], data: cloneDeep(state.data), key: key.idx ? key : null },
    })
  }

  const applyUndo = e => {
    // nothing to undo?
    if (!state.undo[0]) {
      return
    }
    // LIFO
    const target = state.undo[0]
    // move current state to redo list. when we undo state, we want to able to redo it
    dispatch({ type: 'redo', payload: { head: [...state.head], data: cloneDeep(state.data), key: target.key } })
    // add/del missing key
    if (target.key) {
      target.key.loc === 'col'
        ? updateColKeys(target.key.idx)(target.key.action)
        : updateRowKeys(target.key.idx)(target.key.action)
    }
    // apply undo state
    dispatch({ type: 'init', payload: { head: target.head, data: target.data } })
    // remove applyed undo from undo list
    dispatch({ type: 'undoApplyed' })
  }

  const applyRedo = e => {
    // nothing to redo?
    if (!state.redo[0]) {
      return
    }
    // LIFO
    const target = state.redo[0]
    // move current state to undo list
    dispatch({ type: 'undo', payload: { head: [...state.head], data: cloneDeep(state.data), key: target.key } })
    // add/del missing key
    if (target.key) {
      target.key.loc === 'col'
        ? updateColKeys(target.key.idx)(target.key.action === 'add' ? 'del' : 'add')
        : updateRowKeys(target.key.idx)(target.key.action === 'add' ? 'del' : 'add')
    }
    // apply redo state
    dispatch({ type: 'init', payload: { head: target.head, data: target.data } })
    // remove applyed redo from redo list
    dispatch({ type: 'redoApplyed' })
  }
  // sort by name clicking on table header
  const handleSort = col => e => {
    const direction = state.sort === 'desc' ? 'asc' : 'desc'
    // update sort state
    dispatch({ type: 'sort', payload: direction })
    // sort actual state data
    const sorted = state.data.sort((r1, r2) => {
      const col1 = r1[col]
      const col2 = r2[col]
      if (typeof col1 === 'object' || typeof col2 === 'object') {
        return 0
      }
      if (col1.toUpperCase() < col2.toUpperCase()) {
        return direction === 'desc' ? -1 : 1
      }
      if (col1.toUpperCase() > col2.toUpperCase()) {
        return direction === 'desc' ? 1 : -1
      }
      return 0
    })
    // commit sorted data
    dispatch({ type: 'data', payload: sorted })
  }
  // on commiting title change form in dialog
  const handeTitleChange = idx => e => {
    e.preventDefault()
    // value to change to
    const { column } = formCollection(e.target)
    // have to have some value
    if (!column) {
      Alert.dispatch({ type: 'show', payload: { msg: <p>Please enter some name</p>, type: 'warning' } })
      return
    }
    // commit replaced
    dispatch({ type: 'head', payload: _arrrep(state.head, idx, column) })
    // close dialog
    closeDialog(Dialog)
  }
  // just show dialog with form
  const handleRenameHeaderDialog = idx => e => {
    Dialog.dispatch({ type: 'show', payload: <RenameHeaderDialog onSubmit={handeTitleChange(idx)} /> })
  }
  // context menu for header
  const handleHeaderMenu = idx => e => {
    e.preventDefault()
    ContextMenu.dispatch({
      type: 'show',
      payload: {
        target: { x: e.clientX, y: e.clientY },
        content: (
          <>
            <button className="btn-empty" type="button" onClick={handleRenameHeaderDialog(idx)}>
              Rename
            </button>
            <button className="btn-empty" type="button" onClick={handleAddCol(idx)}>
              Add right
            </button>
            <button className="btn-empty" type="button" onClick={handleAddCol(idx, 'left')}>
              Add left
            </button>
            <button className="btn-empty danger" type="button" onClick={handleDeleteCol(idx)}>
              Delete
            </button>
          </>
        ),
        countChildren: 4,
      },
    })
  }
  // filter cell values
  const handleSearchFilter = e => {
    dispatch({ type: 'filter', payload: e.target.value })
  }
  // handle pagination
  const handlePageFlip = page => e => {
    dispatch({ type: 'page', payload: page })
  }
  // handle number of rows shown per page
  const handlePerPageChange = e => {
    dispatch({ type: 'perPage', payload: Number(e.target.value) })
  }
  // handle prop callback for saving data. callback is defined in component prop. we pass state data as argument
  const handleSave = () => savecb.call(null, [{ head: state.head, data: state.data }])

  return (
    <section>
      <div className="flex aic">
        {/* undo/redo */}
        {editable && (
          <div className="flex">
            <button
              className="btn-empty"
              type="button"
              title="Undo"
              aria-label="Undo"
              {...{ [state.undo.length === 0 ? 'disabled' : 'rel']: 'disabled' }}
              onClick={applyUndo}
            >
              {String.fromCharCode(8634)}
            </button>
            <button
              className="btn-empty"
              type="button"
              title="Redo"
              aria-label="Redo"
              {...{ [state.redo.length === 0 ? 'disabled' : 'rel']: 'disabled' }}
              onClick={applyRedo}
            >
              {String.fromCharCode(8635)}
            </button>
            <button className="btn-empty info" type="button" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
        {/* search */}
        <div className="flex aic ml-auto my-2 mr-2">
          <label htmlFor="search-table" className="pr-2">
            Search:
          </label>
          <input id="search-table" type="text" className="input" value={state.filter} onChange={handleSearchFilter} />
        </div>
      </div>
      <table className="table dt-table">
        <thead>
          <tr>
            {editable && <th className="handle" />}
            {state.head.map((c, idx) => (
              <th
                key={state.colKeys[idx]}
                className="dt-headings"
                onClick={handleSort(idx)}
                onContextMenu={editable ? handleHeaderMenu(idx) : undefined}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.data
            .filter(r =>
              r
                .join('')
                .toUpperCase()
                .includes(state.filter.toUpperCase())
            )
            .slice(state.perPage * state.page - state.perPage, state.perPage * state.page)
            .map((row, ridx) => {
              // adjust index value considering page slices
              const idxPageDiff = ridx + state.perPage * state.page - state.perPage
              // actual row key
              const baseKey = state.rowKeys[idxPageDiff]
              return (
                <tr key={baseKey}>
                  {editable && (
                    <td key={`handle-${baseKey}`} className="handle">
                      <Dropdown id={`manage-row-${baseKey}`} key={`manage-row-${baseKey}`} className="btn-text">
                        <Button addClass="btn-empty" onClick={handleAddRow(idxPageDiff, 'above')}>
                          Add above
                        </Button>
                        <Button addClass="btn-empty" onClick={handleAddRow(idxPageDiff, 'bellow')}>
                          Add bellow
                        </Button>
                        <Button addClass="btn-empty danger" onClick={handleDeleteRow(idxPageDiff)}>
                          Delete
                        </Button>
                      </Dropdown>
                    </td>
                  )}
                  {row.map((c, cidx) => (
                    <td key={`${baseKey}${state.colKeys[cidx]}`} className="dt-cell">
                      {editable && typeof c !== 'object' ? (
                        <input
                          className="dt-input"
                          value={c}
                          onChange={handleCellChange(idxPageDiff)(cidx)}
                          onFocus={updateUndo}
                        />
                      ) : (
                        c
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div className="flex">
        <div id="pagination" className="flex aic ml-auto">
          <div className="flex">
            <label htmlFor="search-table" className="pr-2" style={{ whiteSpace: 'nowrap' }}>
              Per page:
            </label>
            <select id="select-per-page" className="input" onChange={handlePerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <button className="btn-empty brand" onClick={(state.page > 1 && handlePageFlip(state.page - 1)) || null}>
            {'<'}
          </button>
          {/* state.data.length bi trebao biti ovaj filtrirani */}
          {Array.from(Array(Math.ceil(state.data.length / state.perPage)), (_, idx) => idx + 1).map(num => (
            <button key={num + '-page'} className="btn-empty brand" onClick={handlePageFlip(num)}>
              {num}
            </button>
          ))}
          <button
            className="btn-empty brand"
            onClick={
              (state.page < Math.ceil(state.data.length / state.perPage) && handlePageFlip(state.page + 1)) || null
            }
          >
            {'>'}
          </button>
        </div>
      </div>
    </section>
  )
}

const RenameHeaderDialog = props => (
  <form id="change-column-title" className="p-3" onSubmit={props.onSubmit}>
    <Input id="column-title-input" name="column" label="Enter column title" />
    <button type="submit" className="btn success">
      Save
    </button>
  </form>
)

export default DataTable
