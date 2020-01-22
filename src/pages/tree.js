import React, { useState } from 'react'
// import { ToggleToken, ToggleTokens, Input, Select, Switch } from '../components/Form'
import nodes from './tree-object'

const Tree = props => {
  return <div>{JSON.stringify(nodes)}</div>
}

export default Tree
