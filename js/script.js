'use strict';
const form = document.querySelector('[data-form]');
const email = document.querySelector('[data-email]');
const password = document.querySelector('[data-password]');
const passwordConfirm = document.querySelector('[data-passwordConfirm]');
const age = document.querySelector('[data-age]');
const city = document.querySelector('[data-city]');
const agree = document.querySelector('[data-agree]');
const reset = document.querySelector('[data-reset]');
const submit = document.querySelector('[data-submit]');
const validEmail = (email) => {
    if (email === '') {
        return "Please enter email address";
    }
    if (!email.includes('@')) {
        return "Please enter a valid email address";
    }
};
const validPassword = (password) => {
    if (!password) {
        return "Please enter your password";
    }
    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }
    if(!/[0-9]/.test(password)) {
        return "Enter minimum one number"
    }
    if (!/[a-zA-Z]/.test(password)){
        return "Enter minimum one letter"
    }
}
const validPasswordConfirm = (password, passwordConfirm) => {
    if (password !== passwordConfirm) {
        return "Passwords don't match"
    }
}
const validAge = (age) => {
    if (!age) {
        return "Please enter age number"
    }
    if (Number(age) < 16 || Number(age) > 120) {
        return "Available ages from 16 to 120"
    }
}
const validCity = (city) => {
    if (!city) {
        return "Please enter city"
    }
}
const validAgree = (agree) => {
    if (!agree.checked) {
        return "Please enter agree"
    }
}

const events = ['input', 'focusout'];
events.forEach(eType =>{
    form.addEventListener(eType, e => {
        const errorMessage = e.target.closest(".form__item").querySelector('.error-message');
        if (e.target.name === 'email') {
            errorMessage.textContent = validEmail(e.target.value);
        }
        if (e.target.name === 'password') {
            errorMessage.textContent = validPassword(e.target.value);
        }
        if (e.target.name === 'confirm-password') {
            errorMessage.textContent = validPasswordConfirm(password.value, e.target.value);
        }
        if (e.target.name === 'age') {
            errorMessage.textContent = validAge(e.target.value);
        }
        if (e.target.name === 'city') {
            errorMessage.textContent = validCity(e.target.value);
        }
        if (e.target.name === 'agree') {
            errorMessage.textContent = validAgree(e.target);
        }
    });
});

form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(form);
    const errorEmail = validEmail(email.value);
    const errorPassword = validPassword(password.value);
    const errorPasswordConfirm = validPasswordConfirm(password.value, passwordConfirm.value);
    const errorAge = validAge(age.value);
    const errorCity = validCity(city.value);
    const errorAgree = validAgree(agree.checked);
});