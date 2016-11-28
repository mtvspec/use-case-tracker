'use strict';

const validator = require('./../../common/validator');

module.exports = class Project {
  /**
  * @param projectKindID (*)
  * @param customerID
  * @param projectName (*)
  * @param projectDesc
  * @return projectID
  */
  constructor(data) {
    console.log(data);
    let result = {};
    let project = {};
    let messages = {};
    if (data) {
      if (!data || !typeof data === 'object') {
        messages.message = `'project' is required`;
        result.messages = messages;
        return this.result = result;
      } else if (Object.getOwnPropertyNames(data).length === 0) {
        messages.message = `'project data' is required`;
        result.messages = messages;
        return this.result = result;
      }
      if (data.aProjectKindID || data.aProjectKindID === undefined) {
        let result = validator.isNumber(data.aProjectKindID, 'not null');
        result.result ?
        project.aProjectKindID = result.data : messages = result.data; 
      }
      if (data.aCustomerID || data.aCustomerID === undefined) {
        let result = validator.isNumber(data.aCustomerID, 'not null');
        result.result ?
        project.aCustomerID = result.data : messages = result.data;
      }
      if (data.aProjectName || data.aProjectName === undefined) {
        let result = validator.isString(data.aProjectName, 2, 1000, 'not null');
        console.log(result);
        result.result ?
        project.aProjectName = result.data : messages = result.data;
      }
      if (data.aProjectDesc || data.aProjectDesc === undefined) {
        let result = validator.isString(data.aProjectDesc, 2, null, 'not null');
        result.result ?
        project.aProjectDesc = result.data : messages = result.data;
      }
      if (Object.keys(messages).length > 0) {
        result.messages = messages;
        return this.result = result;
      } else {
        if (Object.keys(project).length === 4) {
          result.project = project;
          return this.result = result;
        } else {
          result.messages = messages;
          return this.result = result;
        }
      }
    } else {
      messages.project = `'project' is required`;
      return this.messages = messages;
    }
  }
}
