import { AuthService } from './../../../services'
const authentificateUser = async (root, data, context) => {
  const _data = {
    username: data.username,
    password: data.password
  }
  const response = await AuthService.authentificateUser(_data)
  return Object.assign(response)
}

export default {
  authentificateUser
}