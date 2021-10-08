import React, { CSSProperties, useState } from 'react'
import DataPoint from './component/dataPoint'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./component/globalStyles";
import { lightTheme, darkTheme } from "./theme"
import ToggleSwitch from './component/ToggleSwitch';
import styles from '../styles/NavContainer.module.css'

const url = 'http://localhost:5000/api/stocks/query/?symbol='

const inputStyle: CSSProperties = {
  padding: '10px',
  marginLeft: '10px',
  marginTop: '10px',
  border: '1px solid black',
  boxShadow: '0 0 15px 4px rgba(0,0,0,0.06)'
}

let arr = []
function App() {

  const fetcher = (symbol, period) => {
    fetch(url + symbol + "&period=" + period)
      .then(res => res.json())
      .then(data => { setData(data); arr = [...data] })
  }

  const timeSet = (yearDiff: number) => {
    setData(arr.filter((e) => currentYear - parseInt(e.date.substring(0, 4)) <= yearDiff))
  }

  const [symbol, setSymbol] = useState('aapl')
  const [period, setPeriod] = useState('m')
  const [data, setData] = useState([])

  var currentYear: number = 2021

  // if (data !== []) {
  //   currentYear = parseInt(data[data.length-1].date.substring(0,10))
  // }

  const [theme, setTheme] = useState(true);
  const themeToggler = () => {
    setTheme(!theme)
  }


  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <GlobalStyles />
      <main className='App'>
        <div className={styles.container}>
          <form>
            <input onChange={(e) => { setSymbol(e.target.value); fetcher(e.target.value, period) }} style={inputStyle} />
          </form>

          <button onClick={() => { timeSet(5) }}>5 year</button>
          <button onClick={() => { timeSet(3) }}>3 year</button>
          <button onClick={() => { timeSet(1) }}>1 year</button>
          <ToggleSwitch label=" " th={themeToggler} />
        </div>
        <div>
          <DataPoint data={data} theme={theme} />
        </div>
      </main>
    </ThemeProvider>
  )
}
export default App