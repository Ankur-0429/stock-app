import themeReducer from './reducer/index'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    swapTheme: themeReducer
})