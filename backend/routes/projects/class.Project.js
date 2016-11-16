'use strict';

module.exports = class Project {
  constructor(data) {
    console.log(data);
    let project = {};
    let messages = {};
    if (data) {
      if (data.projectKindID) {
        if (typeof data.projectKindID === 'number'
        && data.projectKindID > 0) {
          project.projectKindID = data.projectKindID;
        } else {
          messages.projectKindID = `incorrect 'projectKindID': ${data.projectKindID}`;
        }
      } else {
        project.projectKindID = '';
      }
      if (data.customerID) {
        if (typeof data.customerID === 'number'
        && data.customerID > 0) {
          project.customerID = data.customerID;
        } else {
          messages.customerID = `incorrect 'customerID': ${data.customerID}`;
        }
      } else {
        project.customerID = '';
      }
      if (data.formalName) {
        if (typeof data.formalName === 'string'
        && data.formalName.length >= 1
        && data.formalName.length <= 3) {
          project.formalName = data.formalName;
        } else {
          messages.lastName = `incorrect 'formalName': ${data.formalName}`;
        }
      } else {
        project.formalName = '';
      }
      if (data.workName) {
        if (typeof data.workName === 'string'
        && data.workName.length > 1
        && data.workName.length <= 1000) {
          project.workName = data.workName;
        } else {
          messages.workName = `incorrect 'workName': ${data.workName}`;
        }
      } else {
        messages.workName = `'workName' is required`;
      }
      if (data.officialName) {
        if (typeof data.officialName === 'string'
        && data.officialName.length > 1
        && data.officialName.length <= 1000) {
          project.officialName = data.officialName;
        } else {
          messages.workName = `incorrect 'officialName': ${data.officialName}`;
        }
      } else {
        project.officialName = '';
      }
      if (data.description) {
        if (typeof data.description === 'string'
        && data.description.length > 1
        && data.description.length <= 4000) {
          project.description = data.description;
        } else {
          messages.description = `incorrect 'description': ${data.description}`;
        }
      } else {
        project.description = '';
      }
      if (data.planStartDate) {
        if (isValidDate(data.planStartDate)) {
          project.dob = data.planStartDate;
        } else {
          messages.dob = `incorrect 'planStartDate': ${data.planStartDate}`;
        }
      } else {
        project.planStartDate = '';
      }
      if (data.planEndDate) {
        if (isValidDate(data.planEndDate)) {
          project.dob = data.planEndDate;
        } else {
          messages.dob = `incorrect 'planEndDate': ${data.planEndDate}`;
        }
      } else {
        project.planEndDate = '';
      }
      if (data.planBudget) {
        if (typeof data.planBudget === 'number'
        && data.planBudget > 1) {
          project.planBudget = data.planBudget;
        } else {
          messages.planBudget = `incorrect 'planBudget': ${data.planBudget}`;
        }
      } else {
        project.planBudget = '';
      }
      if (data.factStartDate) {
        if (isValidDate(data.factStartDate)) {
          project.dob = data.factStartDate;
        } else {
          messages.dob = `incorrect 'factStartDate': ${data.factStartDate}`;
        }
      } else {
        project.factStartDate = '';
      }
      if (data.factEndDate) {
        if (isValidDate(data.factEndDate)) {
          project.dob = data.factEndDate;
        } else {
          messages.dob = `incorrect 'factEndDate': ${data.factEndDate}`;
        }
      } else {
        project.factEndDate = '';
      }
      if (data.factBudget) {
        if (typeof data.factBudget === 'number'
        && data.factBudget > 1) {
          project.factBudget = data.factBudget;
        } else {
          messages.planBudget = `incorrect 'factBudget': ${data.factBudget}`;
        }
      } else {
        project.factBudget = '';
      }
      if (data.projectManagerID) {
        if (typeof data.projectManagerID === 'number'
        && data.projectManagerID > 0) {
          project.projectManagerID = data.projectManagerID;
        } else {
          messages.projectManagerID = `incorrect 'projectManagerID': ${data.projectManagerID}`;
        }
      } else {
        project.projectManagerID = '';
      }
      if (Object.keys(messages).length > 0) {
        return this.messages = messages;
      } else {
        return this.project = project;
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
