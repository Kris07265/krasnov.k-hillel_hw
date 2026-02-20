class Controller {
    #model = null;
    #view = null;

    constructor(model, view) {
        this.#model = model;
        this.#view = view;
    }

    init(){
        document.addEventListener('DOMContentLoaded', () =>{
            this.#onLoadHandler();
            this.#view.notesForm.addEventListener('submit', this.#submitHandler);
            this.#view.notesForm.addEventListener('click', (e) => {
                if (e.target.closest('[data-clearAllBtn]')) this.#clearAllNotes()
            });
            this.#view.notesContainer.addEventListener('click', this.#removeNoteHandler);
            this.#view.notesContainer.addEventListener('click', this.#toggleImportantHandler)
        })
    }

    #onLoadHandler = () => {
        const savedData = this.#model.readAll();
        this.#view.onLoadRender(savedData);
    }

    #createNoteHandler = (data) => {
        if(!this.#model.readAll().length) {
            this.#view.removeNoNotes()
        }
        try {
            const savedData = this.#model.create(data);
            this.#view.renderNote(savedData);
        }
        catch(e) {
            alert(e.message);
        }
    }

    #submitHandler = (e) => {
        e.preventDefault();
        const {target: form} = e;
        const formData = {}
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(({name, value}) => formData[name] = value);
        this.#createNoteHandler(formData);
        form.reset();
    }

    #removeNoteHandler = ({target}) => {
        if(!target.closest('[data-remove-btn]')) return;
        const id = +target.closest('[data-id]').getAttribute('data-id');
        const removedElement = this.#model.delete(id);
        this.#view.removeNote(removedElement.id)

        if(!this.#model.readAll().length) {
            this.#view.addNoNotes();
        }
    }

    #toggleImportantHandler = ({target}) => {
        const markBtn = target.closest('[data-mark-btn]');
        if (!markBtn) return;

        const wrapper = markBtn.closest('.noteWrapper');
        if (!wrapper) return;
        const id = +wrapper.dataset.id;

        const updatedNote = this.#model.toggleImportant(id);
        this.#view.updateNoteImportant(updatedNote.id, updatedNote.important);
    }

    #clearAllNotes = () => {
        if(!this.#model.readAll().length) {
            return
        }

        this.#model.clearAll()
        this.#view.clearAll()
        this.#view.addNoNotes()
    }
}
export default Controller;