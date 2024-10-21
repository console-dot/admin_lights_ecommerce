import { apiRequest } from "../utils"

export const product = async ({createProductData,token}) => {
    console.log(createProductData)
    const res = await apiRequest(
        {
            method: 'POST',
            url: 'http://localhost:5000/product',
            data: createProductData ,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const getAllProduct = async ({token}) => {
    const res = await apiRequest(
        {
            method: 'GET',
            url: 'http://localhost:5000/product',
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const deleteSingleProduct = async ({id,token}) => {
    const res = await apiRequest(
        {
            method: 'DELETE',
            url: `http://localhost:5000/product/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const getSingleProduct = async ({id,token}) => {
    const res = await apiRequest(
        {
            method: 'GET',
            url: `http://localhost:5000/product/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const updateSingleProduct = async ({singelProductData,id,token}) => {
    const res = await apiRequest(
        {
            method: 'PUT',
            url: `http://localhost:5000/product/${id}`,
            data: singelProductData,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}