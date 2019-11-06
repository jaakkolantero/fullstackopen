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

export default { getAll, create };
