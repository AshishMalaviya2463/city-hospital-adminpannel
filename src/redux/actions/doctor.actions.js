import * as ActionTypes from "./ationTypes"
import { getAllDoctorsData, updateDoctorData, deleteDoctorData, postDoctorData } from '../../common/apis/doctor.api'

export const getDoctors = () => (dispatch) => {
    dispatch(loadingDoctors);

    setTimeout(() => {
        getAllDoctorsData()
            .then((data) => dispatch({ type: ActionTypes.GET_DOCTOR, payload: data.data }))
            .catch(error => dispatch(errorDoctors(error.message)));
    }, 2000)
}

export const addDoctor = (data) => (dispatch) => {
    try {
        postDoctorData(data)
            .then((data) => dispatch({ type: ActionTypes.ADD_DOCTOR, payload: data.data }))
            .catch(error => dispatch(errorDoctors(error.message)));
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const deleteDoctor = (id) => (dispatch) => {
    try {
        deleteDoctorData(id)
            .then(dispatch({ type: ActionTypes.DELETE_DOCTOR, payload: id }))
            .catch(error => dispatch(errorDoctors(error.message)));
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const updateDoctor = (data) => (dispatch) => {
    try {
        updateDoctorData(data)
            .then((data) => dispatch({ type: ActionTypes.UPDATE_DOCTOR, payload: data.data }))
            .catch(error => dispatch(errorDoctors(error.message)));
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const loadingDoctors = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING })
}

export const errorDoctors = (data) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR, payload: data })
}