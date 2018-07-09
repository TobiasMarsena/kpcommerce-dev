import React, { Component } from 'react'
import { connect } from 'react-redux'

class Greeting extends Component {
  insertGreeting(){
    switch(this.props.auth){
      case null: return ''
      case false: return 'Hello, Guest'
      default: if (this.props.auth.name) {
        return 'Hello, ' + this.props.auth.name
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
