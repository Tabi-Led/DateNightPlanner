function decodeData(encodedData) {
    return JSON.parse(decodeURIComponent(encodedData));
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('data');
    const decodedData = decodeData(encodedData);
  
    // Process the decoded data and display the recipes
    displayRecipes(decodedData);
  });
  
  async function fetchMealData(mealId) {
    const mealApiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    try {
      const response = await fetch(mealApiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching meal data:", error);
      return null;
    }
  }
  
  function displayIngredients(recipeElement, mealData) {
    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.classList.add("ingredientTitle");
    ingredientsTitle.textContent = "Ingredients";
    recipeElement.appendChild(ingredientsTitle);
    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add('ingredientslist');
    for (let j = 1; j <= 5; j++) {
      const ingredient = mealData[`strIngredient${j}`];
      const measure = mealData[`strMeasure${j}`];
      if (ingredient) {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = measure
          ? `${measure} - ${ingredient}`
          : ingredient;
        ingredientsList.appendChild(ingredientItem);
      } else {
        break;
      }
    }
    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.classList.add("ingredients");
    ingredientsContainer.appendChild(ingredientsList);
    recipeElement.appendChild(ingredientsContainer);
  }
  
  function displayRecipes(recipes) {
    const resultsContainer = document.getElementById("rightSection");
    resultsContainer.innerHTML = "";
    if (!Array.isArray(recipes)) {
        console.error("Recipes must be an array.");
        return;
      }
    recipes.forEach(async (recipe) => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe");
      recipeElement.innerHTML = `<img src="${recipe.strMealThumb}" height="200"> <H2>${recipe.strMeal}</H2>`;
  
      const mealData = await fetchMealData(recipe.idMeal);
      if (mealData) {
        displayIngredients(recipeElement, mealData.meals[0]);
      } else {
        console.error(`Failed to fetch meal data for meal ID ${recipe.idMeal}.`);
      }
  
      resultsContainer.appendChild(recipeElement);
    });
  }

  