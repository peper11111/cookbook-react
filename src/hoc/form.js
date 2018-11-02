import React from 'react'

export default function (WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
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
      this.setState({
        passwordVisible: !this.state.passwordVisible
      })
    }
    generatePassword () {
      const chars = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ1234567890!@#$%^&*()'
      let password = ''
      for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.setState({
        password,
        passwordVisible: true
      })
    }
    render () {
      return (
        <WrappedComponent
          { ...this.props }
          { ...this.state }
          getPasswordFieldType={ this.getPasswordFieldType }
          togglePassword={ this.togglePassword }
          generatePassword={ this.generatePassword }
        />
      )
    }
  }
}
