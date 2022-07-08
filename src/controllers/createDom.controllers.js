import { Api } from "./api.controllers.js";
class createDOM {
	static createTableBody(data){
		const tbody = document.querySelector(".table__body");
		tbody.innerText = "";
		data.forEach((country) => {
			const row = this.createTemplateRow(country);
			tbody.appendChild(row);
		});
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
