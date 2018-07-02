import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {

  componentDidMount() {
    this.insertProfile();
  }

  insertProfile() {
    axios.get('/api/current_user', {}).then((response) => {
      const data = response.data
      if (data !== "Please log in first") {
        const name = data.name
        const image = `<img src="${data.image}" />`

        this.refs.name.insertAdjacentHTML('beforeend', name)
        this.refs.image.insertAdjacentHTML('beforeend', image)
      }
    });
  }

  render() {
    return(
      <div>
        <h2 ref="name">Hello, </h2>
        <div ref="image"></div>
      </div>
    )
  }
}

export default Profile
