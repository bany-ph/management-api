import axios from "axios"; // import axios

const MAIN_URL = "http://localhost:3001/users"


const generateID = () =>{
    return Date.now() + Math.random();
}


const getData = () => { return axios.get(MAIN_URL)}


const getDataUser = (id) => { return axios.get(`${MAIN_URL}?id=${id}`).catch((err) => console.log(err)); }

const addData = (newData) => {axios.post(MAIN_URL, {
    id: generateID,
    name: newData.name,
    email: newData.email
}).catch(err => {
    console.log(err)
})}

const updateData = (id, newData) => {axios.patch(`${MAIN_URL}?id=${id}`, {



}).catch((err) => console.log(err));}

const deleteData = (id) => {axios.delete(`${MAIN_URL}/${id}`).catch((err) => console.log(err));}



export{
    MAIN_URL,
    getData,
    getDataUser,
    addData,
    updateData,
    deleteData
}

