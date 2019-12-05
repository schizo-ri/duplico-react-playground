import React from 'react'
import '../styles/NotFound.css'

const FSDry = props => <div className="fs center fade-in">{props.children}</div>

const FSLoading = props => (
  <FSDry>
    <>
      <h1 className="muted">Loading...</h1>
      {props.children}
    </>
  </FSDry>
)

export { FSDry, FSLoading }
