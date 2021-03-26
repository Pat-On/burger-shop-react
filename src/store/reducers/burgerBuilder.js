import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null, //coming from fetch
  totalPrice: 4,
  error: false,
};
// we can get it from anywhere DB or hard code
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      // console.log("[reducer Line 15]");
      return {
        ...state, // first level copy
        ingredients: {
          ...state.ingredients, //copying the nested objects (deep clone)
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
          //targeting te ingredient via es6 syntax <- left side
          //right side - taking the org value from the old state

          //returning new object
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state, // first level copy
        ingredients: {
          ...state.ingredients, //copying the nested objects (deep clone)

          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
          //targeting te ingredient via es6 syntax <- left side
          //right side - taking the org value from the old state

          //returning new object
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
      };
    default:
      return state;
  }

  //always return this state in case of no passing any validation
};

export default reducer;
