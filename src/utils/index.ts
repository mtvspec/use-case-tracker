const convertData = (data: string | number | undefined) => {
  if (data === undefined) return 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}

export interface field {
  name: string
}

const filterFields = (field: field): boolean => { return <boolean>(this.indexOf(field) > -1) as boolean }

export {
  convertData,
  filterFields,
}