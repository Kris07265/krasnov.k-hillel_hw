'use strict';
export const toastAdded = new bootstrap.Toast(document.querySelector('#contactAdded'));
export const toastRemoved = new bootstrap.Toast(document.querySelector('#contactRemoved'));
const addContactModalSelector = '#addContactModal';
export const addContactModal = new bootstrap.Modal(addContactModalSelector, {
    keyboard: false,
    backdrop: 'static'
});
export const modalTrigger = document.querySelector('[data-add-contact-modal-btn]');

const removeContactModalSelector = '#removeContactModal';
export const removeContactModal = new bootstrap.Modal(removeContactModalSelector, {
    keyboard: true,
    backdrop: true
});
export const removeContactConfirmBtn = document.querySelector('[data-remove-contact-confirm-btn]');
export const removeContactCancelBtn = document.querySelector('[data-remove-contact-cancel-btn]');

let contactIdToRemove = null;
export const setContactIdToRemove = (id) => contactIdToRemove = id;
export const getContactIdToRemove = () => contactIdToRemove;