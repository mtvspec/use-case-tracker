'use strict';

let Person = require('./class.Person.js');

let person = new Person({
  iin: '871215301496',
  lastName: 'Маусумбаев',
  firstName: 'Тимур',
  middleName: 'Владимирович',
  dob: '1987-12-15',
  gender: 'M'
});

console.log(person);
