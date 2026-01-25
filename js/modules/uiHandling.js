'use strict';
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
export const listHandler = uiContactsListHandler()