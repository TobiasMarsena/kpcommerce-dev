import React, { Component } from 'react'
import { Table } from 'mdbreact'

class TablePayment extends Component {

  mapItem(){
    const items = this.props.transactionData.item_details
    const transaction = this.props.transactionData.transaction_details
    var itemHTML = items.map((item, index) => {
      return(
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td><h4><strong>
                <a className="dark-grey-text">{item.name}</a>
          </strong></h4></td>
          <td><h4><strong>
                {item.quantity}
          </strong></h4></td>
          <td>
            <h4 className="font-weight-bold blue-text">
              <strong>Rp {item.price}</strong>
            </h4>
          </td>
        </tr>
      )
    })
    var totalHTML =
    <tr>
      <th scope="row"></th>
      <td></td>
      <td><h4><strong>Total</strong></h4></td>
      <td>
        <h4 className="font-weight-bold blue-text">
          <strong>Rp {transaction.gross_amount}</strong>
        </h4>
      </td>
    </tr>
    return <tbody>{itemHTML}{totalHTML}</tbody>
  }
  render() {
    return(
      <Table>
        <thead className="mdb-color darken-3">
          <tr className="text-white">
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        {this.mapItem()}
      </Table>
    )
  }
}

export default TablePayment
