import { apiRequest } from "../utils";
export const testimonial = async ({data,token}) => {
    console.log(data)
    const res = await apiRequest(
        {
            method: 'POST',
            url: 'http://localhost:5000/testimonial',
            data: data ,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    console.log(res)
    return res
}
export const getTestimonial = async ({token}) => {

    const res = await apiRequest(
        {
            method: 'GET',
            url: `http://localhost:5000/testimonial`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const getSingleTestimonial = async ({id,token}) => {

    const res = await apiRequest(
        {
            method: 'GET',
            url: `http://localhost:5000/testimonial/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const deleteTestimonial = async ({id,token}) => {

    const res = await apiRequest(
        {
            method: 'DELETE',
            url: `http://localhost:5000/testimonial/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}
export const updateTestimonial = async ({data,id,token}) => {
console.log(data)
    const res = await apiRequest(
        {
            method: 'PUT',
            url: `http://localhost:5000/testimonial/${id}`,
            data: data ,
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res
}