import Axios from "axios";

const URL = "https://gamarra-idat-api.herokuapp.com/";

const clienteAxios = Axios.create({
  baseURL: URL,
});

export default clienteAxios;
