
import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImage, CardBody, Badge } from 'mdbreact';

class Main extends Component {
  render() {
    return(
      <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">Our bestsellers</h2>
          <p className="grey-text text-center w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur veniam.</p>
          <Row>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card className="align-items-center">
                <CardImage src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" top alt="sample photo" overlay="white-slight" />
                <CardBody className="text-center">
                  <a href="" className="grey-text">
                    <h5>Shirt</h5>
                  </a>
                  <h5>
                    <strong>
                      <a href="/payment" className="dark-grey-text">Denim shirt <Badge pill color="danger">NEW</Badge></a>
                    </strong>
                  </h5>
                  <h4 className="font-weight-bold blue-text">
                    <strong>Rp 100.000</strong>
                  </h4>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card className="align-items-center">
                <CardImage src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" top alt="sample photo" overlay="white-slight" />
                <CardBody className="text-center">
                  <a href="" className="grey-text">
                    <h5>Sport wear</h5>
                  </a>
                  <h5>
                    <strong>
                      <a href="" className="dark-grey-text">Sweatshirt</a>
                    </strong>
                  </h5>
                  <h4 className="font-weight-bold blue-text">
                    <strong>Rp 300.000</strong>
                  </h4>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card className="align-items-center">
                <CardImage src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14.jpg" top alt="sample photo" overlay="white-slight" />
                <CardBody className="text-center">
                  <a href="" className="grey-text">
                    <h5>Sport wear</h5>
                  </a>
                  <h5>
                    <strong>
                      <a href="" className="dark-grey-text">Grey blouse <Badge pill color="primary">BEST</Badge></a>
                    </strong>
                  </h5>
                  <h4 className="font-weight-bold blue-text">
                    <strong>Rp 50.000</strong>
                  </h4>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card className="align-items-center">
                <CardImage src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15.jpg" top alt="sample photo" overlay="white-slight" />
                <CardBody className="text-center">
                  <a href="" className="grey-text">
                    <h5>Outwear</h5>
                  </a>
                  <h5>
                    <strong>
                      <a href="" className="dark-grey-text">Black jacket</a>
                    </strong>
                  </h5>
                  <h4 className="font-weight-bold blue-text">
                    <strong>Rp 200.000</strong>
                  </h4>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    );
  };
}

export default Main;
