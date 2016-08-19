const persons = {
  deletePerson:
  'delete from'
    + ' persons.e_person'
  + ' where'
    + ' id = $1'
  + ' returning id;'
}

exports.persons = persons;
