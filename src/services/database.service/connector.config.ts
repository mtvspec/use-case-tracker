export const config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //process.env.PGDATABASE, //env var: PGDATABASE
  // password: process.env.PGPASSWORD, //env var: PGPASSWORD
  host: '192.168.1.16', // Server hosting the postgres database
  application_name: 'Contacts App - pg-node',
  port: process.env.PGPORT, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}