import React, { Component } from 'react'
import { connect } from 'react-redux'

class Greeting extends Component {
  insertGreeting(){
    switch(this.props.auth){
      case null: return ''
      case false: return 'Hello, Guest'
      default:
// axios get profile
      if (this.props.auth.user.name) {
        return 'Hello, ' + this.props.auth.user.name
      }
      return 'Hello, Guest'
    }
  }

  render(){
    return(
      <div>
        <h2>{this.insertGreeting()}</h2>
      </div>
    )
  }
}

function mapStatetoProps({ auth }){
  return { auth }
}
export default connect(mapStatetoProps)(Greeting)
