'use strict';

module.exports = class Project {
  /**
  * @param projectKindID (*)
  * @param customerID
  * @param projectName (*)
  * @param projectDesc
  * @return projectID
  */
  constructor(data) {
    let project = {};
    let messages = {};
    let result = {};
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
      if (data.projectKindID) {
        if (typeof data.projectKindID === 'number'
        && data.projectKindID > 0) {
          project.projectKindID = Number(data.projectKindID);
        } else {
          messages.projectKindID = `incorrect 'projectKindID': ${data.projectKindID}`;
        }
      } else {
        project.projectKindID = null;
      }
      if (data.customerID) {
        if (typeof data.customerID === 'number'
        && data.customerID > 0) {
          project.customerID = Number(data.customerID);
        } else {
          messages.customerID = `incorrect 'customerID': ${data.customerID}`;
        }
      } else {
        project.customerID = null;
      }
      if (data.projectName) {
        if (typeof data.projectName === 'string'
        && data.projectName.length >= 1
        && data.projectName.length <= 1000) {
          project.projectName = data.projectName;
        } else {
          messages.projectName = `incorrect 'projectName': ${data.projectName}`;
        }
      } else {
        messages.projectName = `'projectName' is required`;
      }
      if (data.projectDesc) {
        if (typeof data.projectDesc === 'string'
        && data.projectDesc.length >= 1
        && data.projectDesc.length <= 4000) {
          project.projectDesc = data.projectDesc;
        } else {
          messages.projectDesc = `incorrect 'projectDesc': ${data.projectDesc}`;
        }
      } else {
        project.projectDesc = '';
      }
      if (Object.keys(messages).length > 0) {
        result.messages = messages;
        return this.result = result;
      } else {
        result.project = project;
        return this.result = result;
      }
    } else {
      messages.project = `'project' is required`;
      return this.messages = messages;
    }
  }
}

function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    let parts = dateString.split('-');
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};
