'use strict';
import {Student} from "./student.js";

const firstStudent = new Student("Ivan Petrov", 2002);
console.log(firstStudent);
console.log(firstStudent.getAge());
firstStudent.present();
firstStudent.present();
firstStudent.present();
firstStudent.mark(10);
firstStudent.mark(10);
firstStudent.mark(9);
console.log(firstStudent.summary());

const secondStudent = new Student("Oleg Ivanov", 2006);
console.log(secondStudent);
console.log(secondStudent.getAge());
secondStudent.present();
secondStudent.present();
secondStudent.absent();
secondStudent.mark(10);
secondStudent.mark(8);
secondStudent.mark(10);
console.log(secondStudent.summary());