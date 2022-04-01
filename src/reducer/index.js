import { combineReducers } from 'redux'
//reducers
import { invoiceReducer } from './invoice.reducer'
import { productReducer } from './product.reducer'
import { supplierReducer } from './supplier.reducer'

export default combineReducers({
    invoices: invoiceReducer,
    products: productReducer,
    suppliers: supplierReducer
})
