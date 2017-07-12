'use strict';

const Queries = {
  dict: {
    SELECT_ALL_DICTS() {
      return `
      SELECT
        d.id,
        d.a_dict_system_name,
        d.a_dict_name_en,
        d.a_dict_desc_en,
        d.a_dict_name_ru,
        d.a_dict_desc_ru
      FROM
        dict.e_dict d
      ORDER BY
        d.id;`
    },
    SELECT_DICT_VALUES_BY_DICT_NAME(dictName) {
      return `
      SELECT
        v.id,
        v."aDictValueNameEN",
        v."aDictValueDescEN",
        v."aDictValueNameRU",
        v."aDictValueDescRU",
        v."isDeleted"
      FROM
        dict.e_dict_value v,
        dict.e_dict d
      WHERE v."eDictID" = d.id
      AND d."aDictSystemName" = '${dictName}'
      ORDER BY
        v.id ASC;
      `;
    },
    INSERT_DICT_VALUE(dictValue) {
      return `
      INSERT INTO dict.e_dict_value (
        e_dict_id,
        a_dict_value_name_en,
        a_dict_value_desc_en,
        a_dict_value_name_ru,
        a_dict_value_desc_ru
      ) VALUES (
        ${dictValue.id},
        '${dictValue.aDictValueNameEN}',
        ${convertData(dictValue.aDictValueDescEN)},
        '${dictValue.aDictValueNameRU}',
        ${convertData(dictValue.aDictValueDescRU)}
        ) RETURNING id "created_dict_value_id";
      `
    }
  }
}

module.exports = Queries;

function convertData(data) {
  return `${data ? "'" + data + "'" : 'null'}`;
}