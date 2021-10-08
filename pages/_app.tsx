import '../styles/globals.css'
import '../styles/ToggleSwitch.module.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  
  
  return (
    <Component {...pageProps} />
  )
}
export default MyApp
