import React from 'react'
import { connect } from 'react-redux'
import config from '@/config'
import DetailActions from '@/components/detail-actions'
import ImagePicker from '@/components/form/image-picker'
import editor from '@/hoc/editor'
import '@/components/user/user-details.scss'

class UserDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pending: this.props.pending,
      mode: this.props.mode,
      models: {
        avatarId: null,
        bannerId: null,
        name: null,
        biography: null
      }
    }
    this.init = this.props.init.bind(this)
    this.editMode = this.props.editMode.bind(this)
    this.createMode = this.props.createMode.bind(this)
    this.previewMode = this.props.previewMode.bind(this)
    this.onAction = this.props.onAction.bind(this)
    this.wrap = this.props.wrap.bind(this)
  }
  model () {
    return this.props.user
  }
  isAuthUser () {
    return this.props.user.id === this.props.authUser.id
  }
  componentDidMount () {
    this.init()
  }
  render () {
    return (
      <div className="c-user-details">
        <DetailActions
          disabled={ this.state.pending }
          canEdit={ this.isAuthUser() }
          editMode={ this.editMode() }
          createMode={ this.createMode() }
          previewMode={ this.previewMode() }
          onAction={ this.onAction }
        />
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
  authUser: state.auth.user,
  user: state.user
})

export default editor(connect(mapStateToProps)(UserDetails))
