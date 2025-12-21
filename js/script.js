'use strict';

const user1 = {
    prefix: 'Mr.',
    firstName: 'John',
    lastName: 'Doe',
}

const user2 = {
    prefix: 'Mrs.',
    firstName: 'Alice',
    lastName: 'Cooper',
}

const getName = function (suffix = null) {
    console.log(this)
    const conName = `${this.prefix} ${this.firstName} ${this.lastName}`;

    if(suffix) {
        return conName + ' | ' + suffix;
    }

    return conName;
}
Function.prototype.myApply = function(argThis, args) {
    argThis.temp = this;
    let result = argThis.temp(...args);
    delete argThis.temp;
    return result;
}
console.log(getName.myApply(user1, ['Bad Boy']));
console.log(getName.myApply(user2, ['Good Girl']));

Function.prototype.myCall = function(argThis, ...args) {
    argThis.temp = this;
    let result = argThis.temp(...args);
    delete argThis.temp;
    return result;
}
console.log(getName.myCall(user1, 'Bad Boy'));
console.log(getName.myCall(user2, 'Good Girl'));