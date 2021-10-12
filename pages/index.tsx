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
import buttonStyle from '../styles/yearButton.module.css'
import ToggleSwitch from '../component/toggleSwitch';
import styles from '../styles/NavContainer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const url = process.env.NEXT_PUBLIC_URL
const buttonPadding = "100px"

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

    /**
   * 
   * @param e The event object used to handle button output for timeline
   * 
   */
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    setSymbol(input)
    fetcher(input, 20)
  }

  const [symbol, setSymbol] = useState('aapl')
  const [data, setData] = useState([])
  const [input, setInput] = useState('')

  const years = [20, 10, 5, 3, 1]
  const lightBlue = "#87CEEB"
  const darkBlue = "#3700B3"

  const [theme, setTheme] = useState(true);
  const blue = theme ? lightBlue : darkBlue

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

            {/* @ts-ignore */}
            <form onSubmit={handleSubmit} noValidate>
              <input type="search" className="boxShadow" onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)} required />
              <button type="submit" className="fa"> <FontAwesomeIcon icon={faSearch} /> </button>
            </form>
          </div>
          {/* The toggle switch for selecting between light and dark mode */}
          <ToggleSwitch label=" " th={themeToggler} />
        </div>
        <div>
          <DataPoint data={data} theme={theme} />
        </div>
        {/* Creates a set of buttons that set the range of the graph */}
        <div className={styles.container} style={{paddingLeft: `${buttonPadding}`, paddingRight: `${buttonPadding}`, fontSize: "large"}}>
          {years.map((range) => {
            return <button
              className={buttonStyle.yearButton}
              style={{ color: blue }}
              key={range}
              onClick={()=>fetcher(symbol, range)}>
              {range}Y
            </button>
          })}
        </div>
      </main>
    </ThemeProvider>
  )
}
export default App