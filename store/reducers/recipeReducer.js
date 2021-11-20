import { RECIPES } from "../../dataJson/recipeData";

const initState = {
    recipes: RECIPES,
    bookmarkRecipes: [],
    sumEatKcals: 0,
    sumNutrient: {carbs: 0,
                protein: 0,
                fats: 0},
    allMeals: {
        breakfastMeals: [],
        lunchMeals: [],
        dinnerMeals: [],
    }

}

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case "RECIPE_HISTORY":
            const fast = Object.keys(action.user_history.recipes).findIndex(recipe => recipe === "breakfastMeals")
            const find = Object.keys(action.user_history.recipes).findIndex(recipe => recipe === "lunchMeals")
            const din = Object.keys(action.user_history.recipes).findIndex(recipe => recipe === "dinnerMeals")

          let moning = [];
          let  afternoon = [];
          let night = [];
          console.log(fast,find,din)
            if(fast >= 0){
                moning = action.user_history.recipes.breakfastMeals
            } if(find >= 0){
                afternoon = action.user_history.recipes.lunchMeals
            } if(din >= 0){
                night = action.user_history.recipes.dinnerMeals
            }
            return {...state,allMeals: {breakfastMeals : moning,
                                        lunchMeals: afternoon,
                                        dinnerMeals: night},
                            sumEatKcals : action.sumEatCal,
                            sumNutrient: action.sumNetrients}

        case "EATKCAL" :
            if( action.order == "Add"){
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
    // ------------------------------------------------------------------------------------------
        case "MEALTIME" :
            const breakfast = state.allMeals.breakfastMeals
            const lunch = state.allMeals.lunchMeals
            const dinner = state.allMeals.dinnerMeals
            const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
            if(action.mealTime === "breakfast"){
                const existmenu = breakfast.findIndex(recipe => recipe.id === action.recipeId)
                if(action.order == 'del'){
                    const updateMeal = [...breakfast];
                    updateMeal.splice(existmenu, 1);
                    return {...state, allMeals: {breakfastMeals : updateMeal,
                                                lunchMeals: lunch,
                                                dinnerMeals: dinner},
                         sumNutrient:{  carbs :state.sumNutrient.carbs-action.carbs,
                                    protein: state.sumNutrient.protein-action.protein,
                                    fats: state.sumNutrient.fats-action.fats},

                        } 
                } else {
                // const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state, allMeals:{breakfastMeals: breakfast.concat(recipe),
                                                lunchMeals: lunch,
                                                dinnerMeals: dinner},
                        sumNutrient:{  carbs :state.sumNutrient.carbs+action.carbs,
                            protein: state.sumNutrient.protein+action.protein,
                            fats: state.sumNutrient.fats+action.fats},
                    };
                }
                
            } else if (action.mealTime === "lunch") {
                
                if(action.order == 'del'){
                    const exist = lunch.findIndex(recipe => recipe.id === action.recipeId)
                    const upMealLunch = [...lunch];
                    upMealLunch.splice(exist, 1);
                    return {...state, allMeals :{breakfastMeals: breakfast,
                                                lunchMeals: upMealLunch,
                                                dinnerMeals: dinner},
                        sumNutrient:{  carbs :state.sumNutrient.carbs-action.carbs,
                            protein: state.sumNutrient.protein-action.protein,
                            fats: state.sumNutrient.fats-action.fats},
                    } 
                } else {
                // const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state,  allMeals: {breakfastMeals: breakfast,
                                                    lunchMeals: state.allMeals.lunchMeals.concat(recipe),
                                                    dinnerMeals: dinner},
                        sumNutrient:{  carbs :state.sumNutrient.carbs+action.carbs,
                            protein: state.sumNutrient.protein+action.protein,
                            fats: state.sumNutrient.fats+action.fats},
                    };
                }

            } else if (action.mealTime === "dinner") {
                const menu = dinner.findIndex(recipe => recipe.id === action.recipeId)
                if(action.order == 'del'){
                    const upMealDinner = [...dinner];
                    upMealDinner.splice(menu, 1);
                    return {...state, allMeals: {breakfastMeals: breakfast,
                                                lunchMeals: lunch
                                                ,dinnerMeals: upMealDinner},
                        sumNutrient:{  carbs :state.sumNutrient.carbs-action.carbs,
                            protein: state.sumNutrient.protein-action.protein,
                            fats: state.sumNutrient.fats-action.fats},
                    } 
                } else {
                // const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                    return {...state, allMeals:{breakfastMeals: breakfast,
                                                lunchMeals: lunch
                                                ,dinnerMeals: dinner.concat(recipe),
                                            },
                        sumNutrient:{  carbs :state.sumNutrient.carbs+action.carbs,
                            protein: state.sumNutrient.protein+action.protein,
                            fats: state.sumNutrient.fats+action.fats},
                    };
                }
            }
       

        default: 
        return state;
        
    }
    
}
export default recipeReducer;