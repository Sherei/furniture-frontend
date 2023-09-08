import { createStore, combineReducers } from 'redux'

const userSection = (oldData = {
    cu: {}
}, newData) => {
    if (newData.type ==="LOGIN_USER") {
        oldData.cu = newData.payload;
    } else if (newData.type === "LOGOUT_USER") {
        oldData.cu = {};
        localStorage.removeItem('userToken');
    }
    return ({ ...oldData })

}

let allSections = combineReducers({ userSection });
let meraStore = createStore(allSections, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default meraStore