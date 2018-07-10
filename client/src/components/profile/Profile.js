import React, { Component } from 'react'
import { Button } from 'mdbreact'

import Greeting from './Greeting'

class Profile extends Component {
  render() {
    return(
      <div>
        <Greeting />
        <Button href="/profile/edit">Edit your Profile</Button>
      </div>
    )
  }
}

export default Profile
