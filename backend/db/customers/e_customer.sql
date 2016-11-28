--============================================================================--
-- Customer (e_customer)
--============================================================================--
CREATE TABLE customers.e_customer (
  id BIGINT,
  e_organization_id BIGINT NOT NULL,
  a_customer_name VARCHAR (1000) NOT NULL,
  a_customer_desc TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        a_customer_name
      ),
      FOREIGN KEY (
        e_organization_id
      ) REFERENCES organizations.e_organization (id)
);
--============================================================================--
