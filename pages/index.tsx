/**
 *  # index.tsx
 *  This is driver file to define where our chart and inputs are
 *  
 *  ## Authors
 *  - Ankur Ahir
 *  - Albert Lee
 * 
 */


import React, { CSSProperties, useState } from 'react'
import DataPoint from '../component/dataPoint'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../component/globalStyles";
import { lightTheme, darkTheme } from "../component/theme"
import ToggleSwitch from '../component/ToggleSwitch';
import styles from '../styles/NavContainer.module.css'

const url = 'http://localhost:5000/api/stocks/'

const inputStyle: CSSProperties = {
  marginTop: '10px',
  padding: '5px',
  boxShadow: '0 0 15px 4px rgba(0,0,0,0.06)'
}

const container: CSSProperties = {
  marginLeft: '10px',
}



/**
 * This is the driver function that locates where our chart, buttons, and input is.
 * 
 * 
 */
function App() {
  // Gets the symbol the price range from the specified year from our backend
  
  /**
   * 
   * @param symbol The stock ticker we want to input the display on the chart
   * @param year The range we want to define for the chart
   * @event res Sends a query to our backend to request the data we want
   * 
   */
  const fetcher = (symbol, year) => {
    fetch(url + year + "/query?symbol=" + symbol)
      .then(res => res.json())
      .then(data => { setData(data); })
  }

  const [symbol, setSymbol] = useState('aapl')
  const [data, setData] = useState([])

  const years = [100,50,20,10,5,3,1]

  // if (data !== []) {
  //   currentYear = parseInt(data[data.length-1].date.substring(0,10))
  // }

  const [theme, setTheme] = useState(true);

  /**
   * 
   * @param theme Sets the theme we want to use for our webpage
   * 
   */
  const themeToggler = () => {
    setTheme(!theme)
  }

  return (
    // Selects between light and dark themes based on a slider button
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <GlobalStyles />
      
      <main className='App'>
        <div className={styles.container}>
          <div style={container}>
            {/* Input the stock ticker to the graph and the year range*/}
            <form>
              <input onChange={(ticker) => {
                setSymbol(ticker.target.value); fetcher(ticker.target.value, 20) 
              }} style={inputStyle} />
            </form>

            {/* Creates a set of buttons that set the range of the graph */}
            <div>
              {years.map((range)=>{
                return <button key={range} onClick={()=>fetcher(symbol, range)}>{range}Y</button>
              })}
            </div>

          </div>
          {/* The toggle switch for selecting between light and dark mode */}
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