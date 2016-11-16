'use strict';

// let User = require('./class.User.js');
//
// let user = new User({
//   personID: 1,
//   password: 'PASSWORD'
// }, function (err, user) {
//   if (err) {
//     return {
//       result: false,
//       data: err
//     };
//   } else {
//     return {
//       result: true,
//       data: user
//     };
//   }
// });
//
// console.log(user);
//
// try {
//   if (1 > 0) {
//     throw 'error';
//   }
// } catch (e) {
//   console.error(e);
// } finally {
//   console.log('ok');
// }

class User {
  constructor(data) {
    this.user = {
      personID: data.personID,
      username: data.username,
      password: data.password
    }
    return this.user;
  }
  static checkPersonIDAndUsername(data, cb) {
    let messages = {};
    db.selectRecordById({
      text: `
      SELECT
        id,
        isDeleted
      FROM
        persons.e_person
      WHERE
        id = ${data.personID};`;
    }, function (response) {
      if (response.status === 200) {
        if (response.data.isDeleted === 'T') {
          messages.person = `person with id: ${data.personID} is deleted`;
        } else if (response.data.isDeleted === 'F') {

        }
      }
    });
    if (Object.keys(messages).length > 0) {
      return cb({
        status: 401,
        data: messages
      });
    }
  }
}


// 1. Проверить корректность данных пользователя
// 2. Проверить идентификатор ФЛ и доступность логина
// 3. Если:
// * идентификатор ФЛ есть, ФЛ не удалено и логин доступен, разрешить регистрацию
// 4. Если:
// 5. идентификатора ФЛ нет - добавить сообщение: 'ФЛ не найдено'
// 6. логин занят - отправить сообщение: 'Логин занят'
