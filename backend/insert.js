function insert(table, columns, values) {
  if (!table) {
    return 'Table name is required';
  }
  if (!values) {
    return 'Values is required'
  }
  return 'insert into' + table + '()'
}
