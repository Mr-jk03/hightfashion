export interface StateModel {
  form: {
    activeForm: number;
    formStatus: number | null;
    formData: {
        formAuthentication: AuthenticationModel,
    };
  };
}

export interface ListStateModel extends Array<StateModel> {}

export interface AuthenticationModel{
    full_name?: string | null,
    email?: string | null,
    password?: string | null,
    phone?: string | null,
    address?: string | null,
    role?: string | null,
    image?: string | null,
    created_at?: string | null
}