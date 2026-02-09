'use strict';

export const profileModel = {
    _firstName: '',
    _lastName: '',
    _email: '',
    get fullName() {
        return this._firstName + ' ' + this._lastName
    },
    get email() {
        return this._email
    },
    set firstName(value) {
        if (value.length < 2) {
            throw new Error('First name should be at least 2 characters long');
        }
        this._firstName = value
    },
    set lastName(value) {
        if (value.length < 2) {
            throw new Error('Last name should be at least 2 characters long');
        }
        this._lastName = value
    },
    set email(value) {
        if (!value.includes("@") || !value.includes(".")) {
            throw new Error('The email must contain the symbols "@" and "."');
        }
        this._email = value
    }
}


