import apiClient from "./apiClient";

export const RegisterAPI = async(
    full_name: string,
    email: string,
    password: string,
    phone: string,
    address?: string
)=>{
    const res = await apiClient.post('/addNewUser', {full_name, email, password, phone, address})
    return res.data
}

export const LoginUser = async(email: string, password: string)=>{
    const response = await apiClient.post('/loginUser', {email, password});
    return response.data
}

export const GetcategoryList = async()=>{
    const res = await apiClient.get('/getallcategory')
    return res.data
}

export const getListBanner = async()=>{
    const res = await apiClient.get('/getBannerList')
    return res.data
}

export const selectProduct = async(id: number)=>{
    const res = await apiClient.get(`/selectProduct?id=${id}`)
    return res.data
}