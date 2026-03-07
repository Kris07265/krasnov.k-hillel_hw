import Model from "./modules/Model.js";
import View from "./modules/View.js";
import Controller from "./modules/Controller.js";
const modelInstance = new Model();
const viewInstance = new View();

const controllerInstance = new Controller(modelInstance, viewInstance);
controllerInstance.init()