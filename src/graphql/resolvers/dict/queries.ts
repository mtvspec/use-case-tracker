import CommonResolvers from './../common'

import { DictService } from './../../../services'

const getDictValue = async (source, args, context, info) => {
  const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
  return await DictService.getAllDictValues(source.args.dictName)
}

const DictConnection = {
  dictValues: getDictValue
}

const DictValue = {
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

export default {
  DictConnection,
  DictValue
}