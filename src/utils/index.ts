const convertData = (data: string | undefined) => {
  if (data === undefined) return 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}
export {
  convertData
}