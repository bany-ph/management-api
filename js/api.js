import axios from "axios";

const MAIN_URL = "http://localhost:3001/users"


const generateID = () =>{
    return Date.now() + Math.random();
}


const getData = () => { return axios.get(MAIN_URL)}


const getDataUser = (id) => { return axios.get(`${MAIN_URL}?id=${id}`)}

const addData = (newData) => {axios.post(MAIN_URL, {
    id: generateID,
    name: newData.name,
    email: newData.email
})}

const updateData = (id, newData) => {axios.put(`${MAIN_URL}?id=${id}`, newData)}  

const deleteData = (id) => {axios.delete(`${MAIN_URL}?id=${id}`)}



export{
    MAIN_URL,
    getData,
    getDataUser,
    addData,
    updateData,
    deleteData
}

