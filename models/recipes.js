class Recipe {
    constructor(
      id,
      name,
      kcal,
      time,
      ingredient_quantity,
      ingredient_name,
      ingredient_type,
      steps,
      imageURL,
      originalURL,

    ) {
      this.id = id;
      this.name = name;
      this.kcal = kcal;
      this.time = time;
      this.ingredient_quantity = ingredient_quantity
      this.ingredient_name = ingredient_name
      this.ingredient_type = ingredient_type
      this.steps = steps;
      this.imageURL = imageURL;
      this.originalURL = originalURL;
    }
  }
  
  export default Recipe;
  