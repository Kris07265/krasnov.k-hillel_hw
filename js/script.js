'use strict';

function Student(fullName, birthDate) {
    const [firstName, lastName] = fullName.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.attendance = new Array(10);
    this.marks = new Array(10);
}
Student.prototype.getAge = function () {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthDate
}
Student.prototype.present = function () {
        for (let i = 0; i < this.attendance.length; i++) {
            if (this.attendance[i] === undefined) {
                this.attendance[i] = true;
                break;
            }
        }
}
Student.prototype.absent = function () {
        for (let i = 0; i < this.attendance.length; i++) {
            if (this.attendance[i] === undefined) {
                this.attendance[i] = false;
                break;
            }
        }
}
Student.prototype.mark = function (value) {
        if (value >=0 && value <= 10){
            for (let i = 0; i < this.marks.length; i++) {
                if (this.marks[i] === undefined) {
                    this.marks[i] = value;
                    break;
                }
            }
        }
}

Student.prototype.summary = function () {
    const sum = this.marks.reduce((acc, mark) => acc + mark, 0);
    const averageMark = sum / this.marks.length;
    const pastDays = this.attendance.filter(day => day !== undefined);
    const attendanceDays = pastDays.filter(day => day === true).length;
    let averageAttendance = attendanceDays / pastDays.length;
    if (averageAttendance > 0.9 && averageMark > 9) {
        return "Ух ти, який молодчинка!";
    }
    else
    if (averageAttendance < 0.9 && averageMark < 9){
        return "Редька!"
    }
    else
    if (averageAttendance < 0.9 || averageMark < 9){
        return "Нормально, але можна краще";
    }
}

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
console.log(secondStudent.getAge());
secondStudent.present();
secondStudent.present();
secondStudent.absent();
secondStudent.mark(10);
secondStudent.mark(8);
secondStudent.mark(10);
console.log(secondStudent.summary());
