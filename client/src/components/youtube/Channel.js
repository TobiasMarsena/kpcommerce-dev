import React, { Component } from 'react'
import { Row, Col, View, Mask } from 'mdbreact'

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
    }
  }

  render() {
    return (
      <div>
        {this.state.list.map((channel) =>
          <div key={channel.id}>
            <Row>
              <Col lg="1">
                <View className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                  <img className="img-fluid" src={channel.snippet.thumbnails.default.url} alt="Channel's Logo"/>
                  <a><Mask overlay="white-slight"/></a>
                </View>
              </Col>
              <Col lg="9">
                <h3 className="font-weight-bold mb-3 p-0">{channel.snippet.title}</h3>
                <p>{channel.snippet.description}</p>
              </Col>
            </Row>
          </div>
        )}
      </div>
    )
  }
}

export default Channel
