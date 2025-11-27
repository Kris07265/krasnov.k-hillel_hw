'use strict';
const user = {
    name:"Alex",
    age: 25,
    city: "Kyiv",
    job: "Frontend"
};
const {name, age, city, job} = user;
const shortInfo = {
    name,
    city,
};
console.log(shortInfo);
const {name: fullName, city: userLocation} = user;
const renamed = {
    fullName,
    userLocation,
};
console.log(renamed);