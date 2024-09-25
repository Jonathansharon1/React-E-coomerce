
const initialState = {
  users: [],
  categories: [],
  products: [],
  cart: []
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_USERS': {
      return { ...state, users: action.payload };
    }

    case 'LOAD_CATEGORIES': {
      return { ...state, categories: action.payload };
    }

    case 'LOAD_PRODUCTS': {
      return { ...state, products: action.payload };
    }

    case 'ADD_TO_CART':{
      return {...state, cart: action.payload}
    }

    default:
      return state;
  }
};

export default storeReducer;