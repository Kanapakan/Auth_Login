import { RECIPES } from "../../dataJson/recipeData";

const initState = {
    recipes: RECIPES,
    bookmarkRecipes: [],
    breakfastMeals: [],
    lunchMeals: [],
    dinnerMeals: [],
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
        case "MEALTIME" :
            
            if(action.mealTime === "breakfast"){
                const existmenu = state.breakfastMeals.findIndex(recipe => recipe.id === action.recipeId)
                if(existmenu >= 0){
                    const updateMeal = [...state.breakfastMeals];
                    updateMeal.splice(existmenu, 1);
                    return {...state, breakfastMeals: updateMeal} 
                } else {
                const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state, breakfastMeals: state.breakfastMeals.concat(recipe)};
                }
                
            } else if (action.mealTime === "lunch") {
                const exist = state.lunchMeals.findIndex(recipe => recipe.id === action.recipeId)
                if(exist >= 0){
                    const upMealLunch = [...state.lunchMeals];
                    upMealLunch.splice(exist, 1);
                    return {...state, lunchMeals: upMealLunch} 
                } else {
                const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state, lunchMeals: state.lunchMeals.concat(recipe)};
                }

            } else if (action.mealTime === "dinner") {
                const menu = state.dinnerMeals.findIndex(recipe => recipe.id === action.recipeId)
                if(menu >= 0){
                    const upMealDinner = [...state.dinnerMeals];
                    upMealDinner.splice(menu, 1);
                    return {...state, dinnerMeals: upMealDinner} 
                } else {
                const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state, dinnerMeals: state.dinnerMeals.concat(recipe)};
                }
            }
            

        default: 
        return state;
        
    }
    
}
export default recipeReducer;