
class Controller {
    #model = null;
    #view = null;

    constructor(model, view) {
        this.#model = model;
        this.#view = view;
    }

    init() {
        document.addEventListener('DOMContentLoaded', async () => {
            await this.#handleOnLoad();
        });
        this.#view.addUserBtn.addEventListener('click', () => this.#handleAddClick());
        this.#view.userForm.addEventListener('submit', (e) => this.#handleCreateSubmit(e));
    }

    #handleOnLoad = async () => {
        try {
            this.#view.setLoading(true);
            const data = await this.#model.getAll();
            this.#view.renderTable(data);
        }
        catch (error) {
            this.#view.showError(error.message);
        }
        finally {
            this.#view.setLoading(false);
        }
    }

    #handleAddClick = () => {
        this.#view.openCreateModal();
    }

    #handleCreateSubmit = async (e) => {
        e.preventDefault();
        const data = this.#view.getFormData();
        if (!this.#view.validateForm()) return;
        try {
            this.#view.setLoading(true);
            const newUser = await this.#model.create(data);
            const users = this.#model.getUsers();
            this.#view.renderTable(users);
            this.#view.closeUserModal();
        }
        catch (error) {
            this.#view.showError(error.message);
        }
        finally {
            this.#view.setLoading(false);
        }
    }
}

export default Controller;