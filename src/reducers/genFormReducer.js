
export const genFormReducer = (state, action) => {
    switch (action.type) {
        
        case 'CHANGE_INPUT':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
            
        case 'RESET':
            return {...action.payload}

        default:
            return state
    }
}