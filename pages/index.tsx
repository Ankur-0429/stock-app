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
import { fetcher } from './api/yahoo';


/**
 * This is the driver function that locates where our chart, buttons, and input is.
 * 
 * 
 */
function App() {
  // Gets the symbol the price range from the specified year from our backend

  /**
   * 
   * @param e The event object used to handle button output for timeline
   * 
   */
  async function handleSubmit(e: Event) {
    e.preventDefault()
    setSymbol(input)
    let temp = await fetcher(input, 20)
    setData(temp)
  }

  const [symbol, setSymbol] = useState('aapl')
  const [input, setInput] = useState('')
  const [data, setData] = useState('')

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
      <div className={styles.container}>
        <div>
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

      <main className='App'>
        <div>
          <DataPoint data={data} setData={setData} theme={theme} symbol={symbol} />
        </div>
      </main>
    </ThemeProvider>
  )
}
export default App