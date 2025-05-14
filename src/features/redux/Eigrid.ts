export interface StateModel {
  form: {
    activeForm: number;
    formStatus: number | null;
    formData: {
      formAuthentication: AuthenticationModel;
      formBuyProduct : BUYPRODUCTFORM;
      formItemOrderVnPay :LISTITEMORDERVNPAY
    };
  };
}

export interface ListStateModel extends Array<StateModel> {}

export interface AuthenticationModel {
  user_id: string | null;
  full_name?: string | null;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
  address?: string | null;
  role?: string | null;
  image?: string | null;
  created_at?: string | null;
}
export interface BUYPRODUCTFORM {
  user_id: string | null;
  id: string | null;
  category_id?: string | null;
  product_name: string | null;
  product_image: string | null;
  description: string | null;
  price: string | null;
  stock_quantity: string | null;
  color: string | null;
  size: string | null;
  brand: string | null;
}

export interface LISTITEMORDERVNPAY{
  user_id: string | null;
  payment_method: string | null;
  address: string | null;
  detail_address: string | null;
  totalPrice: number | null;
  items: any[]
}