'use strict';

const data = {
  id,
  timeStamp,
  sessionID,
  errMessage,
  errStack
}

function log(sessionID, err) {
  db.insertRecord({
    text: `
    INSERT INTO log.error_log (
      sessionID,
      err_message,
      err_stack
    )
    VALUES (
      ${sessionID},
      '${err.message}',
      '${err.stack}'
    );
    `
  })
}