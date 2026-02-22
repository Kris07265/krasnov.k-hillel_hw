
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
            if (key === 'title' && (!data[key] || data[key].trim().length < 3)) {
                failedFields.push({key, message: `Field must contain at least 3 letters`});
            }

            if(Array.isArray(this.#validationModel[key]) && !this.#validationModel[key].includes(data[key])) {
                failedFields.push({key, message: `Field should be one of ${this.#validationModel[key]}`});
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

    update(id, data) {
        this.#validateEntity(data)
        if(!this.#isElementExists(id)) throw new Error(`Cannot update entity with id ${id}`);
        const dataFromStorage = this.readAll();
        const itemToUpdateIndex = dataFromStorage.findIndex(item => item.id === id);
        dataFromStorage[itemToUpdateIndex] = { id, ...data }
        this.#updateStorage(dataFromStorage);

        return dataFromStorage[itemToUpdateIndex];
    }

    create(data) {
        this.#validateEntity(data);
        const dataFromStorage = this.readAll();
        const dataToSave = {
            id: dataFromStorage.length ? dataFromStorage.at(-1).id + 1 : 1,
            ...data,
            important: false,
            createdAt: new Date(),
        }
        dataFromStorage.push(dataToSave);
        this.#updateStorage(dataFromStorage);
        return dataToSave;
    }

    readAll() {
        const data = JSON.parse(localStorage.getItem(this.#key));
        return !data ? [] : data;
    }

    read(id) {
        if(!this.#isElementExists(id)) throw new Error(`Cannot read entity with id ${id}`);
        const dataFromStorage = this.readAll();
        return dataFromStorage.find(item => item.id === id);
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