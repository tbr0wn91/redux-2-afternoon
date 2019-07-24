import { createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import budgetReducer from './budgetReducer';
import userReducer from './userReducer';


// Create a variable called rootReducer. It's value will be the result of calling combineReducers

const rootReducer = combineReducers({
    budget: budgetReducer,
    user: userReducer
})


// export the created store using createStore. This first arg to createStore should be rootReducer. The second arg is applyMiddleware(promiseMiddlware)

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))