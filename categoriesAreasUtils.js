const fetchCategoriesAndAreas = async () => {
	categoriesDiv.innerHTML = '';
	areasDiv.innerHTML = '';
	const categories = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
	const areas = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

	const categoriesArr = deobjectify(categories);
	const areasArr = deobjectify(areas);
	return { categoriesArr, areasArr };
};

const deobjectify = (objArr) => {
	const arr = [];
	for (let obj of objArr.data.meals) {
		for (let key in obj) {
			arr.push(obj[key]);
		}
	}
	return arr;
};

const filterByTypeName = async (name, type) => {
	let filteredResults = [];
	if (type === 'category') {
		filteredResults = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
	} else if (type === 'area') {
		filteredResults = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
	}
	return filteredResults;
};

const listLinks = (arr, { type, place }) => {
	for (let link of arr) {
		let node = document.createElement('button');
		let textNode = document.createTextNode(`${link}`);
		node.appendChild(textNode);
		node.classList.add(`${type}`);
		node.classList.add(`filterByName`);
		place.append(node);
	}
};

const showCategoriesAreas = ({ categoriesArr, areasArr }) => {
	mealBody.classList.add('is-hidden');
	categoriesAreasDiv.classList.remove('is-hidden');
	resultsDiv.classList.add('is-hidden');
	listLinks(categoriesArr, { type: 'category', place: categoriesDiv });
	listLinks(areasArr, { type: 'area', place: areasDiv });
	document.querySelectorAll('.filterByName').forEach((item) => {
		item.addEventListener('click', async () => {
			const name = item.innerHTML;
			const classes = item.classList;
			const type = classes[0];
			const filteredResults = await filterByTypeName(name, type);
			const filteredArr = filteredResults.data.meals;
			showFilterResults(filteredArr);
		});
	});
};

const resultLayout = ({ title, id, thumbnail }) => {
	return `
	<img src="${thumbnail}">
	<button class="resultButton">${title}</button>
	<p class="is-hidden">${id}</p>
	`;
};

const showFilterResults = (filteredArr) => {
	resultsDiv.innerHTML = '';
	resultsDiv.classList.remove('is-hidden');
	categoriesAreasDiv.classList.add('is-hidden');
	mealBody.classList.add('is-hidden');
	if (filteredArr.length === 0) {
		resultsDiv.innerHTML = '<label>Sorry, no recipes found</label>';
	}
	if (filteredArr.length > 25) {
		filteredArr = filteredArr.slice(0, 24);
	}
	for (let result of filteredArr) {
		let title = result.strMeal;
		let id = result.idMeal;
		let thumbnail = result.strMealThumb;
		const resultDiv = resultLayout({ title, id, thumbnail });
		const newDiv = document.createElement('div');
		newDiv.classList.add('result');
		newDiv.innerHTML = resultDiv;
		resultsDiv.append(newDiv);
	}
	document.querySelectorAll('#resultButton').forEach((item) => {
		item.addEventListener('click', async () => {
			const id = item.nextElementSibling.innerHTML;
			const data = await findMealById(id);
			showMealBody(data);
		});
	});
	return resultsDiv.innerHTML;
};
