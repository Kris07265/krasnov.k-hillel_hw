class View {
    constructor() {
        this.addUserModal = new bootstrap.Modal('#addUserModal', {backdrop: 'static', keyboard: false});
        this.editUserModal = new bootstrap.Modal('#editUserModal', {backdrop: 'static', keyboard: false});
        this.deleteUserModal = new bootstrap.Modal('#deleteUserModal', {backdrop: 'static', keyboard: false});
        this.errorToast = new bootstrap.Toast('#errorToast');
    }
}

export default View;