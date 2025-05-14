export interface PAYLOADBUYPRODUCT {
  user_id: string | null;
  id: string | null;
  category_id?: string | null;
  product_name: string | null;
  product_image: string | null;
  description: string | null;
  price: string | null;
  stock_quantity: number | null;
  color: string | null;
  size: string | null;
  brand: string | null;
}

export interface AUTHENTICATIONCUSTOMER {
  id: string | null;
  full_name?: string | null;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
  address?: string | null;
  role?: string | null;
  image?: string | null;
  created_at?: string | null;
}
export interface LISTITEMORDER {
  user_id: string | null;
  payment_method: string | null;
  address: string | null;
  detail_address: string | null;
  totalPrice: number | null;
  items: any[];
}

export interface DELETEITEMORDER {
  type: "REMOVE_PRODUCT";
  payload: { id: string };
}

export interface ADDITEMORDER {
  type: "ORDERVNPAY";
  payload: LISTITEMORDER;
}

export interface ADDCUSTOMER {
  type: "ADDCUSTOMER";
  payload: AUTHENTICATIONCUSTOMER;
}
export interface BUYPRODUCT {
  type: "BUYPRODUCT";
  payload: PAYLOADBUYPRODUCT;
}

export interface LOGOUT {
  type: "LOGOUT";
}

export type ActionTypes =
  | ADDCUSTOMER
  | BUYPRODUCT
  | DELETEITEMORDER
  | LOGOUT
  | ADDITEMORDER;
