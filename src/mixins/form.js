import Requester from '@/mixins/requester'

class Form extends Requester {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      email: '',
      username: '',
      login: '',
      password: '',
      passwordVisible: false
    }
  }
  getPasswordFieldType () {
    return this.state.passwordVisible ? 'text' : 'password'
  }
  togglePassword () {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  }
  generatePassword () {
    const chars = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ1234567890!@#$%^&*()'
    let password = ''
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    this.setState({
      password: password,
      passwordVisible: true
    })
  }
}

export default Form
