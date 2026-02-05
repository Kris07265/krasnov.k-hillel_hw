'use strict';

export class Student {
    firstName = null;
    lastName = null;
    birthYear = null;
    attendance = [];
    marks = [];
    constructor(fullName, birthYear) {
        const [firstName, lastName] = fullName.split(' ');
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.attendance = new Array(10).fill(undefined);
        this.marks = new Array(10).fill(undefined);
    }

    getAge(){
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear
    }

    present(){
        const emptyIndex = this.attendance.indexOf(undefined);
        if (emptyIndex === -1) return false;
        this.attendance[emptyIndex] = true;
        return true;
    }

    absent(){
        const emptyIndex = this.attendance.indexOf(undefined);
        if (emptyIndex === -1) return false;
        this.attendance[emptyIndex] = false;
        return true;
    }

    mark(value){
        if (value >=0 && value <= 10) {
            const emptyIndex = this.marks.indexOf(undefined);
            if (emptyIndex === -1) return false;
            this.marks[emptyIndex] = value;
            return true;
        }
    }

    getAverageMark(){
        const validMarks = this.marks.filter(mark => mark !== undefined);
        if (validMarks.length === 0) {
            return 0;
        }
        const sum = validMarks.reduce((acc, mark) => acc + mark, 0);
        return sum / validMarks.length;
    }

    getAverageAttendance(){
        const pastDays = this.attendance.filter(day => day !== undefined);
        if (pastDays.length === 0) {
            return 0;
        }
        const attendanceDays = pastDays.filter(day => day === true).length;
        return attendanceDays / pastDays.length;
    }

    summary(){
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
}