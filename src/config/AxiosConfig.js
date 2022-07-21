import Axios from "axios";

const URL = "https://gamarra-idat-api.herokuapp.com/";
// const URL = "http://localhost:8080/";

const clienteAxios = Axios.create({
  baseURL: URL,
});

export default clienteAxios;