import React, { Component } from 'react'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Greeting from './Greeting'
import Summary from './Summary'

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile()
  }
  renderButton() {
    switch(this.props.profile){
      case null: return ''
      case false:
        return <Button href="/login">Please login before proceeding</Button>
      default:
        return  <div>
                  <Summary />
                  <Button href="/profile/edit">Edit your Profile</Button>
                </div>

    }
  }
  render() {
    return(
      <div>
        <Greeting />
        {this.renderButton()}
      </div>
    )
  }
}

function mapStateToProps({ profile }) {
  return { profile }
}

export default connect(mapStateToProps, actions)(Profile)
