//   public static selectAllRecords(queryConfig: QueryConfig):
// Promise < SuccessDatabaseResponse | ErrorDatabaseResponse > {
//   if (!(queryConfig instanceof QueryConfig)) {
//     console.trace(queryConfig)
//     throw new Error('Query config required')
//   };
//   this.queryConfigLogger(queryConfig)
//     return new Promise((resolve, reject) => {
//     pool.connect(async (err: any, client: any, done: any) => {
//       if (err) {
//         done(err)
//         console.trace(err)
//         this.errorHadler(queryConfig, err)
//         return await reject(this.createResponse(500, null))
//       } else {
//         await client.query(queryConfig.text, async (err: any, result: any) => {
//           if (err) {
//             done(err)
//             this.errorHadler(queryConfig, err)
//             return await reject(this.createResponse(500, null))
//           } else {
//             done()
//             await result
//             const rowCount: number = result.rowCount, rows: any = result.rows
//             this.dataLogger(queryConfig, rows)
//             if (rowCount > 0) return await resolve(this.createResponse(200, rows));
//             else if (rowCount === 0) return await resolve(this.createResponse(204, []));
//             else return await reject(this.createResponse(500, null));
//           }
//         });
//       }
//     });
//   });
// }
//   public static selectRecord(queryConfig: QueryConfig):
// Promise < DatabaseResponse > {
//   this.queryConfigLogger(queryConfig);
//   return new Promise((resolve, reject) => {
//     pool.connect((err: any, client: any, done: any) => {
//       if (err) {
//         done(err);
//         console.trace(err);
//         this.errorHadler(queryConfig, err);
//         return reject(this.createResponse(500, null));
//       } else {
//         client.query(queryConfig.text, (err: any, result: any) => {
//           if (err) {
//             done(err);
//             console.trace(err);
//             this.errorHadler(queryConfig, err);
//             return reject(this.createResponse(500, null));
//           } else {
//             done();
//             const rowCount: number = result.rowCount, rows: any = result.rows;
//             this.dataLogger(queryConfig, rows)
//             if (rowCount === 1) return resolve(this.createResponse(200, rows[0]));
//             else if (rowCount === 0) return resolve(this.createResponse(204, []));
//             else return reject(this.createResponse(500, null));
//           }
//         });
//       }
//     });
//   });
// }
//   public static insertRecord(queryConfig: QueryConfig): Promise < SuccessDatabaseResponse | ErrorDatabaseResponse > {
//   this.queryConfigLogger(queryConfig)
//     return new Promise((resolve, reject) => {
//     pool.connect((err: any, client: any, done: any) => {
//       if (err) {
//         done(err)
//         console.trace(err)
//         this.errorHadler(queryConfig, err)
//         return reject(this.createResponse(500, null))
//       } else {
//         client.query(queryConfig.text, (err: any, result: any) => {
//           if (err) {
//             done(err)
//             console.trace(err)
//             this.errorHadler(queryConfig, err)
//             return reject(this.createResponse(500, null))
//           } else {
//             done()
//             const rowCount: number = result.rowCount, rows: any = result.rows
//             this.dataLogger(queryConfig, rows)
//             if (rowCount === 1) return resolve(this.createResponse(201, rows[0]))
//             else return reject(this.createResponse(500, null))
//           }
//         })
//       }
//     })
//   })
// }
//   public static updateRecord(queryConfig: QueryConfig): Promise < SuccessDatabaseResponse | ErrorDatabaseResponse > {
//   this.queryConfigLogger(queryConfig);
//   return new Promise((resolve, reject) => {
//     pool.connect((err: any, client: any, done: any) => {
//       if (err) {
//         done(err);
//         console.trace(err);
//         this.errorHadler(queryConfig, err);
//         return reject(this.createResponse(500, null));
//       } else {
//         client.query(queryConfig.text, (err: any, result: any) => {
//           if (err) {
//             done(err);
//             console.trace(err);
//             this.errorHadler(queryConfig, err);
//             return reject(this.createResponse(500, null));
//           } else {
//             done();
//             const rowCount: number = result.rowCount, rows: any = result.rows;
//             this.dataLogger(queryConfig, rows);
//             if (rowCount === 1) return resolve(this.createResponse(200, rows[0]));
//             else if (rowCount === 0) return resolve(this.createResponse(204, []));
//             else return reject(this.createResponse(500, null));
//           }
//         });
//       }
//     });
//   });
// }