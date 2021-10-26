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
import { useSelector } from 'react-redux';

import ToggleSwitch from '../component/toggleSwitch';
import styles from '../styles/NavContainer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useWindowWidth } from '@react-hook/window-size'



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

  // @ts-ignore
  const theme = useSelector(state=>state.swapTheme)

  const onlyWidth = useWindowWidth()
  const [ifMobile, setIfMobile] = useState(onlyWidth < 768)
  useEffect(()=>{
    setIfMobile(onlyWidth < 768)
  })

  const [symbol, setSymbol] = useState('')
  const [input, setInput] = useState("")
  // Set these two values with useContext

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
          <ToggleSwitch />
        </div>
        <div style={{ height: ifMobile ? "45vh" : "85vh" }}>
          <DataPoint symbol={symbol} />
        </div>
        {/* {symbols.map((s) => {
           return <DataPoint symbol={s} theme={theme} />
         })} */}
      </main>
    </ThemeProvider>
  )
}
export default App