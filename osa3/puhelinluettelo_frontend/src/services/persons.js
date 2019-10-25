import axios from "axios";
const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001/api/persons"
    : "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  return axios
    .post(baseUrl, newObject)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.response.data.error);
    });
};

const update = newObject => {
  return axios
    .put(`${baseUrl}/${newObject.id}`, newObject)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.response.data.error);
    });
};

const deletePerson = person => {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request.then(response => response.data);
};

export default { create, getAll, deletePerson, update };
