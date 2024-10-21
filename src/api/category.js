import { apiRequest } from "../utils"

export const category = async ({categoryData,token}) => {
    const res = await apiRequest(
        {
            method: 'POST',
            url: 'http://localhost:5000/category',
            data: categoryData ,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const getCategory = async ({token}) => {
    const res = await apiRequest(
        {
            method: 'GET',
            url: 'http://localhost:5000/category',
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const getCategoryById = async ({id,token}) => {
    const res = await apiRequest(
        {
            method: 'GET',
            url: `http://localhost:5000/category/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
 
    return res
}
export const deleteCategoryById = async ({id,token}) => {
    const res = await apiRequest(
        {
            method: 'DELETE',
            url: `http://localhost:5000/category/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
   
    return res
}
export const updateCategoryById = async ({data,id,token}) => {
    const res = await apiRequest(
        {
            method: 'PUT',
            url: `http://localhost:5000/category/${id}`,
            data:data,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
   
    return res
}

