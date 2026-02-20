class View {
    notesContainer = document.querySelector('[data-notesContainer]');
    notesForm = document.querySelector('[data-notesForm]');
    errorMassageTitle = document.querySelector('[data-error-for="title"]');

    constructor() {}

    addNoNotes(){
        this.notesContainer.innerHTML = `<h2 class="text-center p-3 mb-5 rounded bg-primary text-white">No notes yet</h2>`
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
          <div class="noteCategory badge text-bg-light">${title}</div>
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

    clearAll() {
        this.notesContainer.innerHTML = null;
        this.addNoNotes();
    }
}
export default View;