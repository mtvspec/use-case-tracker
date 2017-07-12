'use strict';

const builder = require('xmlbuilder');
const router = require('express').Router();

router
  .get('/', (req, res) => {
    describeTables({
      text: fetchCommentsQuery()
    }, (response) => {
      const data = response.data.array_to_json;
      const _tables = getTables(data);
      let tables = [];
      for (let i in _tables) {
        tables.push({
          'table': { '@name': _tables[i].table_name },
          'comment': _tables[i].comment
        });
      }
      const xmlData = builder.create(tables, { encoding: 'utf-8' }).end({ pretty: true });
      function getTables(data) {
        let _tables = [];
        data.forEach(function (table) {
          _tables.push({
            table_name: table.table_name,
            table_oid: table.table_oid,
            comment: table.comment
          });
        });
        console.log(_tables);
        return _tables;
      }
      function getColumns(data, table_name) {
        let _columns = [];
        data.forEach(function (column) {
          if (column.table_name === table_name) {
            _columns.push(column);
          }
        });
        return _colums;
      }
      console.log(xmlData);
      // const _database = _data[1];
      // const _schemas = _database.schemas;
      // let schemas = [];
      // let tables = [];
      // let xmlTables = [];
      // _schemas.forEach(function (schema) {
      //   schemas.push(schema);
      //   let _tables = schema.tables;
      //   _tables.forEach(function (table) {
      //     tables.push(table);
      //   }, this);
      //   console.log(tables.length);
      //   for (let i in tables) {
      //     xmlTables.push({
      //       'table': { '@name': tables[i].table_name }
      //     });
      //   }
      //   const xmlData = builder.create(xmlTables, { encoding: 'utf-8' }).end({ pretty: true });
      //   console.log(xmlData);
      // }, this);
      return res.status(response.status).send(xmlData).end();
      // const _tables = res.data;
      //   const tables = [];
      //   for (let i in _tables) {
      //     tables.push({
      //       'table': { '@name': _tables[i].table_name }
      //     });
      //   }
      //   const xmlData = builder.create(tables, { encoding: 'utf-8' }).end({ pretty: true });
      //   console.log(xmlData);
    });
  })

module.exports = router;

const config = {
  user: 'uct', //env var: PGUSER
  database: 'mtvspec', //env var: PGDATABASE
  password: 'PGPASSWORD', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const { Pool } = require('pg');
const pool = new Pool(config);

const db = {
  query: (text) => {
    const start = Date.now();
    return pool.query(text, (err, res) => {
      if (err) {
        console.error(`\n================================================================================\n`);
        console.error(Date());
        console.error(`\n================================================================================\n\n'query error:'\n${text}\n\n`);
        console.error(err);
        console.error(`\n================================================================================\n`);
      } else {
        const duration = Date.now() - start;
        const rowCount = res.rowCount;
        console.log(`\n================================================================================\n`);
        console.log(Date());
        console.log(`\n================================================================================\n\n'executed query:'\n${text}\n duration: ${duration}, rows: ${rowCount} :\n\n`);
        console.log(res.rows);
        console.log(`================================================================================\n`);
      }
      return cb(err, res);
    });
  }
}

let res = [];

// const datatypes = require();

function fetchCommentsQuery() {
  return `
  SELECT
	ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(tb)))
  FROM (
	SELECT
		tb.relname AS table_name,
		tb.oid AS table_oid,
		(SELECT pg_catalog.obj_description(tb.oid, 'pg_class')) AS comment,
		(
			SELECT
				ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(cn)))
			FROM (
				SELECT
					cn.column_name,
          cn.column_default,
          cn.is_nullable,
          cn.data_type,
          cn.character_maximum_length,
          cn.ordinal_position,
					col_description(tb.oid, ordinal_position) AS column_comment 
				FROM information_schema.columns cn 
				WHERE cn.table_name = tb.relname
				ORDER BY cn.ordinal_position
			) cn
		) AS "columns"
	FROM pg_catalog.pg_class tb
	WHERE tb.relname !~ '^(pg_|sql_)'
	AND tb.relkind = 'r'
	ORDER BY table_name
) tb;
  `;
}

function describeTables(config, cb) {
  pool.connect((err, client, done) => {
    if (err) {
      done(err);
      console.error(err);
      return cb({ status: 500, data: null });
    } else {
      client.query(config.text, (err, result) => {
        const start = Date.now();
        if (err) {
          done(err);
          console.error(err);
          return cb({ status: 500, data: err.message });
        } else {
          const duration = Date.now() - start;
          done();
          const rowCount = result.rowCount, rows = result.rows;
          if (rowCount === 1) return cb({ status: 200, data: rows[0] });
          else if (rowCount === 0) return cb({ status: 204, data: [] });
          else if (rowCount > 0) return cb({ status: 200, data: rows });
        }
      });
    }
  });
}