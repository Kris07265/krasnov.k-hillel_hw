'use strict';

import {toastAdded, toastRemoved, addContactModal, modalTrigger, removeContactModal, removeContactConfirmBtn, removeContactCancelBtn, setContactIdToRemove, getContactIdToRemove} from './modules/generalVar.js';
import {contactService} from './modules/stateManagement.js';
import {listHandler} from './modules/uiHandling.js';
import {validationRegExps, errorMessages} from './modules/validation.js';
import {initUi, initModalEvents} from "./modules/events.js";
initUi(modalTrigger, addContactModal, removeContactModal, setContactIdToRemove)
initModalEvents(contactService, listHandler, toastAdded, toastRemoved, addContactModal, removeContactModal, removeContactConfirmBtn, removeContactCancelBtn, setContactIdToRemove, getContactIdToRemove, validationRegExps, errorMessages)