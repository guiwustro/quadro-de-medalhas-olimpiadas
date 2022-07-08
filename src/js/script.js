import { Api } from "../controllers/api.controllers.js";
import { Filter } from "../controllers/filter.controllers.js";
import { createDOM } from "../controllers/createDom.controllers.js";

//Inicia o arquivo com essa data-base
const data = await Filter.calculateRank();

const form = document.querySelector(".search__form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	Filter.filterByCountry();
});

const positionBtn = document.querySelector(".position__order");
positionBtn.addEventListener("click", (event) => {
	Filter.orderList("ranking");
});

const goldBtn = document.querySelector(".gold__order");
goldBtn.addEventListener("click", (event) => {
	Filter.orderList("medal_gold");
});

const silverBtn = document.querySelector(".silver__order");
silverBtn.addEventListener("click", (event) => {
	Filter.orderList("medal_silver");
});

const bronzeBtn = document.querySelector(".bronze__order");
bronzeBtn.addEventListener("click", (event) => {
	Filter.orderList("medal_bronze");
});

const totalBtn = document.querySelector(".total__order");
totalBtn.addEventListener("click", (event) => {
	Filter.orderList("total");
});
createDOM.createTableBody(data);
