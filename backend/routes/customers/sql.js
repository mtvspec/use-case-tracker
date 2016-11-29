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
    }
  }
}

module.exports = Queries;
