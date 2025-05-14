import { Phone } from "@mui/icons-material";
import {
  AUTHENTICATIONCUSTOMER,
  DELETEITEMORDER,
  LISTITEMORDER,
  LOGOUT,
  PAYLOADBUYPRODUCT,
} from "./actions";
import { ActionTypes } from "./actions";
import { InitialState } from "./model";

export const action = {
  authen: (data: AUTHENTICATIONCUSTOMER) => ({
    type: "ADDCUSTOMER",
    payload: data,
  }),
  buyProduct: (data: PAYLOADBUYPRODUCT) => ({
    type: "BUYPRODUCT",
    payload: data,
  }),
  deleteItemOrder: (data: DELETEITEMORDER) => ({
    type: "REMOVE_PRODUCT",
    payload: data,
  }),
  logout:(data?: any) =>({ type:"LOGOUT", payload: data}),
  addlistModel: (data: LISTITEMORDER) =>({type:'ORDERVNPAY', payload: data})
};

export const fashionReducer = (state = InitialState, action: ActionTypes) => {
  switch (action.type) {
    case "ADDCUSTOMER":
      const newState = JSON.parse(JSON.stringify(state));
      const cusAuth = newState[0];
      if (cusAuth) {
        cusAuth.form.formData.formAuthentication.user_id = action.payload.id;
        cusAuth.form.formData.formAuthentication.full_name =
          action.payload.full_name;
        cusAuth.form.formData.formAuthentication.email = action.payload.email;
        cusAuth.form.formData.formAuthentication.password = "";
        cusAuth.form.formData.formAuthentication.phone = action.payload.phone;
        cusAuth.form.formData.formAuthentication.address =
          action.payload.address;
      }
      return cusAuth;
    case "BUYPRODUCT": {
      const buyProductState = JSON.parse(JSON.stringify(state));
      const buyProduct = buyProductState;
      if (buyProduct) {
        if (!buyProduct.form.formData.formBuyProducts) {
          buyProduct.form.formData.formBuyProducts = [];
        }
        const existingProduct = buyProduct.form.formData.formBuyProducts.find(
          (item: any) => item.id === action.payload.id
        );
        if (existingProduct) {
          existingProduct.stock_quantity += action.payload.stock_quantity;
        } else {
          
          buyProduct.form.formData.formBuyProducts.push({
            user_id: action.payload.user_id,
            id: action.payload.id,
            category_id: action.payload.category_id,
            product_name: action.payload.product_name,
            product_image: action.payload.product_image,
            description: action.payload.description,
            price: action.payload.price,
            stock_quantity: action.payload.stock_quantity,
            color: action.payload.color,
            size: action.payload.size,
            brand: action.payload.brand,
          });
        }
      }

      return buyProductState;
    }
    case "REMOVE_PRODUCT":
      
      const newStateRemove = JSON.parse(JSON.stringify(state));
      const cart = newStateRemove.form.formData.formBuyProducts;
      newStateRemove.form.formData.formBuyProducts = cart.filter(
        (item: any) => item.id !== action.payload
      );
      return newStateRemove;
    case "LOGOUT":
      return InitialState
    case "ORDERVNPAY":
      const initOrderVnPay = JSON.parse(JSON.stringify(state));
      if(initOrderVnPay){
        initOrderVnPay.form.formData.formItemOrderVnPay.user_id = action.payload.user_id
        initOrderVnPay.form.formData.formItemOrderVnPay.payment_method = action.payload.payment_method
        initOrderVnPay.form.formData.formItemOrderVnPay.addreess = action.payload.address
        initOrderVnPay.form.formData.formItemOrderVnPay.detail_address = action.payload.detail_address
        initOrderVnPay.form.formData.formItemOrderVnPay.totalPrice = action.payload.totalPrice
        initOrderVnPay.form.formData.formItemOrderVnPay.items = action.payload.items
      }

      return initOrderVnPay
    default:
      return state;
  }
};
