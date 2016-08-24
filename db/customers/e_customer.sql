CREATE TABLE customers.e_customer (
  id INTEGER,
  name VARCHAR (1000) NOT NULL,
  description VARCHAR (4000),
  is_deleted CHAR (1) NOT NULL DEFAULT 'F',
    PRIMARY KEY (id),
    FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE customers.r_customer (
  id SERIAL,
  e_customer_id INTEGER NOT NULL,
  e_organization_id INTEGER,
  e_person_id INTEGER,
   PRIMARY KEY (id),
   FOREIGN KEY (e_customer_id) REFERENCES organizations.e_organization (id)
);
