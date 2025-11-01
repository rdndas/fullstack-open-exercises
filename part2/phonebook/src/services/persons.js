import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getObj = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const createObj = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const deleteObj = (id) => {
    return axios.delete(`${baseUrl}/${id}`);

}

const updateObj = (id,updateObj) => {
    const request = axios.put(`${baseUrl}/${id}`,updateObj);
    return request.then((response) => response.data)
}

export default { getObj, createObj, deleteObj, updateObj}