import { createDOM } from "./createDom.controllers.js";
import { Api } from "./api.controllers.js"

class Filter {
    static data = this.calculateRank()
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

	return data;
	}

    static async filterByCountry(){
        const countrySearched = document.getElementsByName('search')[0].value.toLowerCase()
        const dataFiltered =  (await this.data).filter(({country})=> country.toLowerCase().includes(countrySearched))
        createDOM.createTableBody(dataFiltered)
    }

    static async orderList(typeOrdered){

    }
}

const form = document.querySelector('.search__form')
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    Filter.filterByCountry()
})

const positionBtn = document.getElementById('position__order')
export { Filter } 