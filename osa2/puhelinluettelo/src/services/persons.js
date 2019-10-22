import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const update = newObject => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return request
    .then(response => response.data)
    .catch(error => {
      console.log("error", error);
      return error;
    });
};

const deletePerson = person => {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request.then(response => response.data);
};

export default { create, getAll, deletePerson, update };
