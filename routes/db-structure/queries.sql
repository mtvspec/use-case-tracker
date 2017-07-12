SELECT
  relname AS table_name, 
	c.oid AS table_oid,
	(SELECT pg_catalog.obj_description(c.oid, 'pg_class')) AS comment
FROM pg_catalog.pg_class c 
WHERE c.relname !~ '^(pg_|sql_)'
AND relkind = 'r'
ORDER BY table_name;

SELECT
	ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(tb)))
FROM (
	SELECT
		relname AS table_name,
		c.oid AS table_oid,
		(SELECT pg_catalog.obj_description(c.oid, 'pg_class')) AS COMMENT
	FROM pg_catalog.pg_class c
	WHERE c.relname !~ '^(pg_|sql_)'
	AND relkind = 'r'
	ORDER BY table_name	
) tb;

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
					*,
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


SELECT
  ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(db)))
  FROM (
    SELECT
    db.oid "db_id",
    db.datname "db_name",
    (
      SELECT
        ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(sc)))
      FROM (
        SELECT
          sc.schema_name "schema_name",
          (
            SELECT
              ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(tb)))
            FROM (
              SELECT
              tb.table_name "table_name",
              tb.table_type "table_type",
              (
                SELECT
                ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(cn)))
                FROM (
                  SELECT
                    cn.column_name "columnName",
                    cn.column_default "defaultValue",
                    cn.is_nullable "isNullable",
                    cn.data_type "dataType",
                    cn.ordinal_position "order"
                  FROM
                    information_schema.columns cn
                  WHERE cn.table_name = tb.table_name
                ) cn
              ) AS "columns"
              FROM
              information_schema.tables tb
              WHERE tb.table_schema = sc.schema_name
            ) tb
          ) AS "tables"
        FROM
          information_schema.schemata sc
        WHERE sc.schema_owner = db.datname
        AND sc.schema_name NOT IN ('pg_catalog', 'information_schema')
      ) sc
    ) AS "schemas"
  FROM
    pg_database db
  WHERE db.datistemplate = false
  ) db;