'use strict';

const Queries = {
  customers: {
    SELECT_ALL_CUSTOMERS() {
      return `
      SELECT
        id,
        e_organization_id "eOrganizationID",
        a_customer_name "aCustomerName",
        a_customer_desc "aCustomerDesc"
      FROM
        customers.e_customer
      ORDER BY
        id
      ASC;
      `;
    },
    INSERT_CUSTOMER(customer) {
      return `
      INSERT INTO customers.e_customer (
        e_organization_id,
        a_customer_name,
        a_customer_desc,
        d_customer_state_id
      ) VALUES (
        ${customer.eOrganizationID},
        '${customer.aCustomerName}',
        ${convertData(customer.aCustomerDesc)},
        44
      ) RETURNING id "created_customer_id";
      `;
    },
    UPDATE_CUSTOMER(customer) {
      return `
      UPDATE customers.e_customer
      SET
        e_organization_id = ${customer.eOrganizationID},
        a_customer_name = '${customer.aCustomerName}',
        a_customer_desc = ${convertData(customer.aCustomerDesc)},
        d_customer_state_id = 46
      WHERE id = ${customer.id}
      RETURNING id "updated_customer_id";
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  return `${data ? "'" + data + "'" : 'null'}`;
}
