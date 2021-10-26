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
import { createStore } from 'redux'
import { rootReducer } from '../component/redux/index'
import { Provider } from 'react-redux'

const store = createStore(rootReducer)

function MyApp({ Component, pageProps }: AppProps) {


  return (<>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>)
}
export default MyApp
