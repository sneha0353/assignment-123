import {ADD_DATA,REMOVE_DATA} from "./action.types";

export const initialState = null;

export const reducer = (state,action) => {
    switch(action.type) {
        case ADD_DATA: 
            return action.payload
        case REMOVE_DATA:
            return initialState
        default:
            return state
    }
}

