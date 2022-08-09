import { deleteRequest, getRequest, postRequest, putRequest } from "../axiosApi"

export const getAllMedicineData = () => {
    return getRequest("medicines")
}

export const postMedicineData = (data) => {
    return postRequest("medicines", data)
}

export const deleteMedicineData = (id) => {
    return deleteRequest("medicines", id)
}

export const updateMedicineData = (data) => {
    return putRequest("medicines", data)
}