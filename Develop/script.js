let form = document.getElementById('preferencesForm');
form.addEventListener("submit", function(event){
  event.preventDefault();
  searchAPI();

})


async function fetchData(recipeApiUrl) {
  try {
    const response = await fetch(recipeApiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function fetchAvatar(avatar) {
  try {
    const response = await fetch(avatar);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.avatarUrl; // Assuming the API returns the avatar URL
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return null;
  }
}



// Function to fetch movie data based on selected genre
async function fetchMovieData(movieApiUrl) {
  try {
    const response = await fetch(movieApiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
}

async function searchAPI() {
  const recipeCategory = document.getElementById('mealCategory').value;
  const recipeApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeCategory}`;
  const recipeData = await fetchData(recipeApiUrl);
  if (recipeData) {
    displayRecipes(recipeData.meals);
  } else {
    document.getElementById('results').innerHTML = 'Failed to fetch data.';
  }
}

async function displayRecipes(recipes) {
  const shuffledRecipes = shuffle(recipes);
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results
  for (let i = 0; i < 5 && i < shuffledRecipes.length; i++) {
    const recipe = shuffledRecipes[i];
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');
    recipeElement.style.marginBottom = '20px';
    recipeElement.innerHTML = `
      <p>${recipe.strMeal}</p>
      <img src="${recipe.strMealThumb}" height="200">
    `;

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
  // Fisher-Yates (aka Knuth) Shuffle algorithm
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
      

function displayResults(recipeData) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results
  for (let i=0; i < 5; i++) {
    let recipe = recipeData.meals[i];
    const recipeElement = document.createElement('div');
    recipeElement.innerHTML = `<p>${recipe.strMeal}</p>
    <img src="${recipe.strMealThumb}" height="200">`
    ; // Display recipe name
    
    resultsContainer.appendChild(recipeElement);
  }
}


function displayIngredients(recipeElement, mealData) {
  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.textContent = 'Ingredients';
  recipeElement.appendChild(ingredientsTitle);

  const ingredientsList = document.createElement('ul');
  for (let j = 1; j <= 5; j++) {
    const ingredient = mealData[`strIngredient${j}`];
    const measure = mealData[`strMeasure${j}`];
    if (ingredient) {
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = measure ? `${measure} - ${ingredient}` : ingredient;
      ingredientsList.appendChild(ingredientItem);
    } else {
      break;
    }
  }
  const ingredientsContainer = document.createElement('div');
  ingredientsContainer.classList.add('ingredients');
  ingredientsContainer.appendChild(ingredientsList);
  recipeElement.appendChild(ingredientsContainer);
}
 
async function displayMovieResults(movieData) {
  // Display or process the fetched movie data as needed
  console.log('Fetched movie data:', movieData);
  // This will append the movie data to the results. Adjust as necessary for your display logic.
  document.getElementById('results').innerHTML += '<h2>Movie Results</h2>' + JSON.stringify(movieData, null, 2);
}

function displayAvatar(avatarUrl) {
  const avatarContainer = document.createElement('div');
  const img = document.createElement('img');
  img.src = avatarUrl; // Assuming avatarUrl is a string containing the URL
  img.alt = 'avatar';
  avatarContainer.appendChild(img);
  document.getElementById('avatarContainer').appendChild(avatarContainer);
}//Global variables//
var id = "c1209f71"
var key = "bfada42bc6c1d17e1c160975a2313f78"
var inputVal = []
console.log(inputVal)


//Drink function//
function getDrink() {
    //Getting the value of the user specified drink selection//
    var drinkSelection = $("input[name=selector]:checked").val();
    console.log(drinkSelection);

    //Cocktail db URL with user specified drink selection//
    var queryURLdrink = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkSelection;
    

    //AJAX call getting each drink name, image, and drink id//
    $.ajax({
        type: "GET",
        url: queryURLdrink,
    }).then(function(response) {
        console.log(queryURLdrink);
        console.log(response);

        //Page scroll animation//
        $("html, body").animate({ scrollTop: "700px" }, 1000);

        //Randomizing the drink selection//
        var rand = Math.floor((Math.random() * response.drinks.length));
        console.log(response.drinks.length);
        $(".drinkCard-title").html(response.drinks[rand].strDrink);
        $(".drinkCard-img-top").attr("src", response.drinks[rand].strDrinkThumb);
        var drinkId = (response.drinks[rand].idDrink);
        console.log(drinkId);


        
        //Cocktail db URL referencing the drink id from the previous call//
        var queryURLid = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
        
        //AJAX call getting each drink ingredient, unit of measure, and recipe instructions//
        $.ajax({
            type: "GET",
            url: queryURLid,
        }).then(function(response) {
            console.log(queryURLid);
            console.log(response);
            $(".drinkCard-text").empty();
            var list = $("<ul>");
            $(".drinkCard-text").append(list);
            

            //For loop looping through and appending each drink unit of measure and ingredient//
            for (var i = 1; i < 16; i++) {
                var item = $("<li>")
                ingredient = response.drinks[0]["strIngredient" + i];
                unit = response.drinks[0]["strMeasure" + i];
                if (ingredient){
                    item.html(unit + " " + ingredient);
                    list.append(item)
                }
            }
            //Getting the drink instructions and appending them to the drink card//
            var p = $("<p>");
            p.html("<h5>Instructions:</h5> \n" + response.drinks[0].strInstructions);
            $(".drinkCard-text").append(p);
        });
    });
}