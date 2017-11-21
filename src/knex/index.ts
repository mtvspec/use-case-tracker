const pg = require('knex')({
  client: 'pg',
  connection: {
    host: '192.168.1.13',
    database: 'postgres',
    password: 'postgres',
    user: 'postgres',
    port: 5432,
    application_name: 'portal.kazimpex.kz'
  },
  debug: false
})

export default pg