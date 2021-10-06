import React, { useEffect, useState } from 'react'
import DataPoint from './component/dataPoint'

const url = 'https://stock-app-backend.ankurahir.repl.co/api/stocks/query?symbol=aapl'

function App() {

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
  }, [])


  const [data, setData] = useState([])

  return (
    <main className='App'>
      <div>
        <DataPoint data={data} />
      </div>
    </main>
  )
}
export default App