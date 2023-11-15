import { createStore, combineReducers } from 'redux'

const userSection = (oldData = {
    cu: {}
}, newData) => {
    if (newData.type === "LOGIN_USER") {
        oldData.cu = newData.payload;
    } else if (newData.type === "LOGOUT_USER") {
        oldData.cu = {};
        localStorage.removeItem('userToken');
    }
    return ({ ...oldData })

}

const Cart = (oldData = {
    cart: []
}, newData) => {
    if (newData.type === "ADD_TO_CART") {
        oldData.cart.push(newData.payload);  
    }  else if (newData.type === "REMOVE_CART") {
       oldData.cart = oldData.cart.filter(item => item._id !== newData.payload);
    }
    return { ...oldData, cart: Array.isArray(oldData.cart) ? oldData.cart : [] };
};



let allSections = combineReducers({ userSection, Cart });
let meraStore = createStore(allSections, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default meraStore