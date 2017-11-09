import queries from './queries'
import db from './../../knex'
const dictValuesTable: string = 'dict.e_dict_value'
import {
  DatabaseService, QueryConfig
} from './../database.service'
let dictTableFields = []
export class DictService extends DatabaseService {
  public static async getDictValue (id: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        v.*
      FROM
        dict.e_dict_value v
      WHERE v.id = ${id};`
    }))
  }
  public static async getAllDictValues (dictName: string) {
    // const filterFields = (field) => { return (dictTableFields.indexOf(field) > -1) }
    // const filteredFields = unfilteredFields.filter(filterFields)
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.dict.SELECT_DICT_VALUES_BY_DICT_NAME(dictName)
    }))
  }
}

const getFields = (async () => {
  const response: any = await <any>DictService.fields(dictValuesTable)
  response.forEach((field: any) => dictTableFields.push(field.name))
})()