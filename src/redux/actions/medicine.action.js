import *as ActionTypes from "./ationTypes"
import { baseURL } from './baseURL'

export const getMedicines = () => (dispatch) => {
    try {

        dispatch(loadingMedicines())

        setTimeout(() => {
            fetch(baseURL + 'medicines')
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('OOPS ! Something Went Wrong : Error ' + response.status + ' ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then((response) => response.json())
                .then((data) => dispatch({ type: ActionTypes.GET_MEDICINES, payload: data }))
                .catch(error => dispatch(errorMedicines(error.message)));
        }, 1000)
    } catch (error) {
        console.log(error);
    }
}

export const loadingMedicines = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_MEDICINES })
}

export const errorMedicines = (data) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_MEDICINES, payload: data })
}