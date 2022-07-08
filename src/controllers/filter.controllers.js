import { createDOM } from "./createDom.controllers.js";
import { Api } from "./api.controllers.js";

class Filter {
	static data = "";
	static async calculateRank() {
		let data = await Api.request();
		data.forEach(
			(country) =>
				(country.total =
					country.medal_bronze + country.medal_gold + country.medal_silver)
		);
		data.sort((a, b) => {
			if (b.total > a.total) {
				return 1;
			}
			if (b.total < a.total) {
				return -1;
			} else {
				return b.medal_gold > a.medal_gold ? 1 : -1;
			}
		});
		data.forEach((country, index) => (country.ranking = index + 1));
		Filter.data = data;
		return data;
	}

	static async filterByCountry() {
		let data = await Filter.calculateRank();
		const countrySearched = document
			.getElementsByName("search")[0]
			.value.toLowerCase();
		const dataFiltered = data.filter(({ country }) =>
			country.toLowerCase().includes(countrySearched)
		);
		Filter.data = dataFiltered;
		createDOM.createTableBody(dataFiltered);
	}

	static orderList(typeOrdered) {
		let data = Filter.data;
		const arrowImg = document.querySelector(`.img__${typeOrdered}`);
		//! Testei meu regex aquii https://regexr.com/
		const actualArrow = arrowImg.src.match(/(src).+/g)[0];

		const arrowUp = "src/assets/imgs/arrow_up.png";
		const arrowDown = "src/assets/imgs/arrow_down.png";

		if (actualArrow === arrowDown) {
			data.sort((a, b) => b[typeOrdered] - a[typeOrdered]);
			createDOM.createTableBody(data);
			arrowImg.src = arrowUp;
		} else {
			data.sort((a, b) => a[typeOrdered] - b[typeOrdered]);
			createDOM.createTableBody(data);
			arrowImg.src = arrowDown;
		}
		Filter.data = data;
	}
}

export { Filter };
