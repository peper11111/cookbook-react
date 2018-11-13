import React from 'react'
import { connect } from 'react-redux'
import config from '@/config'
import lazyLoad from '@/lazyLoad'
import Editor from '@/mixins/editor'
import { setUser } from '@/store/actions'
import '@/components/user/user-details.scss'

const DetailActions = lazyLoad(() => import('@/components/detail-actions'))
const ImagePicker = lazyLoad(() => import('@/components/form/image-picker'))
const UserContent = lazyLoad(() => import('@/components/user/user-content'))

class UserDetails extends Editor {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      models: {
        avatarId: null,
        bannerId: null,
        name: null,
        biography: null
      }
    }
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
          onChange={ (value) => this.setState({ models: { ...this.state.models, bannerId: value } }) }
        />
        <div className="c-user-details__wrapper">
          <ImagePicker
            blank={ config.blankAvatar }
            className="c-user-details__avatar"
            disabled={ this.previewMode() }
            value={ this.state.models.avatarId }
            onChange={ (value) => this.setState({ models: { ...this.state.models, avatarId: value } }) }
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
