const initialstate = {    
    products: [    
        { id: 1, productName: "Product 1", productCategory: "Fruits" },    
        { id: 2, productName: "Product 2", productCategory: "Vegetables" },    
        { id: 3, productName: "Product 3", productCategory: "Live stocks" }    
    ]    
};    
    
const reducer = (state = initialstate, action) => {    
    switch (action.type) {    
        case 'GET_PRODUCT':    
            return {    
                ...state    
            };    
        case 'ADD_PRODUCT':    
            return {    
                ...state,    
                products: state.products.concat(action.payload)    
            };    
        case 'EDIT_PRODUCT':    
            return {    
                ...state,    
                products: state.products.map(    
                    (content, i) => content.id === action.payload.id ? {...content, productName : action.payload.productName ,  productCategory : action.payload.productCategory }    
                                            : content)    
            };    
        case 'DELETE_PRODUCT':    
            return {    
                ...state,    
                products: state.products.filter(item => item.id !== action.payload)    
            };    
        default:    
            return state;    
    }    
};    
    
export default reducer;   