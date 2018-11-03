import React from 'react'
import { connect } from 'react-redux'
import ImagePicker from '@/components/form/image-picker'
import '@/components/user/user-details.scss'

class UserDetails extends React.Component {
  render () {
    return (
      <div className="c-user-details">
        <ImagePicker
          className="c-user-details__banner"
          value={ this.props.user.bannerId }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(UserDetails)
