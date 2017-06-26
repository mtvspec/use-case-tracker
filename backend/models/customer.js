'use strict';

module.exports = (sq, dt) => {

  const CustomerModel = sq
    .define('e_customer', {
      id: {
        type: dt.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      eOrganizationID: {
        type: dt.BIGINT,
        allowNull: false
      },
      aCustomerName: {
        type: dt.STRING(1000),
        unique: true,
        validate: {
          len: [2, 1000]
        }
      },
      aCustomerDesc: {
        type: dt.STRING(4000),
        validate: {
          len: [2, 4000]
        }
      },
      isDeleted: {
        type: dt.BOOLEAN,
        defaultValue: false
      }
    }, {
      schema: 'customers'
    });

  CustomerModel.associate = (models) => {
    CustomerModel.belongsTo(models.e_organization, { foreignKey: 'eOrganizationID' });
  }

  return CustomerModel;

}