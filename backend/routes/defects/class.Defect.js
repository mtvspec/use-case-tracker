'use strict';

module.exports = class Defect {
  constructor(data) {
    let messages = {};
    let defect = {};
    if (data) {
      if (data.subjectID) {
        if (typeof data.subjectID === 'number'
        && data.subjectID > 0) {
          defect.subjectID = data.subjectID;
        } else {
          messages.subjectID = `incorrect 'subjectID': ${data.subjectID}`;
        }
      } else {
        messages.subjectID = `'subjectID' is required`;
      }
      if (data.aName) {
        if (typeof data.aName === 'string') {
          defect.aName = data.aName;
        } else {
          messages.aName = `incorrect 'aName': ${data.aName}`;
        }
      } else {
        messages.aName = `'aName' is required`;
      }
      if (data.aDescription) {
        if (typeof data.aDescription === 'string') {
          defect.aDescription = data.aDescription;
        } else {
          defect.aDescription = `incorrect 'aDescription': ${data.aDescription}`;
        }
      }
    } else {
      messages.defect = `'defect' data is required`;
    }
    if (Object.keys(messages).length > 0) {
      return this.messages = messages;
    } else {
      return this.defect = defect;
    }
  }
}
