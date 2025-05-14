import apiClient from "./apiClient";
import axios from "axios";
export const RegisterAPI = async (
  full_name: string,
  email: string,
  password: string,
  phone: string,
  address?: string
) => {
  const res = await apiClient.post("/addNewUser", {
    full_name,
    email,
    password,
    phone,
    address,
  });
  return res.data;
};

export const LoginUser = async (email: string, password: string) => {
  const response = await apiClient.post("/loginUser", { email, password });
  return response.data;
};

export const GetcategoryList = async () => {
  const res = await apiClient.get("/getallcategory");
  return res.data;
};

export const getListBanner = async () => {
  const res = await apiClient.get("/getBannerList");
  return res.data;
};

export const selectProduct = async (id: number) => {
  const res = await apiClient.get(`/selectProduct?id=${id}`);
  return res.data;
};

export const getUserInfo = async (token: string) => {
  try {
    const res = await apiClient.get(`/getuserInfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    throw error;
  }
};

export const uploadAvata = async (formData: FormData) => {
  try {
    const res = await apiClient.patch("/addAvata", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi upload avatar:", error);
    throw error;
  }
};
export const AddtoCart = async (
  user_id: number,
  product_id: number,
  color: string,
  size: string,
  brand: string,
  quantity: number
) => {
  const res = await apiClient.post("/addtoCart", {
    user_id,
    product_id,
    color,
    size,
    brand,
    quantity,
  });
  return res.data;
};

export const GetcartItems = async (user_id: number) => {
  const res = await apiClient.post("/getCartItems", { user_id });
  return res.data;
};
export const DeleteItems = async (item_id: number) => {
  const res = await apiClient.delete(`/deleteCartItem?id=${item_id}`);
  return res.data;
};
export const TotalItems = async (user_id: number) => {
  const res = await apiClient.post("/totalItemsCart", { user_id });
  return res.data;
};

export const addFavoritePrd = async (user_id: number, product_id: number) => {
  const res = await apiClient.post("/addFavoriteProduct", {
    user_id,
    product_id,
  });
  return res.data;
};

export const apiTinhThanh = async () => {
  const res = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
  return res.data;
};
export const apihuyen = async (id: number) => {
  const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${id}.htm`);
  return res.data;
};
export const apixa = async (id: number) => {
  const res = await axios.get(`https://esgoo.net/api-tinhthanh/3/${id}.htm`);
  return res.data;
};

export const addQuestion = async (userMessage: any) => {
  const res = await apiClient.post("/botRepply", { userMessage });
  return res.data;
};

/**----Thanh toán khi nhận hàng */
export const createOrder = async (data: any) => {
  const res = await apiClient.post("/createOrder", data);
  return res.data;
};

/**-----Thanh toán qua VNpay */

export const payOnVNPay = async (data: any) => {
  const res = await apiClient.post("/productPayment", data);
  return res.data;
};

export const getUrlVnPay = async (data: any) => {
  const res = await apiClient.get(`/IPN?${data}`);
  return res.data;
};
