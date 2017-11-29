import { AuthService } from './../../../services'
const authentificateUser = async (root, data, ctx, info) => {
  const response: any = await AuthService.authentificateUser({
    credentials: data.input,
    unfilteredFields: Object.keys(ctx.utils.parseFields(info))
  })
  if (response && response.id > 0) {
    ctx.session = response
    ctx.res.cookie('session', response.token)
    return Object.assign(response)
  }
}

export default {
  authentificateUser
}