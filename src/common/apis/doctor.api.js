import { deleteRequest, getRequest, postRequest, putRequest } from "../axiosApi"

export const getAllDoctorsData = () => {
    return getRequest("doctors")
}

export const postDoctorData = (data) => {
    return postRequest("doctors", data)
}

export const deleteDoctorData = (id) => {
    return deleteRequest("doctors", id)
}

export const updateDoctorData = (data) => {
    return putRequest("doctors", data)
}