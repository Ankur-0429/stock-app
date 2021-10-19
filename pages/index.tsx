/**
 *  # index.tsx
 *  This is driver file to define where our chart and inputs are
 *  
 *  ## Authors
 *  - Ankur Ahir
 *  - Albert Lee
 * 
 */


import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import DataPoint from '../component/dataPoint'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../component/globalStyles";
import { lightTheme, darkTheme } from "../component/theme"

import ToggleSwitch from '../component/toggleSwitch';
import styles from '../styles/NavContainer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



//  const symbols = ['aapl', 'tsla', 'aa', 'a', 'msft']

const container: CSSProperties = {
  marginLeft: '10px',
}

/**
 * This is the driver function that locates where our chart, buttons, and input is.
 * 
 * 
 */
function App() {
  /**
   * 
   * @param symbol The stock ticker we want to input the display on the chart
   * @param year The range we want to define for the chart
   * @event res Sends a query to our backend to request the data we want
   * 
   */

  /**
 * 
 * @param e The event object used to handle button output for timeline
 * 
 */
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    setSymbol(input)
  }

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  let isMobile: boolean = (width <= 768);


  const [symbol, setSymbol] = useState('')
  const [input, setInput] = useState("")
  const [theme, setTheme] = useState(true)
  // Set these two values with useContext

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
        <div style={{ height: isMobile ? "45vh" : "85vh" }}>
          <DataPoint symbol={symbol} theme={theme} />
        </div>
        {/* {symbols.map((s) => {
           return <DataPoint symbol={s} theme={theme} />
         })} */}
      </main>
    </ThemeProvider>
  )
}
export default App