
class UsersController {
    #model = null;
    #view = null;
    #editingUserId = null;
    #deletingUserId = null;
    #sortNameAscending = true;
    #currentPage = 1;
    #usersPerPage = 5;

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
        this.#view.searchInput.addEventListener('input', this.#handleSearch);
        this.#view.sortName.addEventListener('click', this.#handleSortByName);
        this.#view.paginationContainer.addEventListener('click', (e) =>this.#handlePageChange(e));
    }

    #getUsersForPage = (users = null) => {
        const allUsers = users ? users : this.#model.getUsers();
        const start = (this.#currentPage - 1) * this.#usersPerPage;
        const end = start + this.#usersPerPage;
        return allUsers.slice(start, end);
    }

    #getTotalPages = (users = null) => {
        const allUsers = users ? users : this.#model.getUsers();
        return Math.ceil(allUsers.length / this.#usersPerPage);
    }

    #handlePageChange = (e) => {
        e.preventDefault();
        const paginationEl = e.target.closest('li');
        if (!paginationEl) return;
        this.#currentPage = +paginationEl.dataset.page;
        const pageUsers = this.#getUsersForPage();
        this.#view.renderTable(pageUsers);
        this.#view.renderPagination(this.#getTotalPages(), this.#currentPage);
    }

    #handleOnLoad = async () => {
        try {
            this.#view.setLoading(true);
            await this.#model.getAll();
            const pageUsers = this.#getUsersForPage();
            this.#view.renderTable(pageUsers);
            this.#view.renderPagination(this.#getTotalPages(), this.#currentPage);
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
                this.#currentPage = this.#getTotalPages();
            }
            const pageUsers = this.#getUsersForPage();
            this.#view.renderTable(pageUsers);
            this.#view.renderPagination(this.#getTotalPages(), this.#currentPage);
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
            if (this.#currentPage > this.#getTotalPages()) {
                this.#currentPage = this.#getTotalPages();
            }
            const pageUsers = this.#getUsersForPage();
            this.#view.renderTable(pageUsers);
            this.#view.renderPagination(this.#getTotalPages(), this.#currentPage);
            this.#view.deleteUserModal.hide();
        }
        catch (error) {
            this.#view.showError(error.message);
        }
        finally {
            this.#view.setLoading(false);
        }
    }

    #handleSortByName = () => {
        const users = this.#model.getUsers();
        const sortedUsers = users.sort((a, b) => {
            if (this.#sortNameAscending) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        this.#view.toggleSortIcon(this.#sortNameAscending);
        this.#sortNameAscending = !this.#sortNameAscending;
        const pageUsers = this.#getUsersForPage(sortedUsers);
        this.#view.renderTable(pageUsers);
        this.#view.renderPagination(this.#getTotalPages(sortedUsers), this.#currentPage);
    }

    #handleSearch = () => {
        const value = this.#view.searchInput.value.toLowerCase();
        const users = this.#model.getUsers();
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        );
        this.#currentPage = 1;
        const pageUsers = this.#getUsersForPage(filteredUsers);
        this.#view.renderTable(pageUsers);
        this.#view.renderPagination(this.#getTotalPages(filteredUsers), this.#currentPage);
    }
}

export default UsersController;