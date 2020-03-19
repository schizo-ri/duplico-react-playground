import React from 'react'

const Card = ({ children, className = '', ...props }) => {
  const clsn = `shadow-lg bg-white rounded p-3 ${className}`
  return <div className={clsn}>{children}</div>
}

export { Card }
