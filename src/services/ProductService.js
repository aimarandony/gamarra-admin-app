import clienteAxios from "../config/AxiosConfig";

const model = "products"

const getProducts = async () => {
    const resp = await clienteAxios.get(model);
    return resp.data;
}

const getProductById = async (id) => {
    const resp = await clienteAxios.get(`${model}/${id}`);
    return resp.data;
}

const createProduct = async (data) => {
    const resp = await clienteAxios.post(`${model}`, data);
    return resp.data;
};

const updateProduct = async (data, id) => {
    const resp = await clienteAxios.put(`${model}/${id}`, data);
    return resp.data;
};

const deleteProduct = async (id) => {
    const resp = await clienteAxios.delete(`${model}/${id}`);
    return resp.data;
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }