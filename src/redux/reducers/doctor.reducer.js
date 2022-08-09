import *as ActionTypes from "../actions/ationTypes"

const initSate = {
    doctor: [],
    isLoading: false,
    error: ''
}

export const doctorReducer = (state = initSate, action) => {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case ActionTypes.GET_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: action.payload
            }
        case ActionTypes.ADD_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: [...state.doctor, action.payload],
                error: ""
            }
        case ActionTypes.DELETE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.filter((m) => m.id !== action.payload),
                error: ""
            }
        case ActionTypes.UPDATE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return m;
                    }
                }),
                error: ""
            }
        case ActionTypes.LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case ActionTypes.ERROR:
            return {
                ...state,
                isLoading: false,
                doctor: [],
                error: action.payload
            }
        default:
            return state
    }
}
