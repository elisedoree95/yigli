import { ACTIONS } from "../constants/reducerActions";

export const formReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_INPUT:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case ACTIONS.CHANGE_ARRAY:
            return {
                ...state,
                [action.payload.name]: [...action.payload.trueValue]
            }
        case ACTIONS.RESET:
            return {...action.payload}
    
        default:
            return state
    }
}