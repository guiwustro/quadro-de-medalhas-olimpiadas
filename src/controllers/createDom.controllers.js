import { Api } from "./api.controllers.js";
class createDOM {
	static async createTableBody() {
		const data = await this.calculateRank();
		const tbody = document.querySelector(".table__body");
		tbody.innerText = "";

		data.forEach((country) => {
			const row = this.createTemplateRow(country);
			tbody.appendChild(row);
		});
	}

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
	static createTemplateRow(data) {
		const row = document.createElement("tr");
		row.className = "table__row";

		const ranking = document.createElement("td");
		ranking.className = "table__cell";
		ranking.innerText = `${data.ranking} º`;

		const flag = document.createElement("div");
		flag.className = "table__country";
		const country = document.createElement("td");
		country.className = "table__cell";

		const spanCountry = document.createElement("span");
		spanCountry.innerText = data.country;
		spanCountry.className = "table__country-span";

		const flagImg = document.createElement("img");
		flagImg.src = data.flag_url;
		flagImg.className = "table__flag-image";

		country.append(flag);
		flag.append(flagImg, spanCountry);

		const gold = document.createElement("td");
		gold.className = "table__cell";
		gold.innerText = data.medal_gold;

		const silver = document.createElement("td");
		silver.className = "table__cell";
		silver.innerText = data.medal_silver;

		const bronze = document.createElement("td");
		bronze.className = "table__cell";
		bronze.innerText = data.medal_bronze;

		const total = document.createElement("td");
		total.className = "table__cell";
		total.innerText = data.total;

		row.append(ranking, country, gold, silver, bronze, total);
		return row;
	}
}

export { createDOM };
