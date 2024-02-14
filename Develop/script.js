let form = document.getElementById("preferencesForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  searchAPI();
  showModal();
});

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function searchAPI() {
  // Fetch and display meal data
  const mealCategory = document.getElementById("mealCategory").value;
  const mealApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`;
  const mealData = await fetchData(mealApiUrl);
  if (mealData) {
    displayRecipes(mealData.meals, 'meal');
  } else {
    window.alert("Failed to fetch data. Please try again.");
  }

  // Fetch and display drink data
  const drinkCategory = document.getElementById("drinkCategory").value;
  const drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`;
  const drinkData = await fetchData(drinkApiUrl);
  if (drinkData && drinkData.drinks) {
    for (const drink of drinkData.drinks) {
      const drinkDetailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`;
      const drinkDetails = await fetchData(drinkDetailsUrl);
      if (drinkDetails && drinkDetails.drinks) {
        displayRecipes(drinkDetails.drinks, 'drink');
      } else {
        console.error(`Failed to fetch drink data for drink ID ${drink.idDrink}.`);
      }
    }
  } else {
    window.alert("Failed to fetch data. Please try again.");
  }
}

async function displayRecipes(recipes, type) {
  const shuffledRecipes = shuffle(recipes);
  const resultsContainer = document.getElementById("results");

  for (let i = 0; i < 5 && i < shuffledRecipes.length; i++) {
    const recipe = shuffledRecipes[i];
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe", "grid", "grid-cols-4");

    if (type === 'meal') {
      recipeElement.innerHTML = `<div><img src="${recipe.strMealThumb}" height="200"></div>`;
      const mealData = await fetchMealData(recipe.idMeal);
      if (mealData) {
        displayIngredients(recipeElement, mealData.meals[0], recipe.strMeal);
      } else {
        console.error(`Failed to fetch meal data for meal ID ${recipe.idMeal}.`);
      }
    } else if (type === 'drink') {
      recipeElement.innerHTML = `<div><img src="${recipe.strDrinkThumb}" height="200"></div>`;
      displayDrinkIngredients(recipeElement, recipe);
    }
    resultsContainer.appendChild(recipeElement);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function fetchMealData(mealId) {
  const mealApiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  return await fetchData(mealApiUrl);
}

function displayIngredients(recipeElement, mealData, mealName) {
  const ingredientsContainer = document.createElement("section");
  ingredientsContainer.classList.add("ingredients");
  const meal = document.createElement('h1');
  meal.innerText = mealName;
  meal.classList.add("font-bold", "underline", "pb-2");

  const ingredientsTitle = document.createElement("h2");
  ingredientsTitle.classList.add("ingredientTitle", "text-sm");
  ingredientsTitle.textContent = "-Ingredients-";

  const ingredientsList = document.createElement("div");
  ingredientsList.classList.add("ingredientslist", "list-none", "italic", "text-xs", "text-left", "ml-2", "text-bottom");

  for (let j = 1; j <= 20; j++) { // Adjusted to potentially capture more ingredients
    const ingredient = mealData[`strIngredient${j}`];
    const measure = mealData[`strMeasure${j}`];
    if (ingredient && ingredient.trim() !== '') {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = measure ? `${measure} - ${ingredient}` : ingredient;
      ingredientsList.appendChild(ingredientItem);
    }
  }

  ingredientsContainer.appendChild(meal);
  ingredientsContainer.appendChild(ingredientsTitle);
  ingredientsContainer.appendChild(ingredientsList);
  recipeElement.appendChild(ingredientsContainer);
}

function displayDrinkIngredients(recipeElement, drinkData) {
  // This function should be similar to displayIngredients but tailored to drinks.
  // You'll need to parse and display drink ingredients and measurements.
  const ingredientsContainer = document.createElement("section");
  ingredientsContainer.classList.add("ingredients");
  const drinkName = document.createElement('h1');
  drinkName.innerText = drinkData.strDrink;
  drinkName.classList.add("font-bold", "underline", "pb-2");

  const ingredientsTitle = document.createElement("h2");
  ingredientsTitle.classList.add("ingredientTitle", "text-sm");
  ingredientsTitle.textContent = "-Ingredients-";

  const ingredientsList = document.createElement("div");
  ingredientsList.classList.add("ingredientslist", "list-none", "italic", "text-xs", "text-left", "ml-2", "text-bottom");

  for (let j = 1; j <= 15; j++) {
    const ingredient = drinkData[`strIngredient${j}`];
    const measure = drinkData[`strMeasure${j}`];
    if (ingredient && ingredient.trim() !== '') {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${measure} ${ingredient}`.trim();
      ingredientsList.appendChild(ingredientItem);
    }
  }

  ingredientsContainer.appendChild(drinkName);
  ingredientsContainer.appendChild(ingredientsTitle);
  ingredientsContainer.appendChild(ingredientsList);
  recipeElement.appendChild(ingredientsContainer);
}


function showModal() {
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

document.getElementById('okButton').addEventListener('click', closeModal);

// Optional: Close the modal if the user clicks anywhere outside the modal content
window.onclick = function(event) {
  let modal = document.getElementById('modal');
  if (event.target == modal) {
    closeModal();
  }
}
