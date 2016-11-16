'use strict';

const Defect = require('./class.Defect.js');

let defect = {
  subjectID: 1,
  aName: 'Поле "Статус" вставить в группу полей "Сведения о КП"',
  aDescription: 'Данное поле используется очень часто. Пользователям неудобно искать данное поле.'
};

let d = new Defect (defect);
console.log(d);
