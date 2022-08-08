import axios from "axios";
import { baseURL } from "../../redux/actions/baseURL";

const instance = axios.create({
    baseURL: baseURL,
    timeout: 2000
});

export const sendRequest = (config) => {
    return instance.request(config)
}

