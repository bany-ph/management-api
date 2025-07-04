import axios from "axios"; // import axios

const MAIN_URL = "http://localhost:3001/users";

const generateID = () => {
  return (Date.now() + Math.random()).toString();
};

const getData = () => {
  return axios.get(MAIN_URL, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    }, // ensures that the browser does not cache the response
    params: { t: Date.now() },
  });
};

const getDataUser = (id) => {
  return axios
    .get(`${MAIN_URL}/${id}`)

    .catch((err) => console.log(err));
};

const addData = (newData) => {
  axios
    .post(MAIN_URL, {
      id: generateID(),
      name: newData.name,
      email: newData.email,
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const updateData = (id, newUpdateData) => {
  axios
    .patch(`${MAIN_URL}/${id}`, newUpdateData)
    .catch((err) => {
      throw new Error(err);
    });
};

const deleteData = (id) => {
  axios.delete(`${MAIN_URL}/${id}`).catch((err) => console.log(err));
};

export { MAIN_URL, getData, getDataUser, addData, updateData, deleteData };
