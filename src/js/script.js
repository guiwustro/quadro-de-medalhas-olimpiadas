import { Api } from "../controllers/api.controllers.js";
import { Filter } from "../controllers/filter.controllers.js"
import { createDOM } from "../controllers/createDom.controllers.js";

//Inicia o arquivo com essa data-base
const data = await Filter.calculateRank();

createDOM.createTableBody(data);
