import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      console.log("[reducer Line 15]");
      return {
        ...state, // first level copy
        ingredients: {
          ...state.ingredients, //copying the nested objects (deep clone)
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
          //targeting te ingredient via es6 syntax <- left side
          //right side - taking the org value from the old state

          //returning new object
        },
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
      };
    default:
      return state;
  }

  //always return this state in case of no passing any validation
};

export default reducer;
