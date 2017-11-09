export default {
  dict: {
    SELECT_DICT_VALUES_BY_DICT_NAME: (dictName: string) => {
      return `
      SELECT
        v.*
      FROM
        dict.e_dict_value v,
        dict.e_dict d
      WHERE v."dictID" = d.id
      AND d."systemName" = '${dictName}'
      ORDER BY v.id ASC;`
    }
  }
}