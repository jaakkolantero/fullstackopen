import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => {
    return response.data;
  });
};

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const deleteItem = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getComments = async () => {
  return (await axios.get(`${baseUrl}/comments`)).data;
};

export default { getAll, create, update, deleteItem, getComments };
