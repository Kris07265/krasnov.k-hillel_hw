'use strict';
export const validationRegExps = {
    'fullName': /^(?=.{2,80}$)[\p{L}]+(?:[ '\-][\p{L}]+){0,3}$/u,
    'phone': /^\+[1-9]\d{7,14}$/,
    'address': /^(?=.{5,120}$)[\p{L}\d][\p{L}\d\s.,'’\-\/#]+$/u
}

export const errorMessages = {
    'fullName': 'Full Name Required',
    'phone': 'Phone Number Required',
    'address': 'Address Required',
}