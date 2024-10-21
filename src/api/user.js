import { apiRequest } from "../utils"

export const userLogin = async ({loginDetail}) => {
    const res = await apiRequest(
        {
            method: 'POST',
            url: 'http://localhost:5000/auth/signin',
            data: loginDetail,
        }
    );
    console.log(res)
    return res
}