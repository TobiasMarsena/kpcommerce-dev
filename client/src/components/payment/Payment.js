import React, { Component } from 'react'
import { Button } from 'mdbreact'
import TablePayment from './TablePayment'

class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transaction_details: {
        order_id: "",
        gross_amount: 0
      },
      item_details: [{
        id: "001",
        price: 100000,
        quantity: 1,
        name: "Denim Shirt"
      },
      {
        id: "002",
        price: 200000,
        quantity: 2,
        name: "Jeans"
      }]
    }
  }

  componentDidMount() {
    const items = this.state.item_details;
    var gross_amount = 0;
    items.map((item)  => {
      gross_amount += (item.price * item.quantity)
      return true
    })
    this.setState({
      transaction_details: {
          order_id: "101",
          gross_amount: gross_amount
        }
      })
  }

  showSNAP(transactionData) {
    console.log(transactionData)
  }
  render(){
    const transactionData = this.state
    return(
      <div>
        <h2>Dummy Payment</h2>
          <TablePayment transactionData={ transactionData }/>
          <section className="text-right">
            <Button color="danger" onClick={
                this.showSNAP.bind(null, transactionData)
              }>
              <h4 className="font-weight-bold">
                CHECKOUT
              </h4>
            </Button>
          </section>
      </div>
    )
  }
}

export default Payment
