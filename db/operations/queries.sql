SELECT
  to_char(a_operation_ts, 'YYYY-MM-DD'),
  count(id)
FROM
  operations.e_operation
GROUP BY
  to_char(a_operation_ts, 'YYYY-MM-DD')
ORDER BY
  to_char(a_operation_ts, 'YYYY-MM-DD') ASC;

SELECT
  to_char(a_open_timestamp, 'YYYY-MM-DD'),
  count(id)
FROM
  sessions.e_session
GROUP BY
  to_char(a_open_timestamp, 'YYYY-MM-DD')
ORDER BY
  to_char(a_open_timestamp, 'YYYY-MM-DD') ASC;