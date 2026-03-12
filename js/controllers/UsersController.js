
class UsersController {
    #model = null;
    #view = null;
    #editingUserId = null;
    #deletingUserId = null;

    constructor(model, view) {
        this.#model = model;
        this.#view = view;
    }

    init() {
        document.addEventListener('DOMContentLoaded', async () =>  await this.#handleOnLoad());
        this.#view.addUserBtn.addEventListener('click', this.#handleAddClick);
        this.#view.userForm.addEventListener('submit', (e) => this.#handleFormSubmit(e));
        this.#view.usersTableBody.addEventListener('click', this.#handleEditClick);
        this.#view.usersTableBody.addEventListener('click', this.#handleDeleteClick);
        this.#view.deleteUserBtn.addEventListener('click', this.#handleDeleteConfirm);
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
        this.#editingUserId = null;
        this.#view.openCreateModal();
    }

    #handleEditClick = ({target}) => {
        const editBtn = target.closest('[data-edit-btn]');
        if (!editBtn) return;
        const id = +(editBtn.dataset.id);
        const user = this.#model.getUser(id);
        this.#editingUserId = id;
        this.#view.openEditModal(user);
    }

    #handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = this.#view.getFormData();
        if (!this.#view.validateForm()) return;
        try {
            this.#view.setLoading(true);
            if (this.#editingUserId) {
                await this.#model.update(this.#editingUserId, data);
            } else {
                await this.#model.create(data);
            }
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

    #handleDeleteClick = ({target}) => {
        const deleteBtn = target.closest('[data-delete-btn]');
        if (!deleteBtn) return;
        const id = +(deleteBtn.dataset.id);
        const user = this.#model.getUser(id);
        this.#deletingUserId = id;
        this.#view.openDeleteModal(user);
    }

    #handleDeleteConfirm = async () => {
        try {
            this.#view.setLoading(true);
            await this.#model.delete(this.#deletingUserId);
            const users = this.#model.getUsers();
            this.#view.renderTable(users);
            this.#view.deleteUserModal.hide();
        }
        catch (error) {
            this.#view.showError(error.message);
        }
        finally {
            this.#view.setLoading(false);
        }
    }
}

export default UsersController;