import { AuthService } from './../../../services'
const authentificateUser = async (root, data, ctx, info) => {
  const response = await AuthService.authentificateUser({
    credentials: data.input,
    unfilteredFields: Object.keys(ctx.utils.parseFields(info))
  })
  return Object.assign(response)
}

export default {
  authentificateUser
}