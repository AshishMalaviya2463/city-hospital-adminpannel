import { combineReducers } from "redux"
import { doctorReducer } from "./doctor.reducer"
import { medicineReducer } from "./mdicine.reducer"

export const rootReducer = combineReducers({
    medicineState: medicineReducer,
    doctorState: doctorReducer
})