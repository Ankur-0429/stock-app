const themeReducer = (state=true, action) => {
    switch(action.type) {
        case 'SWITCH':
            return !state
        default:
            return state
    }
}

export default themeReducer