import Controller from "./notes/Controller.js";
import Model from "./notes/Model.js";
import View from "./notes/View.js";
const notesValidateModel = {
    title: 'string',
    category: ['work', 'study', 'personal'],
    important: 'boolean',
    createdAt: 'string',
}

const modelInstance = new Model('notes', notesValidateModel);
const viewInstance = new View();

const controllerInstance = new Controller(modelInstance, viewInstance);
controllerInstance.init()