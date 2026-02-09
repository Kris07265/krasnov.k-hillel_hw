'use strict';
import {profileModel} from "./profileModel.js";
import {
    form, inputFirstName, inputLastName, inputEmail, freezeBtn, freezeMassage, viewCard, errorBlock, showDescBtn,
    descriptorsBlock
} from "./variables.js";
import {
    showErrors,
    showCard,
    clearErrors,
    clearCard,
    profileModelFreeze,
    showDescriptors,
    clearDescriptors
} from "./viewFunctions.js";
import {events} from "./events.js";

events(profileModel, form, inputFirstName, inputLastName, inputEmail, freezeBtn, freezeMassage, viewCard, errorBlock, showDescBtn, descriptorsBlock, showDescriptors, clearDescriptors, showErrors, showCard, clearErrors, clearCard, profileModelFreeze);