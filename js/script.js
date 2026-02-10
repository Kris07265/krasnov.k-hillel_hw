'use strict';

const user = {
    _firstName: null,
    _lastName: null,
    _createdAt: new Date(),
    get fullName() {
        return this._firstName + ' ' + this._lastName;
    },
    set fullName(fullName) {
        if (typeof fullName !== 'string') {
            throw new Error("fullName must be a string");
        }
        const twoWords = fullName.trim().split(/\s+/);
        if (twoWords.length < 2){
            throw new Error("Full name must contain at least 2 words");
        }
        if (!twoWords.every(word => word.length >= 2)){
            throw new Error("Each word must have at least 2 characters");
        }

        this._firstName = twoWords[0];
        this._lastName  = twoWords[1];

    },

    lockProfile() {
        Object.seal(this);
    },

    lockHard(){
        Object.freeze(this);
    }
}
Object.defineProperties(user, {
    _firstName: {
        enumerable: false,
    },
    _lastName: {
        enumerable: false,
    },
    _createdAt: {
        writable: false,
        configurable: false,
    },
    fullName:{
        configurable: false,
        enumerable: true,
    }
});


console.log(Object.getOwnPropertyDescriptors(user));
user.lockProfile();
console.log(Object.isSealed(user));
console.log(user.age = 25);
console.log(user._createdAt = 123);
console.log(delete user.fullName);
user._firstName = "John";
console.log(user._firstName);
user.lockHard()
user._firstName = "Alex";
console.log(user._firstName);