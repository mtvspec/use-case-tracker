'use strict';

module.exports = (sq, dt) => {
  
  const DocumentModel = sq
  .define('e_document', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    aDocumentName: {
      type: dt.STRING(1000),
      allowNull: false
    },
    dDocumentTypeID: {
      type: dt.BIGINT,
      allowNull: false
    },
    isDeleted: {
      type: dt.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      isIn: [[true, false]]
    }
  }, {
    schema: 'documents'
  });
  
  DocumentModel.associate = (models) => {
    DocumentModel.belongsTo(models.e_dict_value, { foreignKey: 'dDocumentTypeID' });
  }
  
  return DocumentModel;
  
}