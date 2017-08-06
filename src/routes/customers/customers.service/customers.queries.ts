export const CustomersQueries = {
  customers: {
    selectAllCustomers: `
    SELECT
      *
    FROM
      customers.e_customer;
    `
  }
}