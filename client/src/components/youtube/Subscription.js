import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Channel from './Channel'
import Player from './Player'

class Subscription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextPageToken: '',
      prevPageToken: '',
      items: {}
    }
  }

  componentDidMount() {
    this.getSubscriptions();
  }

  getSubscriptions() {
    axios.get('/api/subscriptions', {}).then((response) => {
      const data = response.data.data;
      if (data) {
        this.setState({nextPageToken: data.nextPageToken})
        this.setState({prevPageToken: data.prevPageToken})
        this.setState({items: data.items})
        if (this.state.items.map) {
          ReactDOM.render(<Channel list={this.state.items} />,
            document.getElementById('subs'))
        }
      }
      return null;
    });
  }

  render() {
    return (
      <div id="subs">
        <Player />
      </div>
    )
  }
}

export default Subscription
