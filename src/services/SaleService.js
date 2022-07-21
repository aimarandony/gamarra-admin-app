import clienteAxios from "../config/AxiosConfig";

const model = "sales"

const getSales = async () => {
    const resp = await clienteAxios.get(model);
    return resp.data;
}

const createSale = async (data) => {
    const resp = await clienteAxios.post(`${model}`, data);
    return resp.data;
};

export { getSales, createSale }