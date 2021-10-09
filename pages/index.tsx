import React, { CSSProperties, useState } from 'react'
import DataPoint from '../component/dataPoint'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../component/globalStyles";
import { lightTheme, darkTheme } from "../component/theme"
import ToggleSwitch from '../component/ToggleSwitch';
import styles from '../styles/NavContainer.module.css'

const url = 'https://backend.ankurahir.repl.co/api/stocks/'

const inputStyle: CSSProperties = {
  marginTop: '10px',
  padding: '5px',
  boxShadow: '0 0 15px 4px rgba(0,0,0,0.06)'
}

const container: CSSProperties = {
  marginLeft: '10px',
}

let arr = []
function App() {

  const fetcher = (symbol, year) => {
    fetch(url + year + "/query?symbol=" + symbol)
      .then(res => res.json())
      .then(data => { setData(data); arr = [...data] })
  }

  const [symbol, setSymbol] = useState('aapl')
  const [data, setData] = useState([])

  const years = [100,50,20,10,5,3,1]

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
          <div style={container}>
            <form>
              <input onChange={(e) => {
                setSymbol(e.target.value); fetcher(e.target.value, 20) 
              }} style={inputStyle} />
            </form>
            <div>
              {years.map((e)=>{
                return <button key={e} onClick={()=>fetcher(symbol, e)}>{e}Y</button>
              })}
            </div>
          </div>

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