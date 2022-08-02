import *as ActionTypes from "../actions/ationTypes"

const initSate = {
    medicines: [],
    isLoading: false,
    error: ''
}

export const medicineReducer = (state = initSate, action) => {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case ActionTypes.GET_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: action.payload
            }
        case ActionTypes.ADD_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: [...state.medicines, action.payload],
                error: ""
            }
        case ActionTypes.DELETE_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: state.medicines.filter((m) => m.id !== action.payload),
                error: ""
            }
        case ActionTypes.UPDATE_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: state.medicines.filter((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return m;
                    }
                }),
                error: ""
            }
        case ActionTypes.LOADING_MEDICINES:
            return {
                ...state,
                isLoading: true,
            }
        case ActionTypes.ERROR_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: [],
                error: action.payload
            }
        default:
            return state
    }
}
