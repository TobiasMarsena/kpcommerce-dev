import React, { Component } from 'react'
import Youtube from 'react-youtube'

class Player extends Component {
  render() {
    const opts = {
      height: '200',
      width: '300',
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <div>
        <Youtube opts={opts} videoId="G1IbRujko-A" />
        <Youtube opts={opts} videoId="G1IbRujko-A" />
        <Youtube opts={opts} videoId="G1IbRujko-A" />
        <Youtube opts={opts} videoId="G1IbRujko-A" />
        <Youtube opts={opts} videoId="G1IbRujko-A" />
        <Youtube opts={opts} videoId="G1IbRujko-A" />
        <Youtube opts={opts} videoId="G1IbRujko-A" />
        <Youtube opts={opts} videoId="G1IbRujko-A" />
      </div>
    )
  }
}

export default Player
