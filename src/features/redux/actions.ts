export interface ADDCUSTOMER {
    type:'ADDCUSTOMER',
    payload: AUTHENTICATIONCUSTOMER
}
export interface AUTHENTICATIONCUSTOMER{
    full_name?: string | null,
    email?: string | null,
    password?: string | null,
    phone?: string | null,
    address?: string | null,
    role?: string | null,
    image?: string | null,
    created_at?: string | null
}

export type ActionTypes = ADDCUSTOMER