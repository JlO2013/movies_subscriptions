import axios from "axios"

axios.interceptors.request.use(req => {
  let token = sessionStorage["token"]
  req.headers={'x-access-token' : token };
  // Important: request interceptors **must** return the request.
  return req;
});

const url = 'http://localhost:8000/api/movies'

const getItems = async () => (await (await axios.get(url)).data)
const getItemsIDs = async () =>
{
  let resp = await axios.get(url);
  let allMovies = resp.data;
  let ids = allMovies.map(x => x._id);
  return ids;
}

const getItem = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateItem = async (id, updatedMovie) => await axios.put(`${url}/${id}`, updatedMovie)

const addItem = async (newMovie) => await axios.post(url, newMovie)

const deleteItem = async (id) => await axios.delete(`${url}/${id}`)

//eslint-disable-next-line
export default { getItems, getItemsIDs, getItem, updateItem, addItem, deleteItem }    