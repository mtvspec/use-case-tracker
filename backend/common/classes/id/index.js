'use strict';

module.exports = class ID {
  constructor(data) {
    let messages = {};
    let id = {};
    if (data) {
      data = Number(data);
      if (typeof data === 'number'
      && Number.isInteger(+data)
      && data > 0) {
        this.id = data;
      } else {
        messages = `incorrect 'id': ${data}`;
      }
    } else {
      messages = `'id' is required`;
    }
    if (Object.keys(messages).length > 0) {
      return this.messages = messages;
    } else {
      return this.id;
    }
  }
}
