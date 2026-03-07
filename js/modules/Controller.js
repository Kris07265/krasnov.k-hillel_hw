
class Controller {
    #model = null;
    #view = null;

    constructor(model, view) {
        this.#model = model;
        this.#view = view;
    }

    async init() {}
}

export default Controller;