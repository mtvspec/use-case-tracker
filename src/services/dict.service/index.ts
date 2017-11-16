import queries from './queries'
import db from './../../knex'
const DICT_TABLE: string = 'dict.e_dict'
const DICT_VALUES_TABLE: string = 'dict.e_dict_value'
import {
  DatabaseService, QueryConfig
} from './../database.service'

let dictTableFields: string[] = []
let dictValueTableFields: string[] = []

export class DictService extends DatabaseService {
  public static async getDictValue (fields: string[], id: number) {
    const filterFields = (field: string) => { return (dictTableFields.indexOf(field) > -1) }
    const filteredFields = fields.filter(filterFields)
    return db(DICT_VALUES_TABLE)
      .where({ id })
      .select(filteredFields).first()
  }
  public static async getAllDictValues (fields: string[], dictName: string) {
    const _fields: string = this.buildFieldSet(this.filterFields(dictValueTableFields, fields), 'v')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        ${_fields}
      FROM
        ${DICT_VALUES_TABLE} v,
        ${DICT_TABLE} d
      WHERE v.dict = d.id
      AND d."systemName" = '${dictName}'
      ORDER BY v.id ASC;`
    }))
  }
}

const getDictTable = (async () => {
  const response: any = await <any>DictService.fields(DICT_TABLE)
  if (response && response.length > 0) dictTableFields = response
  else console.trace(response)
})()

const getDictValuesTableFields = (async () => {
  const response: any = await <any>DictService.fields(DICT_VALUES_TABLE)
  if (response && response.length > 0) dictValueTableFields = response
  else console.trace(response)
})()