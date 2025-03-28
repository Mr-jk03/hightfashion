import {
  AuthenticationModel,
  BUYPRODUCTFORM,
  LISTITEMORDERVNPAY,
  ListStateModel,
} from "./Eigrid";

export const formAuthentication: AuthenticationModel = {
  user_id: null,
  full_name: null,
  email: null,
  password: null,
  phone: null,
  address: null,
  role: null,
  image: null,
  created_at: null,
};
export const formBuyProduct: BUYPRODUCTFORM = {
  user_id: null,
  id: null,
  category_id: null,
  product_name: null,
  product_image: null,
  description: null,
  price: null,
  stock_quantity: null,
  color: null,
  size: null,
};
export const formItemOrderVnPay: LISTITEMORDERVNPAY = {
  user_id: null,
  payment_method: null,
  address: null,
  detail_address: null,
  totalPrice: null,
  items: [],
};

export const InitialState: ListStateModel = [
  {
    form: {
      activeForm: 1,
      formStatus: null,
      formData: {
        formAuthentication: formAuthentication,
        formBuyProduct: formBuyProduct,
        formItemOrderVnPay: formItemOrderVnPay,
      },
    },
  },
];
