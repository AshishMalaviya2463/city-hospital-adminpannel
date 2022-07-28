import { combineReducers } from "redux"
import { medicineReducer } from "./mdicine.reducer"

export const rootReducer = combineReducers({
    medicineState: medicineReducer,
})