CREATE TABLE customers.e_customer (
  id SERIAL,
  e_organization_id INTEGER NOT NULL,
  name VARCHAR (1000) NOT NULL,
  description VARCHAR (4000),
  is_deleted CHAR (1) NOT NULL DEFAULT 'F',
    PRIMARY KEY (id),
    FOREIGN KEY (e_organization_id) REFERENCES organizations.e_organization (id),
    FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE customers.e_customer_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_customer_id INTEGER NOT NULL,
  name VARCHAR (1000) NOT NULL,
  description VARCHAR (4000),
  is_deleted CHAR (1) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
    FOREIGN KEY (user_id) REFERENCES users.e_user (id),
    FOREIGN KEY (e_customer_id) REFERENCES customers.e_customer (id),
    FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);
