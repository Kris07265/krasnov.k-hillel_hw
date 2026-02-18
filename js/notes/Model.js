// InterfaceNote {
//     id: Number,
//     title: String,
//     category: "work" | "study" | "personal",
//     important: Boolean,
//     createdAt: String // ISO date
// }

class Model {
    #key = null;
    #validationModel = null;
    constructor(key, validationModel) {
        this.#key = key;
        this.#validationModel = validationModel;
    }

    #validateEntity(data) {
        const failedFields = []

        for(const key in data) {
            if(!this.#validationModel.hasOwnProperty(key)) {
                failedFields.push({key, message: `Field doesn't exist on validation model`});
                continue
            }

            if(Array.isArray(this.#validationModel[key]) && !this.#validationModel[key].includes(data[key])) {
                failedFields.push({key, message: `Field should be one of ${this.#validationModel[key]}`});
                continue
            }

            if(!Array.isArray(this.#validationModel[key]) && typeof data[key]  !== this.#validationModel[key]) {
                failedFields.push({key, message: `Field should be in type of ${this.#validationModel[key]}`});
            }

        }

        if(failedFields.length) {
            throw new Error(`Failed to validate entity: ${JSON.stringify(failedFields)}`);
        }


        return true;
    }

    #isElementExists(id) {
        const data = this.readAll();
        return data.some((item) => item.id === id);
    }

    #updateStorage(data) {
        const jsonToSave = JSON.stringify(data);
        localStorage.setItem(this.#key, jsonToSave);
    }

    create(data) {
        this.#validateEntity(data);
        const dataFromStorage = this.readAll();
        const dataToSave = {
            id: dataFromStorage.length ? dataFromStorage.at(-1).id + 1 : 1,
            ...data,
            important: false,
            createdAt: new Date().toISOString(),
        }
        dataFromStorage.push(dataToSave);
        this.#updateStorage(dataFromStorage);
        return dataToSave;
    }

    readAll() {
        const data = JSON.parse(localStorage.getItem(this.#key));
        return !data ? [] : data;
    }

    toggleImportant(id) {
        if(!this.#isElementExists(id)) throw new Error(`Cannot toggle important entity with id ${id}`);
        const dataFromStorage = this.readAll();
        const itemToToggleImportant = dataFromStorage.find(item => item.id === id);
        itemToToggleImportant.important = !itemToToggleImportant.important;
        this.#updateStorage(dataFromStorage);
        return itemToToggleImportant;
    }

    delete(id) {
        if(!this.#isElementExists(id)) throw new Error(`Cannot delete entity with id ${id}`);
        const dataFromStorage = this.readAll();
        const itemToDelete = dataFromStorage.findIndex(item => item.id === id);
        const removedElement = dataFromStorage.splice(itemToDelete, 1)[0];
        this.#updateStorage(dataFromStorage);
        return removedElement;
    }

    clearAll() {
        localStorage.setItem(this.#key, JSON.stringify([]));
    }
}
export default Model;