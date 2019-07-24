import axios from 'axios';
import { stat } from 'fs';


// In the src folder, add a folder and name it ducks.
// Add a file in the ducks folder and name it budgetReducer.js
// In budgetReducer.js:
// Create an initialState variable. Initial state for the store:
// {
//   purchases: [],
//   budgetLimit: null,
//   loading: false
// }




const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET-DATA';
const ADD_PURCHASE = 'ADD_PURCHASE';
const REMOVE_PURCHASE = 'REMOVE_PURCHASE';

// Create a function that have state and action parameters. Return state.
// initialState should be the default value for the state parameter.
// export default the reducer function.
export function requestBudgetData(){
    let data = axios.get('/api/budget-data').then(res => res.data)
     return {
        type: REQUEST_BUDGET_DATA,
        payload: data
            }
        }




export function addPurchase(price, description, category){
    let data = axios.post('/api/budget-data/purchase', {
        description,
        price,
        category
    }).then(res => res.data);
    return {
        type: ADD_PURCHASE,
        payload: data
    }

}

export function removePurchase(id){
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data);
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export default function budgetReducer(state=initialState, action){
    switch (action.type) {
        case REQUEST_BUDGET_DATA + '_PENDING':
            return { ...state, loading: true }
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return { ...state, ...action.payload, loading: false}
        case ADD_PURCHASE + '_PENDING':
            return {...state, loading: true}
        case ADD_PURCHASE + '_FULFILLED':
            return {...state, purchases: action.payload, loading: false}
        case REMOVE_PURCHASE + '_PENDING':
             return { ...state, loading: true };
        case REMOVE_PURCHASE + '_FULFILLED':
             return { ...state, loading: false, purchases: action.payload }
        default:
            return state;
    }
}