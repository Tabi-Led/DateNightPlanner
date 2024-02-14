let form = document.getElementById("preferencesForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  searchAPI();
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
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
async function searchAPI() {
  const recipeCategory = document.getElementById("drinkCategory").value;
  const recipeApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
  const recipeData = await fetchData(recipeApiUrl);
  if (recipeData) {
    displayRecipes(recipeData.meals);
  } else {
    window.alert("Failed to fetch data. Please try again.");
  }
}
async function searchAPI() {
  const recipeCategory = document.getElementById("mealCategory").value;
  const recipeApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeCategory}`;
  const recipeData = await fetchData(recipeApiUrl);
  if (recipeData) {
    displayRecipes(recipeData.meals);
  } else {
    window.alert("Failed to fetch data. Please try again.");
  }
}
async function displayRecipes(recipes) {
  const shuffledRecipes = shuffle(recipes);

  const limitedRecipes = shuffledRecipes.slice(0, 5); // Limit to 5 recipes
  const encodedData = encodeURIComponent(JSON.stringify(limitedRecipes));

  // Redirect to the second page with encoded data in the URL
  window.location.href = `second.html?data=${encodedData}`;
 
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
  meal.innerText = mealName
  meal.classList.add("font-bold", "underline", "pb-2")


  const ingredientsTitle = document.createElement("h2");
  ingredientsTitle.classList.add("ingredientTitle", "text-sm");
  ingredientsTitle.textContent = "-Ingredients-";

  const ingredientsList = document.createElement("div");
  ingredientsList.classList.add("ingredientslist", "list-none", "italic", "text-xs", "text-left", "ml-2", "text-bottom");

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
  ingredientsContainer.appendChild(meal);
  ingredientsContainer.appendChild(ingredientsTitle); 
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