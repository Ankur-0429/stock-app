import React, { CSSProperties, useState } from 'react'
import DataPoint from './component/dataPoint'

const url = 'http://localhost:5000/api/stocks/query/?symbol='
const period = 'd'

const inputStyle:CSSProperties = {
  padding: '10px',
  marginLeft: '10px',
  marginTop: '10px',
  border: '0',
  boxShadow : '0 0 15px 4px rgba(0,0,0,0.06)'
}

function App() {

  const fetcher = (symbol) => {
    fetch(url+symbol+"&period="+period)
      .then(res => res.json())
      .then(data => setData(data))
  }
  const [data, setData] = useState([])
    
  return (
    <main className='App'>
      <form>
        <input onChange={(e)=> fetcher(e.target.value)} style={inputStyle} />
      </form>
      <div>
        <DataPoint data={data} />
      </div>
    </main>
  )
}
export default App