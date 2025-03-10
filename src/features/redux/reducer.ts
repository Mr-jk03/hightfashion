import { AUTHENTICATIONCUSTOMER } from "./actions";
import { ActionTypes } from "./actions";
import { InitialState } from "./model";


export const action = {
    authen:(data: AUTHENTICATIONCUSTOMER)=>({type:'ADDCUSTOMER', payload: data})
}

export const fashionReducer = (state = InitialState, action: ActionTypes) =>{
    switch(action.type){
        case 'ADDCUSTOMER':
            const newState = JSON.parse(JSON.stringify(state))
            const cusAuth = newState[0]
            if(cusAuth){

            }
            return cusAuth
        
        default:
                return state
    }
}