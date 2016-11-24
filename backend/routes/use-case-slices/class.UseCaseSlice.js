'use strict';

module.exports = class UseCaseSlice {
  constructor() {
    let result = {};
    let messages = {};
    if (!data || !typeof data === 'object') {
        messages.message = `slice is required`;
        result.messages = messages;
        return this.result = result;
      } else if (Object.getOwnPropertyNames(data).length === 0) {
        messages.message = `slice data is required`;
        result.messages = messages;
        return this.result = result;
      }
    if (data) {
      let slice = {};
      if (data.sliceName) {
        if (isString(data.sliceName, 1, 1000)) {
          slice.sliceName = data.sliceName; 
        } else {
          messages.sliceName = `Slice name ${data.sliceName} is invalid`;
        }
      } else {
        messages.sliceName = `Slice name is required`;
      }
      if (data.sliceDesc) {
        if (isString(data.sliceDesc, 1, 1000000)) {
          slice.sliceDesc = data.sliceDesc;
        } else {
          messages.sliceDesc = `Slice desc ${data.sliceDesc} is invalid`;
        }
      } else if (data.sliceDesc === '' || data.sliceDesc === null) {
        slice.sliceDesc = '';
      }
      if (data.sliceSpecs) {
        if (data.sliceSpecs, 1, 1000000) {
          slice.sliceSpecs = data.sliceSpecs
        } else {
          messages.sliceSpecs = `Slice specs ${data.sliceSpecs} is invalid`;
        }
      } else if (data.sliceSpecs === '' || data.sliceSpecs === null) {
        slice.sliceSpecs = '';
      }
      if (Object.keys(messages).length > 0) {
        result = messages;
        return this.result = result;
      } else {
        result = slice;
        return this.result = result;
      }
    } else {
      messages.slice = `slice data is required`;
    }
  }
}