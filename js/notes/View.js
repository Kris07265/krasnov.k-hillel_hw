class View {
    notesContainer = document.querySelector('[data-notesContainer]');
    notesForm = document.querySelector('[data-notesForm]');
    errorMassage = document.querySelector('[data-errorMassage]');
    notesErrorToast = new bootstrap.Toast('[data-errorToast]');
    editTitleModal = new bootstrap.Modal('#editTitleModal', {backdrop: 'static', keyboard: false});
    editTitleForm = null;
    totalNotes = document.querySelector('[data-totalNotes]');
    importantNotes = document.querySelector('[data-importantNotes]');

    constructor() {
        this.editTitleForm = this.editTitleModal._element.querySelector('#editTitleForm');
    }

    addNoNotes(){
        this.notesContainer.innerHTML = '<h2 class="text-center p-3 rounded bg-info text-white">No notes yet</h2>';
    }

    removeNoNotes(){
        this.notesContainer.innerHTML = null;
    }

    onLoadRender(data){
        this.notesContainer.innerHTML = null;
        if (!data.length){
            this.addNoNotes()
        }
        else {
            data.forEach((note) => {
                const template = this.createNote(note);
                this.notesContainer.prepend(template);
            })
        }
    }

    createNote({id, title, category, important, createdAt}){
        const wrapper = document.createElement('div');
        wrapper.classList.add('col-4', 'noteWrapper', 'border', 'border-success', 'm-1', 'p-1');
        wrapper.dataset.id = id;
        wrapper.innerHTML = `
          <div class="noteHeading d-flex justify-content-between">
              <span class="badge text-bg-primary">#${id}</span>
              <h6 class="badge text-bg-info">${category}</h6>
          </div>
          <div class="noteTitle">
           <span class="badge text-bg-light p-2 mt-1">${title}</span>
           <button class="btn btn-sm bg-light" data-editTitleBtn><i class="bi bi-pencil-fill"></i></button>
          </div>
          <div class="noteCreatedAt">${createdAt}</div>
          <hr>
          <button class="btn btn-sm btn-danger" data-remove-btn>remove</button>
          <button class="btn btn-sm btn-primary" data-mark-btn>Mark Important</button>`

        return wrapper;
    }

    renderNote(note){
        const noteTemplate = this.createNote(note);
        this.notesContainer.prepend(noteTemplate);
    }

    removeNote(id){
            this.notesContainer.querySelector(`[data-id='${id}']`).remove();
    }

    updateNoteImportant(id, important){
        const wrapper = this.notesContainer.querySelector(`[data-id='${id}']`);
        const markImportantBtn = wrapper.querySelector('[data-mark-btn]');
        if (important) {
            wrapper.classList.add('bg-warning');
            markImportantBtn.textContent = 'Unmark Important';
        } else {
            wrapper.classList.remove('bg-warning');
            markImportantBtn.textContent = 'Mark Important';
        }
    }

    showError(message){
        this.errorMassage.textContent = message;
    }

    clearError() {
        this.errorMassage.textContent = '';
    }

    clearAll() {
        this.notesContainer.innerHTML = null;
        this.addNoNotes();
    }

    openEditModal(note){
        this.editTitleForm.dataset.id = note.id;
        const input = this.editTitleForm.querySelector('#editTitle');
        input.value = note.title;
        this.editTitleModal.show();
    }

    notesCounter(data) {
        const totalNotesCount = data.length;
        const importantNotesCount = data.filter(note => note.important).length;
        this.totalNotes.textContent = `Total Notes: ${totalNotesCount}`;
        this.importantNotes.textContent = `Important Notes: ${importantNotesCount}`;
    }
}
export default View;