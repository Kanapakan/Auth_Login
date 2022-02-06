
export const toggleBookmark = (id) => {
    return { type: "BOOKMARK", recipeId: id };
}

export const toggleMealTime = (id, mealTime, order, carbs, fats, protein) => {
    return { type: "MEALTIME", recipeId: id, mealTime: mealTime, 
        order: order, 
        carbs: carbs, 
        fats: fats,
        protein: protein};
    }
    
export const toggleEatKcals = (kcals, order) => {
    return { type: "EATKCAL", eatKcals: kcals, order: order};
}

export const fetched_recipeHistory = (userHistory) => {
    const sumNutrient = userHistory.sumNutrient
    const sumCal = userHistory.sumCal
    return{ type: "RECIPE_HISTORY", sumNetrients: sumNutrient, sumEatCal: sumCal, user_history:userHistory}
}

export const toggleFilterIngredients = (ingredients) => {
    return {type: "FILTER_INGREDIENTS", ingredients: ingredients}

}

export const createNewRecipe = (newrecipe, set) => {
    return {type: "CREATE_RECIPE", newrecipe: newrecipe, set:set}

}