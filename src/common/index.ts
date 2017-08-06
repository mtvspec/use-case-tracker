function convertData(data) {
  if (data === undefined) return 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}

export class Utils {
  static convertData;
}

export class DataValidationService {
  public static validateBin(data) {
    let res: boolean = false;
    Object.prototype.toString.call(data) === '[object String]' ? res = true : res = false;
    if (res === false) return false; 
    data.length === 12 ? res = true : res = false;
    if (res === false) return false;
    return true;
  }
  public static validateString(data, minLen?, maxLen?): boolean {
    let res: boolean = false;
    Object.prototype.toString.call(data) === '[object String]' ? res = true : res = false;
    if (res === false) return false; 
    if (minLen) data.length >= minLen ? res = true : res = false;
    if (res === false) return false;
    if (maxLen) data.length <= maxLen ? res = true : res = false;
    if (res === false) return false;
    return true;
  }
}
