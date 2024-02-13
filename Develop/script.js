let form = document.getElementById("preferencesForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  searchAPI();
});

const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a45f73db28msh8a496d9ee8ac44fp1fecbcjsnfe0bbac67e1c',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });



async function fetchData(recipeApiUrl) {
  try {
    const response = await fetch(recipeApiUrl);
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

async function fetchAvatar(avatar) {
  try {
    const response = await fetch(avatar);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.avatarUrl; // Assuming the API returns the avatar URL
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return null;
  }
}

// Function to fetch movie data based on selected genre
async function fetchMovieData(movieApiUrl) {
  try {
    const response = await fetch(movieApiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

async function searchAPI() {
  const recipeCategory = document.getElementById("mealCategory").value;
  const recipeApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeCategory}`;
  const recipeData = await fetchData(recipeApiUrl);
  if (recipeData) {
    displayRecipes(recipeData.meals);
  } else {
    document.getElementById("results").innerHTML = "Failed to fetch data.";
  }
}

async function displayRecipes(recipes) {
  const shuffledRecipes = shuffle(recipes);
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
  for (let i = 0; i < 5 && i < shuffledRecipes.length; i++) {
    const recipe = shuffledRecipes[i];
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

function displayIngredients(recipeElement, mealData) {
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.classList.add("ingredientTitle");
  ingredientsTitle.textContent = "Ingredients";
  recipeElement.appendChild(ingredientsTitle);
  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add('ingredientslist')
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

async function displayMovieResults(movieData) {
  console.log("Fetched movie data:", movieData);
  document.getElementById("results").innerHTML +=
    "<h2>Movie Results</h2>" + JSON.stringify(movieData, null, 2);
}

function displayAvatar(avatarUrl) {
  const avatarContainer = document.createElement("div");
  const img = document.createElement("img");
  img.src = avatarUrl; // Assuming avatarUrl is a string containing the URL
  img.alt = "avatar";
  avatarContainer.appendChild(img);
  document.getElementById("avatarContainer").appendChild(avatarContainer);
}

// added cocktail code 
const cocktailType = document.getElementById("cocktailType").value;
  const cocktailApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktailType}`;
  const cocktailData = await fetchData(cocktailApiUrl);
  if (cocktailData) {
    displayCocktails(cocktailData.drinks);
  } else {
    document.getElementById("results").innerHTML += "<br>Failed to fetch cocktail data.";
  }

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function displayRecipes(recipes) {
  const shuffledRecipes = shuffle(recipes);
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<h2>Recipes</h2>";
  shuffledRecipes.slice(0, 5).forEach(recipe => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe");
    recipeElement.innerHTML = `<img src="${recipe.strMealThumb}" height="200"> <h2>${recipe.strMeal}</h2>`;
    resultsContainer.appendChild(recipeElement);
  });
}

async function displayCocktails(cocktails) {
  const shuffledCocktails = shuffle(cocktails);
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML += "<h2>Cocktails</h2>";
  shuffledCocktails.slice(0, 5).forEach(cocktail => {
    const cocktailElement = document.createElement("div");
    cocktailElement.classList.add("cocktail");
    cocktailElement.innerHTML = `<img src="${cocktail.strDrinkThumb}" height="200"> <h2>${cocktail.strDrink}</h2>`;
    resultsContainer.appendChild(cocktailElement);
  });
}
// last generated display storage- goes away after the page is refreshed 
// Function to send results to server
function storeResults(results) {
  fetch('/store-results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(results),
  })
  .then(response => response.json())
  .then(data => console.log(data.message))
  .catch(error => console.error('Error storing results:', error));
}

// Function to fetch last results on page load
function getLastResults() {
  fetch('/get-last-results')
    .then(response => response.json())
    .then(data => {
      // Assuming 'data' is your results object
      // Display these results appropriately
      console.log('Last results:', data);
      // For example, if data contains recipes:
      if(data && data.meals) {
        displayRecipes(data.meals);
      }
      // If data contains cocktails, add similar handling
    })
    .catch(error => console.error('Error fetching last results:', error));
}

// Call getLastResults on page load
document.addEventListener('DOMContentLoaded', getLastResults);

