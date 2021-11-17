import { RECIPES } from "../../dataJson/recipeData";

const initState = {
    recipes: RECIPES,
    bookmarkRecipes: [],
    breakfastMeals: [],
    lunchMeals: [],
    dinnerMeals: [],
    sumEatKcals: 0,
    sumCarbs: 0,
    sumProteins: 0,
    sumFats: 0
}

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case "EATKCAL" :
            if( action.order === "Add"){
                 return {...state, sumEatKcals: state.sumEatKcals+action.eatKcals};
            } else {
                return {...state, sumEatKcals: state.sumEatKcals-action.eatKcals};
            }
           
            
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
                if(action.order == 'del'){
                    const updateMeal = [...state.breakfastMeals];
                    updateMeal.splice(existmenu, 1);
                    return {...state, breakfastMeals: updateMeal,
                         sumCarbs: state.sumCarbs-action.carbs,
                         sumFats: state.sumFats-action.fats,
                         sumProteins: state.sumProteins-action.protein} 
                } else {
                const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state, breakfastMeals: state.breakfastMeals.concat(recipe),
                        sumCarbs: state.sumCarbs+action.carbs,
                        sumFats: state.sumFats+action.fats,
                        sumProteins: state.sumProteins+action.protein};
                }
                
            } else if (action.mealTime === "lunch") {
                const exist = state.lunchMeals.findIndex(recipe => recipe.id === action.recipeId)
                if(action.order == 'del'){
                    const upMealLunch = [...state.lunchMeals];
                    upMealLunch.splice(exist, 1);
                    return {...state, lunchMeals: upMealLunch,
                        sumCarbs: state.sumCarbs-action.carbs,
                        sumFats: state.sumFats-action.fats,
                        sumProteins: state.sumProteins-action.protein} 
                } else {
                const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state, lunchMeals: state.lunchMeals.concat(recipe),
                        sumCarbs: state.sumCarbs+action.carbs,
                        sumFats: state.sumFats+action.fats,
                        sumProteins: state.sumProteins+action.protein};
                }

            } else if (action.mealTime === "dinner") {
                const menu = state.dinnerMeals.findIndex(recipe => recipe.id === action.recipeId)
                if(action.order == 'del'){
                    const upMealDinner = [...state.dinnerMeals];
                    upMealDinner.splice(menu, 1);
                    return {...state, dinnerMeals: upMealDinner,
                        sumCarbs: state.sumCarbs-action.carbs,
                        sumFats: state.sumFats-action.fats,
                        sumProteins: state.sumProteins-action.protein} 
                } else {
                const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state, dinnerMeals: state.dinnerMeals.concat(recipe),
                        sumCarbs: state.sumCarbs+action.carbs,
                        sumFats: state.sumFats+action.fats,
                        sumProteins: state.sumProteins+action.protein};
                }
            }
       

        default: 
        return state;
        
    }
    
}
export default recipeReducer;