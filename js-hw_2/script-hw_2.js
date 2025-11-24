'use strict';
const name = (prompt('What is your name?'));
const answer = confirm(`Do you want to see the greeting, (${name})?`);
if (answer) {
    alert(`Hello, (${name})! How are you?`);
}