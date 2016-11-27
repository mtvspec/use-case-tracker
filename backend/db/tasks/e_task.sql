--============================================================================--
-- Task (e_task)
--============================================================================--
CREATE TABLE tasks.e_task (
  id BIGINT,
  e_asignee_id BIGINT,
  a_task_name VARCHAR (1000) NOT NULL,
  a_task_desc TEXT,
    is_deleted NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_asignee_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        d_task_state_id
      ) REFERENCES tasks.d_task_state (id)
);
--============================================================================--
