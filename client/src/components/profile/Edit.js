import React, { Component } from 'react'
import { Input, Button, Col, Row, Fa } from 'mdbreact'

class Edit extends Component{
  render(){
    return(
      <div className="container">
        <form method="post" action="/api/profile/edit">
          <Row>
            <Col  md="6" className="col-md-6">
              <p className="h5 text-center mb-4">Profile</p>
              <Row>
                <Col md="6" className="col-md-3">
                  <Input icon="user" name="first_name" label="First Name" group type="text" validate/>
                </Col>
                <Col md="6" className="col-md-3">
                  <Input name="last_name"  label="Last Name" group type="text" validate/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input icon="phone" name="phone" label="Phone Number" group type="tel" validate />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input icon="bank" name="bank_account" label="Bank Account" group type="text"></Input>
                </Col>
              </Row>
            </Col>
            <Col  md="6" className="col-md-6">
              <p className="h5 text-center mb-4">Billing Address</p>
              <Row>
                <Col>
                  <Input name="street" label="Street" group type="text"></Input>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input name="city" label="City" group type="text"></Input>
                </Col>
                <Col>
                  <Input name="state" label="State" group type="text"></Input>
                </Col>
                <Col>
                  <Input name="country" label="Country" group type="text"></Input>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="text-center">
            <Button rounded type="submit">Update <Fa className="ml-1" icon="pencil" /></Button>
          </div>
        </form>
      </div>
    )
  }
}

export default Edit
