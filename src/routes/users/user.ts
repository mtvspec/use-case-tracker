export class User  {
  private messages: {
    ePersonID: string;
    username: string;
    password: string;
    email: string;
  }
  id: number;
  ePersonID: number;
  username: string;
  password: string;
  email: string;
  constructor (data) {
    data.ePersonID ? this.validatePersonID(+data.ePersonID) : this.messages.ePersonID = 'required';
    data.username ? this.validateUsername(data.username) : this.messages.username = 'required';
    data.password ? this.validatePassword(data.password) : this.messages.password = 'required';
    data.email ? this.validateEmail(data.email) : this.messages.email = 'required';
  }
  private validatePersonID(id: number) {
    
  }
  private validateUsername (username: string) {

  }
  private validatePassword (password: string) {

  }
  private validateEmail (email: string) {

  }
}
