import axios from 'axios'

const url = 'http://localhost:8000/api/subscriptions'

const getItems = async () => (await (await axios.get(url)).data)

const getItemsIDs = async () =>
{
  let resp = await axios.get(url);
  let allSubs = resp.data;
  let ids = allSubs.map(x => x._id);
  return ids;
}

const getItem = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const addItem = async (newMovie) => await axios.post(url, newMovie)

const updateItem = async (updatedMovie, id) => await axios.put(`${url}/${id}`, updatedMovie)

const deleteItem = async (id) => await axios.delete(`${url}/${id}`)

//eslint-disable-next-line

export default { getItems, getItemsIDs, getItem, addItem, updateItem, deleteItem }    