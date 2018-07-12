import React, { Component } from 'react'
import { connect } from 'react-redux'

class Greeting extends Component {
  insertGreeting(){
    switch(this.props.profile){
      case null: return ''
      case false: return <strong>Hello, Guest</strong>
      default: return <strong>Hello, {this.props.profile.user.name}</strong>
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

function mapStateToProps({ profile }) {
  return { profile }
}

export default connect(mapStateToProps)(Greeting)
