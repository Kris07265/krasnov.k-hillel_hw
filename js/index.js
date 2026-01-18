'use strict';

const user = {
    name: 'Vova',
    age: 20,
}

let {name} = user; // Vova
let {age: year} = user; // 20


// IFFE
// Global Scope
(function(){
    // Just for example
    const validationRegExps = {
        'fullName': /^(?=.{2,80}$)[\p{L}]+(?:[ '\-][\p{L}]+){0,3}$/u,
        'phone': /^\+[1-9]\d{7,14}$/,
        'address': /^(?=.{5,120}$)[\p{L}\d][\p{L}\d\s.,'’\-\/#]+$/u
    }

    const errorMessages = {
        'fullName': 'Full Name Required',
        'phone': 'Phone Number Required',
        'address': 'Address Required',
    }

    // UI Handling

    const uiContactsListHandler = () => {
        const contactsAlert = document.querySelector('[data-contacts-alert]');
        const contactsList = document.querySelector('[data-contacts-list]');

        const createItemTemplate = ({id, fullName, phone, address}) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between');
            li.dataset.id = id;
            li.dataset.name = fullName;
            li.innerHTML = `${fullName} | ${phone} | ${address}`;
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-danger');
            btn.textContent = "remove";
            btn.dataset.action = "remove";
            btn.setAttribute('data-add-contact-modal-btn', '');
            li.append(btn);

            return li;
        }

        const addElement = (data) => {
            const element = createItemTemplate(data)
            contactsList.prepend(element)
            contactsList.classList.remove('d-none');
            contactsAlert.classList.add('d-none');
        }

        const removeElement = (id) => {
            const removeLi = document.querySelector(`li[data-id=\'${id}\']`);
            removeLi.remove();
        }

        return {
            addElement,
            removeElement,
        }

    }
    const listHandler = uiContactsListHandler()


    // General Variables
    const toastAdded = new bootstrap.Toast(document.querySelector('#contactAdded'));
    const toastRemoved = new bootstrap.Toast(document.querySelector('#contactRemoved'));
    const addContactModalSelector = '#addContactModal';
    const addContactModal = new bootstrap.Modal(addContactModalSelector, {
        keyboard: false,
        backdrop: 'static'
    });
    const modalTrigger = document.querySelector('[data-add-contact-modal-btn]');

    const removeContactModalSelector = '#removeContactModal';
    const removeContactModal = new bootstrap.Modal(removeContactModalSelector, {
        keyboard: true,
        backdrop: true
    });
    const removeContactConfirmBtn = document.querySelector('[data-remove-contact-confirm-btn]');
    const removeContactCancelBtn = document.querySelector('[data-remove-contact-cancel-btn]');

    let contactIdToRemove = null;



    // State management
    const contactsManagement = () => {
        const contacts = [];

        const getContacts = () => {
            return structuredClone(contacts);
        }

        const addContact = (data) => {
            const contactWithId = {
                id: Date.now(),
                ...data
            };
            contacts.push(contactWithId);
            console.log(data)
        }

        const removeContact = (id) => {
            const removeIndex = contacts.findIndex(contact => contact.id === id);
            contacts.splice(removeIndex, 1);
        }


        return {
            getContacts,
            addContact,
            removeContact
        }
    }
    const contactService = contactsManagement();



    // Events
    modalTrigger.addEventListener('click', () => {
        addContactModal.show()
    })

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
    document.querySelector("[data-contacts-list]").addEventListener('click', e => {
        if (e.target.closest('[data-action="remove"]')){
            const contactToRemove = e.target.closest('li[data-id]');
            contactIdToRemove = contactToRemove.dataset.id;
            const contactName = contactToRemove.dataset.name;
            const modalBodyText = document.querySelector('[data-modal-body-text]');
            modalBodyText.textContent = `Are you sure you want to remove contact ${contactName}?`;
            removeContactModal.show()
        }
    });
    removeContactConfirmBtn.addEventListener('click', e => {
        contactService.removeContact(contactIdToRemove);
        listHandler.removeElement(contactIdToRemove);
        removeContactModal.hide();
        contactIdToRemove = null;
        toastRemoved.show();
    });
    removeContactCancelBtn.addEventListener('click', e => {
        contactIdToRemove = null;
        removeContactModal.hide();
    })
})()
// Global Scope