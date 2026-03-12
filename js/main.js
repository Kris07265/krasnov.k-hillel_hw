import UsersModel from "./models/UsersModel.js";
import UsersView from "./views/UsersView.js";
import UsersController from "./controllers/UsersController.js";
const modelInstance = new UsersModel();
const viewInstance = new UsersView();

const controllerInstance = new UsersController(modelInstance, viewInstance);
controllerInstance.init()