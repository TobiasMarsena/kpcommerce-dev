import React, { Component } from 'react'
import { Fa, Table } from 'mdbreact'
import { connect } from 'react-redux'

class Summary extends Component {
  mapAddress() {
    const address = this.props.profile.customer.address
    const addressHTML = address.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row"><h4><strong>
                <a className="dark-grey-text">{item.street}</a>
          </strong></h4></th>
          <td><h4><strong>
                <a className="dark-grey-text">{item.city}</a>
          </strong></h4></td>
          <td><h4><strong>
                <a className="dark-grey-text">{item.state}</a>
          </strong></h4></td>
          <td><h4><strong>
                <a className="dark-grey-text">{item.country}</a>
          </strong></h4></td>
        </tr>
      )
    })
    return (
      <tbody>
        {addressHTML}
      </tbody>
    )
  }

  render() {
    const customer = this.props.profile.customer
    return (
      <div>
        <h3>
          <Fa icon="phone" /> Phone Number: {customer.phone} <br></br>
          <Fa icon="bank" /> Bank Account: {customer.bank_account}
        </h3>
        <Table>
          <thead className="mdb-color darken-3">
            <tr className="text-white">
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          {this.mapAddress()}
        </Table>
      </div>
    )
  }
}

function mapStateToProps({ profile }) {
  return { profile }
}

export default connect(mapStateToProps)(Summary)
