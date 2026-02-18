import Controller from "./notes/Controller.js";
import Model from "./notes/Model.js";
import View from "./notes/View.js";
const NotesValidateModel = {
    title: 'string',
    category: ['work', 'study', 'personal'],
    important: 'boolean',
    createdAt: 'string',
}