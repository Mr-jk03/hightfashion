import { AuthenticationModel, ListStateModel } from "./Eigrid";

export const formAuthentication: AuthenticationModel={
    full_name: null,
    email: null,
    password: null,
    phone: null,
    address: null,
    role: null,
    image: null,
    created_at: null
}

export const InitialState: ListStateModel=[
    {
        form:{
            activeForm:1,
            formStatus: null,
            formData:{
                formAuthentication: formAuthentication
            }
        }
    }
]