import React from 'react'
import { connect } from 'react-redux'
import config from '@/config'
import DetailActions from '@/components/detail-actions'
import ImagePicker from '@/components/form/image-picker'
import UserContent from '@/components/user/user-content'
import editor from '@/hoc/editor'
import { setUser } from '@/store/actions'
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
    this.editMode = this.props.editMode.bind(this)
    this.createMode = this.props.createMode.bind(this)
    this.previewMode = this.props.previewMode.bind(this)
    this.init = this.props.init.bind(this)
    this.getUpdatedParams = this.props.getUpdatedParams.bind(this)
    this.onAction = this.props.onAction.bind(this)
    this.wrap = this.props.wrap.bind(this)
  }
  componentDidMount () {
    this.init()
  }
  model () {
    return this.props.user
  }
  isAuthUser () {
    return this.props.user.id === this.props.authUser.id
  }
  modify (params) {
    return this.$api.users.modify(this.props.user.id, params).then(() => {
      return this.$api.users.read(this.props.user.id)
    }).then((value) => {
      this.props.dispatchSetUser(value.data)
      return this.isAuthUser()
        ? this.$helpers.fetchCurrentUser()
        : Promise.resolve()
    }).then(() => {
      this.$notify.success('profile-update-successful')
    })
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
          onAction={ (type) => this.onAction(type) }
        />
        <ImagePicker
          blank={ config.blankBanner }
          className="c-user-details__banner"
          disabled={ this.previewMode() }
          value={ this.state.models.bannerId }
          onChange={ (id) => this.setState({ models: { ...this.state.models, bannerId: id } }) }
        />
        <div className="c-user-details__wrapper">
          <ImagePicker
            blank={ config.blankAvatar }
            className="c-user-details__avatar"
            disabled={ this.previewMode() }
            value={ this.state.models.avatarId }
            onChange={ (id) => this.setState({ models: { ...this.state.models, avatarId: id } }) }
          />
          <UserContent
            models={ this.state.models }
            onChange={ (models) => this.setState({ models: { ...this.state.models, ...models } }) }
            previewMode={ this.previewMode() }
            className="c-user-details__content"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user,
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (user) => dispatch(setUser(user))
})

export default editor(connect(mapStateToProps, mapDispatchToProps)(UserDetails))
