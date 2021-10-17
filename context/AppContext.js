import { useState, createContext } from "react"

export const AppContext = createContext()

const AppWrapper = ({ children }) => {
 const [theme, setTheme] = useState(true)
 const [data, setData] = useState([])
 const store = {
   theme: [theme, setTheme],
   data: [data, setData] 
 }
 return (
   <AppContext.Provider value={store}>
      { children }
   </AppContext.Provider>
 )
}

export default AppWrapper