
export const editFormReducer = (state, action) => {
    switch (action.type) {

        case 'CHANGE_INPUT':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }

        case 'CHANGE_ARRAY':
            return {
                ...state,
                [action.payload.name]: [...action.payload.trueValue]
            }


        default:
            return state
    }
}