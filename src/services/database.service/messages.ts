const successDatabaseResponse: string = '----------------------------------------------------- Database Success Response -----------------------------------------------------'
const failureDatabaseResponse: string = '------------------------------------------------------- Database Failure Response ---------------------------------------------------'
const dataBaseQueryConfig: string = '------------------------------------------------------- Database Query Config -------------------------------------------------------'
const responseSend: string = '--========================================================= Response Send =========================================================--'
const dataLine: string = '---------------------------------------------------------------- Data ---------------------------------------------------------------'
const errorLine: string = '---------------------------------------------------------------- Error --------------------------------------------------------------'
const endLine: string = '-------------------------------------------------------------------------------------------------------------------------------------'

export const screenLines = {
  successDatabaseResponse,
  failureDatabaseResponse,
  dataBaseQueryConfig,
  dataLine,
  errorLine,
  responseSend,
  endLine
}

export const ErrorMessages = {
  db: 'Database not responding',
  queryConfig: 'Query config required',
  qty: 'Rows count required'
}