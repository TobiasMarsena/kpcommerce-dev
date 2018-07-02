import React, { Component } from 'react'
import { Button } from 'mdbreact'

class Success extends Component {
  render(){
    return(
      <section className="text-center">
        <h2 className="font-weight-bold my-4">
          Thank you for completing the payment process
        </h2>
        <Button color="blue" href="/browse">
          Back to store
        </Button>
      </section>
    )
  }
}

export default Success
