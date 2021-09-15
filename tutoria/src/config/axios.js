import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: "https://tutoring-system-api.herokuapp.com"
})

export default clienteAxios;