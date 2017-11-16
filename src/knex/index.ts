const pg = require('knex')({
  client: 'pg',
  connection: {
    host: '192.168.1.16',
    database: 'postgres',
    user: 'postgres',
    application_name: 'Contacts App - knex'
  },
  debug: false
})

export default pg