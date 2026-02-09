'use strict';

export function showErrors(errorBlock, message) {
    errorBlock.textContent = message;
}
export function clearErrors(errorBlock) {
    errorBlock.textContent = "";
}
export function showCard(profileModel, viewCard){
    viewCard.innerHTML = `
    <p>${profileModel.fullName}</p>
    <p>${profileModel.email}</p>
    <p>${new Date()}</p>`;
}
export function clearCard(viewCard){
    viewCard.textContent = "";
}
export function profileModelFreeze(profileModel){
    Object.freeze(profileModel);
}
export function showDescriptors(profileModel, descriptorsBlock){
    const descriptors = Object.getOwnPropertyDescriptors(profileModel);
    descriptorsBlock.textContent = JSON.stringify(descriptors, null, 4);
}
export function clearDescriptors(descriptorsBlock){
    descriptorsBlock.textContent = "";
}