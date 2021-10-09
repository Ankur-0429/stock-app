/**
 *  # _app.tsx
 *  This is the main file that operates our webpage
 *  
 *  ## Authors
 *  - Ankur Ahir
 *  - Albert Lee
 * 
 */

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  
  
  return (
    <Component {...pageProps} />
  )
}
export default MyApp
