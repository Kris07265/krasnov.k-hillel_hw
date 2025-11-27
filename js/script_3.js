'use strict';
const people = [
    { name: "Anna", age: 22 },
    { name: "Oleg", age: 31 },
    { name: "Maria", age: 27 }
];
const [firstPerson, secondPerson, thirdPerson] = people;
const firstPersonName = firstPerson.name;
console.log(firstPersonName);
let oldest = firstPerson;
if (secondPerson.age > firstPerson.age){
    oldest = secondPerson;
}
else
    if (thirdPerson.age > secondPerson.age){
        oldest = thirdPerson;
    }
console.log(oldest);
const ageSummary = {
    total: people[0].age + people[1].age + people[2].age,
    average: (people[0].age + people[1].age + people[2].age) / 3
};
console.log(ageSummary);



