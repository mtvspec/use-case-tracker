export const config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //process.env.PGDATABASE, //env var: PGDATABASE
  password: 'postgres', //env var: PGPASSWORD
  host: '192.168.1.13', // Server hosting the postgres database
  application_name: 'portal.kazimpex.kz',
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  debug: true
}
// export const config = {
//   user: 'mtvspec', //env var: PGUSER
//   database: 'mtvspec', //process.env.PGDATABASE, //env var: PGDATABASE
//   password: 'mtvspec', //env var: PGPASSWORD
//   host: 'localhost', // Server hosting the postgres database
//   application_name: 'tracker.kazimpex.kz',
//   port: 5432, //env var: PGPORT
//   max: 10, // max number of clients in the pool
//   idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//   debug: true
// }