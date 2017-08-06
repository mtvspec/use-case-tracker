export class UserCredentials {
  username: string;
  password: string;
  constructor (data) {
    this.username = data.username;
    this.password = data.password;
    return this;
  }
}