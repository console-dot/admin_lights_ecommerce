import { apiRequest } from "../utils"

export const createFile = async ({fromData,token}) => {
    console.log(fromData)
    const res = await apiRequest(
        {
            method: 'POST',
            url: 'http://localhost:5000/file/upload',
            data:fromData ,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const deleteFile = async ({id,token}) => {
    const res = await apiRequest(
        {
            method: 'DELETE',
            url: `http://localhost:5000/file/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const getFile = async ({id}) => {
    const res = await apiRequest(
        {
            method: 'GET',
            url: `http://localhost:5000/file/${id}`,
            // headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const getAllFile = async ({token}) => {
    const res = await apiRequest(
        {
            method: 'GET',
            url: `http://localhost:5000/file`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const updateFile = async ({fromData,token,id}) => {
    const res = await apiRequest(
        {
            method: 'PUT',
            url: `http://localhost:5000/file/${id}`,
            data: fromData,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}