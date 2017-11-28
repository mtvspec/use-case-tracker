import CommonResolvers from './../common'

import { DictService } from './../../../services'

const getDictValue = async (root, _, ctx, info) => {
  return await DictService.getAllDictValues({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { dictName: root.args.dictName }
  })
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