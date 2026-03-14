class UsersView {
    constructor() {
        this.userModal = new bootstrap.Modal('#userModal', {backdrop: 'static', keyboard: false});
        this.deleteModalEl = document.getElementById('deleteUserModal');
        this.deleteUserModal = new bootstrap.Modal(this.deleteModalEl, {backdrop: 'static', keyboard: false});
        this.deleteUserBtn = document.getElementById('deleteUserBtn');
        this.errorToastEl = document.getElementById('errorToast'); // сам div
        this.errorToast = new bootstrap.Toast(this.errorToastEl);
        this.addUserBtn = document.getElementById('addUserBtn');
        this.usersTableBody = document.getElementById('usersTableBody');
        this.userForm = document.getElementById('userForm');
        this.inputName = document.getElementById('userName');
        this.inputEmail = document.getElementById('userEmail');
        this.inputPhone = document.getElementById('userPhone');
        this.inputCompany = document.getElementById('userCompany');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.searchInput = document.getElementById('searchInput');
        this.sortName = document.getElementById('sortName');
        this.sortIcon = document.getElementById('sortIcon');
        this.paginationContainer = document.getElementById('pagination');
    }

    renderPagination = (totalPages, currentPage) => {
        this.paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const paginationItem = document.createElement('li');
            paginationItem.classList.add('page-item');
            if (i === currentPage) paginationItem.classList.add('active');
            paginationItem.innerHTML = `<a class="page-link" href="#">${i}</a>`
            paginationItem.dataset.page = `${i}`;
            this.paginationContainer.appendChild(paginationItem);
        }
    }

    toggleSortIcon = (sortAsc) => {
        this.sortIcon.classList.remove("bi-sort-alpha-down", "bi-sort-alpha-up");
        if (sortAsc) {
            this.sortIcon.classList.add("bi", "bi-sort-alpha-down");
        } else {
            this.sortIcon.classList.add("bi", "bi-sort-alpha-up");
        }
    }

    renderTable = (users) => {
        this.usersTableBody.innerHTML = '';
        users.forEach((user) => {
            const singleUser = this.createUser(user);
            this.usersTableBody.append(singleUser);
        })
    }

    createUser = (user) => {
        const userRow = document.createElement('tr');
        userRow.innerHTML =`<td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone ? user.phone : ""}</td>
                            <td>${user.company ? user.company.name : ""}</td>
                            <td class="d-flex justify-content-between"><button class="btn btn-sm btn-primary" data-edit-btn data-id="${user.id}"><i class="bi bi-pencil-fill"></i></button><button class="btn btn-sm btn-danger" data-delete-btn data-id="${user.id}"><i class="bi bi-trash"></i></button></td>`

        return userRow;
    }

    openCreateModal = () => {
        const inputs = this.userForm.querySelectorAll('input');
        inputs.forEach((input) => {
            input.value = '';
        })
        this.userModal.show();
    }

    openEditModal = (user) => {
        this.inputName.value = user.name
        this.inputEmail.value = user.email
        this.inputPhone.value = user.phone ? user.phone : ""
        this.inputCompany.value = user.company ? user.company.name : ""
        this.userModal.show()
    }

    closeUserModal = () => {
        this.userForm.reset();
        this.userModal.hide();
    }

    openDeleteModal = (user) => {
        const deleteUserModalText = this.deleteModalEl.querySelector('#deleteUserModalText');
        deleteUserModalText.textContent = `Are you sure you want to delete user ${user.name}?`
        this.deleteUserModal.show();
    }

    getFormData = () => ({
        name: this.inputName.value,
        email: this.inputEmail.value,
        phone: this.inputPhone.value || '',
        company: { name: this.inputCompany.value || '' },
    })

    validateForm = () => {
        let isValid = true;
        const data = this.getFormData();

        const nameError = this.userForm.querySelector('[data-error-for="userName"]');
        if (!data.name) {
            this.inputName.classList.add('is-invalid');
            nameError.textContent = 'Name must not be empty';
            isValid = false;
        } else {
            this.inputName.classList.remove('is-invalid');
            nameError.textContent = '';
        }

        const emailError = this.userForm.querySelector('[data-error-for="userEmail"]');
        if (!data.email) {
            this.inputEmail.classList.add('is-invalid');
            emailError.textContent = 'Email must not be empty';
            isValid = false;
        } else if (!data.email.includes('@')) {
            this.inputEmail.classList.add('is-invalid');
            emailError.textContent = 'Email must contain @';
            isValid = false;
        } else {
            this.inputEmail.classList.remove('is-invalid');
            emailError.textContent = '';
        }

        return isValid;
    }

    setLoading = (isLoading) => {
        if (isLoading) {
            this.addUserBtn.disabled = true;
            this.loadingSpinner.classList.remove('d-none');
        } else {
            this.addUserBtn.disabled = false;
            this.loadingSpinner.classList.add('d-none');
        }
    }

    showError = (message) => {
        const toastBody = this.errorToastEl.querySelector('#errorToastText');
        toastBody.textContent = message;
        this.errorToast.show();
    }
}

export default UsersView;