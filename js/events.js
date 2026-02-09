'use strict';



export const events = (profileModel, form, inputFirstName, inputLastName, inputEmail, freezeBtn, freezeMassage, viewCard, errorBlock, showDescBtn, descriptorsBlock, showDescriptors,
                       clearDescriptors, showErrors, showCard, clearErrors, clearCard, profileModelFreeze) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            profileModel.firstName = inputFirstName.value;
            profileModel.lastName = inputLastName.value;
            profileModel.email = inputEmail.value;
            inputFirstName.classList.remove('invalid');
            inputLastName.classList.remove('invalid');
            inputEmail.classList.remove('invalid');
            clearErrors(errorBlock);
            showCard(profileModel, viewCard);
        } catch (error) {
            showErrors(errorBlock, error.message);
            if (error.message.includes("First name")) inputFirstName.classList.add('invalid');
            if (error.message.includes("Last name")) inputLastName.classList.add('invalid');
            if (error.message.includes("email")) inputEmail.classList.add('invalid');
            clearCard(viewCard);
            clearDescriptors(descriptorsBlock);
        }
    })

    form.addEventListener('click', (e) => {
        if (e.target.closest("[data-freezeBtn]")) {
            profileModelFreeze(profileModel);
            showErrors(errorBlock,freezeMassage);
        }
        if (e.target.closest("[data-showDescBtn]")) {
            console.log(descriptorsBlock);
            showDescriptors(profileModel, descriptorsBlock);
        }
    });
}