import React, { Suspense, lazy } from 'react'
import { FSLoading } from '../components/FullScreen'
import { DataGrid } from '../components/DataGrid'
// import DataTable from '../components/DataTable'
const DataTable = lazy(() => import('../components/DataTable'))

const Tables = () => {
  const handleCollect = data => {
    console.log(data)
  }
  const data = {
    head: ['A', 'B', 'C'],
    data: [
      ['1. red', '2. columna', '3. reda radi'],
      ['2. red', '2. kolumna', 'bo'],
      ['3. red', 'Dolor', 'sit amet'],
      ['4. red', 'Ide', 'jos nes'],
      ['5. red', 'Nisam', 'dobro'],
      ['6. red', 'Naucio', 'latinski'],
      ['7. red', 'Jebga', ''],
    ],
  }

  return (
    <Suspense fallback={<FSLoading />}>
      <section className="p-3">
        <DataTable data={data} editable={true} savecb={handleCollect} />
        <hr className="my-4 hr-rainbow" />
        <DataGrid mode="builder" />
      </section>
    </Suspense>
  )
}

export default Tables
