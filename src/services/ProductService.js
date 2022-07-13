import clienteAxios from "../config/AxiosConfig";

const model = "products"

const getProducts = async () => {
    const resp = await clienteAxios.get(model);
    return resp.data;
}

const createProduct = async (data) => {
    const resp = await clienteAxios.post(`${model}`, data);
    return resp.data;
};

export { getProducts, createProduct }