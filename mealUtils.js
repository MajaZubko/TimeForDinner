const fetchRandomMeal = async () => {
	const res = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
	const data = res.data.meals[0];
	return data;
};

const getMealDetails = (data) => {
	let countIngr = 0;
	let ingrList = {};
	for (let key in data) {
		if (key.includes('strIngredient') && data[key]) {
			countIngr++;
			let newKey = data[key];
			let measureVal = data[`strMeasure${countIngr}`];
			ingrList[newKey] = measureVal;
		}
	}

	return {
		title: data.strMeal,
		area: data.strArea,
		category: data.strCategory,
		thumbnail: data.strMealThumb,
		ingredients: ingrList,
		instructions: data.strInstructions
	};
};

const mealLayout = ({ title, area, category, thumbnail, instructions }) => {
	return `
    <p class="title">${title}</p>
    <p class="area">Area: ${area}</p>
    <p class="category">Category: ${category}</p>
    <img src="${thumbnail}">
    <ul class="ingredients">Ingredients: </ul>
	<p class="instructions">Instructions:</p>
	<p class="instructions">${instructions}</p>
	
    `;
};

const showMealBody = (data) => {
	mealBody.classList.remove('is-hidden');
	categoriesAreasDiv.classList.add('is-hidden');
	resultsDiv.classList.add('is-hidden');
	const details = getMealDetails(data);
	const layout = mealLayout(details);
	const { ingredients } = details;
	mealBody.innerHTML = layout;
	for (let ingr in ingredients) {
		let node = document.createElement('li');
		let textNode = document.createTextNode(`${ingredients[ingr]} ${ingr}`);
		node.appendChild(textNode);
		document.querySelector('.ingredients').appendChild(node);
	}
};

const findMealById = async (id) => {
	const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
	return res.data.meals[0];
};

const findMealByIngredient = async (ingredient) => {
	const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
	const data = res.data.meals;
	if (!data) {
		return [];
	}
	console.log(data);
	return data;
};
