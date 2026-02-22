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
            this.#view.notesContainer.addEventListener('click', this.#toggleImportantHandler);
            this.#view.notesContainer.addEventListener('click', this.#editTitleHandler);
            this.#view.editTitleForm.addEventListener('submit', this.#editSubmitHandler);
            this.#view.notesFilter.addEventListener('click', this.#notesFilterHandler);
            this.#view.notesFilter.addEventListener('change', this.#notesFilterHandler);
        })
    }

    #notesFilterHandler = (event) => {
        const allNotes = this.#model.readAll();
        const filteredImportantNotes = allNotes.filter(note => note.important);
        if (event.type === 'click') {
            if (event.target.closest('[data-notesFilterAll]')) this.#view.onLoadRender(allNotes);
            if (event.target.closest('[data-notesFilterImportant]')) this.#view.onLoadRender(filteredImportantNotes);
        }
        if (event.type === 'change') {
            if (event.target.closest('[data-notesFilterSelectCategory]')){
                const selectedCategory = event.target.value;
                const filteredCategoryNotes = allNotes.filter(note => note.category === selectedCategory);
                if (selectedCategory === 'all') {
                    this.#view.onLoadRender(allNotes);
                } else {
                    this.#view.onLoadRender(filteredCategoryNotes);
                  }
            }

            if (event.target.closest('[data-notesSortSelect]')){
                const selectedSort = event.target.value;
                const sortedNewestFirst = [...allNotes].sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateA - dateB;
                });
                const sortedOldestFirst = [...allNotes].sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });
                if (selectedSort === 'newest') this.#view.onLoadRender(sortedNewestFirst);
                if (selectedSort === 'oldest') this.#view.onLoadRender(sortedOldestFirst);
            }
        }
    }

    #onLoadHandler = () => {
        const savedData = this.#model.readAll();
        this.#view.onLoadRender(savedData);
        this.#view.notesCounter(savedData);
    }

    #createNoteHandler = (data) => {
        if(!this.#model.readAll().length) {
            this.#view.removeNoNotes()
        }
        try {
            const savedData = this.#model.create(data);
            this.#view.renderNote(savedData);
            this.#view.clearError();
            this.#view.notesCounter(this.#model.readAll());
        }
        catch(e) {
            this.#view.showError(e.message);
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
        this.#view.notesCounter(this.#model.readAll());
    }

    #toggleImportantHandler = ({target}) => {
        const markBtn = target.closest('[data-mark-btn]');
        if (!markBtn) return;

        const wrapper = markBtn.closest('.noteWrapper');
        if (!wrapper) return;
        const id = +wrapper.dataset.id;

        const updatedNote = this.#model.toggleImportant(id);
        this.#view.updateNoteImportant(updatedNote.id, updatedNote.important);
        this.#view.notesCounter(this.#model.readAll());
    }

    #clearAllNotes = () => {
        if(!this.#model.readAll().length) {
            this.#view.notesErrorToast.show();
            return
        }

        this.#model.clearAll();
        this.#view.clearAll();
        this.#view.addNoNotes();
        this.#view.notesCounter(this.#model.readAll());
    }

    #editTitleHandler = ({target}) => {
        const editBtn = target.closest('[data-editTitleBtn]');
        if (!editBtn) return;
        const wrapper = editBtn.closest('[data-id]');
        const id = +wrapper.dataset.id;
        const note = this.#model.read(id);
        this.#view.openEditModal(note);
    }

    #editSubmitHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = +form.dataset.id;
        const title = form.title.value;
        const oldNote = this.#model.read(id);
        this.#model.update(id, {
            title,
            category: oldNote.category,
            important: oldNote.important,
            createdAt: oldNote.createdAt
        });
        this.#view.onLoadRender(this.#model.readAll());
        this.#view.editTitleModal.hide();
    }
}
export default Controller;