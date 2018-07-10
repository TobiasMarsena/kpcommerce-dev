import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'mdbreact'
import { SyncLoader } from 'react-spinners'
import { connect } from 'react-redux'
import TablePayment from './TablePayment'
const snap = window.snap

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
        price: 75000,
        quantity: 2,
        name: "Jeans"
      }],
      customer_details: {
        name: ""
      }
    }
  }

  // componentWillMount() {
  //   const script = document.createElement("script");
  //   script.setAttribute("data-client-key", "SB-Mid-client-bL_XMR0BUvaqYG98")
  //   script.setAttribute("src", "https://app.sandbox.midtrans.com/snap/snap.js")
  //   const snap = document.head.appendChild(script);
  //   console.log("script added")
  //   console.log(snap)
  // }
  async componentDidMount() {
    const items = this.state.item_details;
    var gross_amount = 0;
    items.map((item)  => {
      gross_amount += (item.price * item.quantity)
      return true
    })
    this.setState({
      transaction_details: {
        order_id: "102",
        gross_amount: gross_amount
      }
    })
    const response = await axios.get("/api/profile")
    this.setState({
      customer_details: {
        name: response.data.user.name
      }
    })
  }

  async showSNAP() {
    const res = await axios.post("/api/payment", this.state, {})
    snap.pay(res.data.token)
  }
  renderCheckoutButton() {
    switch(this.props.auth) {
      case null:
        return <SyncLoader color={"D0021B"}/>
      case false:
        return <Button color="danger" disabled>
                <h5 className="font-weight-bold">
                  Please Login First
                </h5>
              </Button>
      default:
        return <Button color="danger" onClick={
                  this.showSNAP.bind(this)
                }>
                <h4 className="font-weight-bold">
                  CHECKOUT
                </h4>
              </Button>
    }
  }
  render(){
    const transactionData = this.state
    return(
      <div>

        <h2>Dummy Payment</h2>
          <TablePayment transactionData={ transactionData }/>
          <section className="text-right">
            {this.renderCheckoutButton()}
          </section>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}
export default connect(mapStateToProps)(Payment)
