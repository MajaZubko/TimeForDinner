const mealBody = document.querySelector('.mealBody');
const categoriesAreasDiv = document.querySelector('.categoriesAreasDiv');
const categoriesDiv = document.querySelector('.categoriesDiv');
const areasDiv = document.querySelector('.areasDiv');
const resultsDiv = document.querySelector('.resultsDiv');

const ingredientInput = document.querySelector('#ingredientInput');

const randomButton = document.querySelector('#randomButton');
const categoriesAndAreasButton = document.querySelector('#categoriesAndAreasButton');
const backButton = document.querySelector('#backButton');
const backToTopButton = document.querySelector('#backToTopButton');

randomButton.addEventListener('click', async () => {
	const data = await fetchRandomMeal();
	showMealBody(data);
});

categoriesAndAreasButton.addEventListener('click', async () => {
	const data = await fetchCategoriesAndAreas();
	showCategoriesAreas(data);
});

backButton.addEventListener('click', async () => {
	categoriesDiv.innerHTML = '';
	areasDiv.innerHTML = '';
	const data = await fetchCategoriesAndAreas();
	showCategoriesAreas(data);
});

const onInput = async () => {
	const input = ingredientInput.value;
	if (!input) {
		return;
	}
	const filteredResults = await findMealByIngredient(input);
	console.log(filteredResults.length);

	showFilterResults(filteredResults);
	console.log(filteredResults);
};

ingredientInput.addEventListener('input', debounce(onInput));
