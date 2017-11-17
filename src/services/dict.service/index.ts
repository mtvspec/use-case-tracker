import { DatabaseService, QueryConfig } from './../database.service'
const DICT_TABLE: string = 'dict.e_dict'
const DICT_VALUES_TABLE: string = 'dict.e_dict_value'
let dictValueTableFields: string[] = []

export class DictService extends DatabaseService {
  public static async getDictValue (fields: string[], id: number) {
    return this.getNode(
      DICT_VALUES_TABLE,
      dictValueTableFields,
      fields,
      id
    )
  }
  public static async getAllDictValues (fields: string[], dictName: string) {
    const requestedFields: string = this.buildFieldSet(this.filterFields(dictValueTableFields, fields), 'v')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${DICT_VALUES_TABLE} v,
        ${DICT_TABLE} d
      WHERE v.dict = d.id
      AND d."systemName" = '${dictName}'
      ORDER BY v.id ASC;
      
      `
    }))
  }
}

(async function getDictValuesTableFields () {
  const response: any = await <any>DictService.fields(DICT_VALUES_TABLE)
  if (response && response.length > 0) dictValueTableFields = response
  else console.trace(response)
})();