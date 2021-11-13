import { RECIPES } from "../../dataJson/recipeData";

const initState = {
    recipes: RECIPES,
    bookmarkRecipes: [],
}

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case "BOOKMARK" :
            const existingIndex = state.bookmarkRecipes.findIndex(recipe => recipe.id === action.recipeId)
            if(existingIndex >= 0){
                const updateBookmark = [...state.bookmarkRecipes];
                updateBookmark.splice(existingIndex, 1);
                return {...state, bookmarkRecipes: updateBookmark} 
            }else{
                const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                return {...state, bookmarkRecipes: state.bookmarkRecipes.concat(recipe)};
            }

        default: 
        return state;
        
    }
    
}
export default recipeReducer;