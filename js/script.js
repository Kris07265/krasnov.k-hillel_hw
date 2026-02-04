'use strict';

function Student(fullName, birthYear) {
    const [firstName, lastName] = fullName.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.attendance = new Array(10).fill(undefined);
    this.marks = new Array(10).fill(undefined);
}
Student.prototype.getAge = function () {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear
}
Student.prototype.present = function () {
    const emptyIndex = this.attendance.indexOf(undefined);
    if (emptyIndex === -1) return false;
    this.attendance[emptyIndex] = true;
    return true;
}
Student.prototype.absent = function () {
    const emptyIndex = this.attendance.indexOf(undefined);
    if (emptyIndex === -1) return false;
    this.attendance[emptyIndex] = false;
    return true;
}
Student.prototype.mark = function (value) {
        if (value >=0 && value <= 10){
            const emptyIndex = this.marks.indexOf(undefined);
            if (emptyIndex === -1) return false;
            this.marks[emptyIndex] = value;
            return true;
        }
}
Student.prototype.getAverageMark = function () {
    const validMarks = this.marks.filter(mark => mark !== undefined);
    if (validMarks.length === 0) {
        return 0;
    }
    const sum = validMarks.reduce((acc, mark) => acc + mark, 0);
    return sum / validMarks.length;
}
Student.prototype.getAverageAttendance = function () {
    const pastDays = this.attendance.filter(day => day !== undefined);
    if (pastDays.length === 0) {
        return 0;
    }
    const attendanceDays = pastDays.filter(day => day === true).length;
    return attendanceDays / pastDays.length;
}

Student.prototype.summary = function () {
    const averageMark = this.getAverageMark();
    const averageAttendance = this.getAverageAttendance();

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
console.log(secondStudent);
console.log(secondStudent.getAge());
secondStudent.present();
secondStudent.present();
secondStudent.absent();
secondStudent.mark(10);
secondStudent.mark(8);
secondStudent.mark(10);
console.log(secondStudent.summary());
