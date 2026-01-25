'use strict';

export const initUi = (modalTrigger, addContactModal, removeContactModal, setContactIdToRemove) =>{
    modalTrigger.addEventListener('click', () => {
        addContactModal.show()
    })

    document.querySelector("[data-contacts-list]").addEventListener('click', e => {
        if (e.target.closest('[data-action="remove"]')){
            const contactToRemove = e.target.closest('li[data-id]');
            setContactIdToRemove(Number(contactToRemove.dataset.id));
            const contactName = contactToRemove.dataset.name;
            const modalBodyText = document.querySelector('[data-modal-body-text]');
            modalBodyText.textContent = `Are you sure you want to remove contact ${contactName}?`;
            removeContactModal.show()
        }
    });
}
export const initModalEvents = (contactService, listHandler, toastAdded, toastRemoved, addContactModal, removeContactModal, removeContactConfirmBtn, removeContactCancelBtn, setContactIdToRemove, getContactIdToRemove, validationRegExps, errorMessages) =>{
    addContactModal._element.querySelector(`form#add-contact-form`)
        .addEventListener('submit', evt => {
            evt.preventDefault();
            let formValidated = true;
            const inputs = evt.target.querySelectorAll('input, textarea');
            const data = Array.from(inputs).reduce((acc, input) => {
                const {name, value, parentElement: wrapper} = input;

                if(validationRegExps[name].test(value)) {
                    acc[name] = value
                } else {
                    const errBlock = document.createElement('div');
                    errBlock.innerHTML = errorMessages[name];
                    errBlock.classList.add('text-danger', 'error-validation');
                    wrapper.append(errBlock)
                    formValidated = false;
                }
                return acc;
            }, {})

            if(!formValidated) return null

            contactService.addContact(data);
            const savedContact = contactService.getContacts().at(-1)
            listHandler.addElement(savedContact)

            addContactModal.hide();
            toastAdded.show()
            evt.target.reset();
            document.querySelectorAll('.error-validation').forEach(item => item.remove())

        })

    removeContactConfirmBtn.addEventListener('click', () => {
        const removed = contactService.removeContact(getContactIdToRemove());
        if (!removed) {
            return;
        }
        listHandler.removeElement(getContactIdToRemove());
        removeContactModal.hide();
        setContactIdToRemove(null);
        toastRemoved.show();
    });
    removeContactCancelBtn.addEventListener('click', () => {
        setContactIdToRemove(null);
        removeContactModal.hide();
    })
}