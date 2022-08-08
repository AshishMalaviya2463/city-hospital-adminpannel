import { sendRequest } from "./apis/axiosApi"

export const getRequest = () => {
    return sendRequest({
        method: 'GET',
        url: 'medicines'
    })
}

export const postRequest = (data) => {
    return sendRequest({
        method: 'POST',
        url: 'medicines',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

export const deleteRequest = (id) => {
    return sendRequest({
        method: 'DELETE',
        url: `medicines/${id}`
    })
}

export const putRequest = (data) => {
    return sendRequest({
        method: 'PUT',
        url: `medicines/${data.id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}