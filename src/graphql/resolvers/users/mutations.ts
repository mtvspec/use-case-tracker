import { AuthService } from './../../../services'
const authentificateUser = async (root, data, ctx) => {
  const response = await AuthService.authentificateUser(data.input)
  return Object.assign(response)
}

export default {
  authentificateUser
}