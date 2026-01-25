'use strict';
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
        if (removeIndex === -1) {
            return null;
        }

        const removed = contacts.splice(removeIndex, 1);
        return removed[0];
    }


    return {
        getContacts,
        addContact,
        removeContact
    }
}
export const contactService = contactsManagement();