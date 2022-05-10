//getting all requird elements
const searchBtn = document.querySelector("#search-btn");
const mealList = document.querySelector("#meal");
const MealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.querySelector("#recipe-close-btn");

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    MealDetailsContent.parentElement.classList.remove("showRecipe");
});

//get meal list that matches with the ingredients
function getMealList(){
    let searchInputText = document.querySelector("#search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id = "${meal.idMeal}">

                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>

                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                
                    </div>

                `;
            });
            mealList.classList.remove("notFound");
        } else{
            html = "Sorry, we didn't find any meal that matches your ingredients!";
            mealList.classList.add("notFound");
        }

        mealList.innerHTML = html;
    });   
}

//get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals)) 

    }
}

//create a modal
function mealRecipeModal(meal){
    meal = meal[0];
    let html = `
            <h2 class="recipe-title">${meal.strMeal}</h2>

            <p class="recipe-category">${meal.strCategory}</p>

            <div class="recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
            </div>

            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="food">
            </div>

            <div class="recipe-link">
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>

        `;

        MealDetailsContent.innerHTML = html;
        MealDetailsContent.parentElement.classList.add("showRecipe");
}