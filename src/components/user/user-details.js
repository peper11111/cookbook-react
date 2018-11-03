import React from 'react'
import { connect } from 'react-redux'
import config from '@/config'
import ImagePicker from '@/components/form/image-picker'
import editor from '@/hoc/editor'
import '@/components/user/user-details.scss'

class UserDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: this.props.mode,
      models: {
        bannerId: null
      }
    }
    this.init = this.props.init.bind(this)
    this.previewMode = this.props.previewMode.bind(this)
  }
  model () {
    return this.props.user
  }
  componentDidMount () {
    this.init()
  }
  render () {
    return (
      <div className="c-user-details">
        <ImagePicker
          blank={ config.blankBanner }
          className="c-user-details__banner"
          disabled={ this.previewMode() }
          value={ this.state.models.bannerId }
          onChange={ (bannerId) => this.setState({ models: { bannerId } }) }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default editor(connect(mapStateToProps)(UserDetails))
