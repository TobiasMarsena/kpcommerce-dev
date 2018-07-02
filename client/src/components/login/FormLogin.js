
import React from 'react';
import { Input, Button, Col, Fa, CardTitle } from 'mdbreact';

class FormLogin extends React.Component {
  render(){
    return(
      <Col  md="6" className="col-md-6">
        <CardTitle>
          Form login
          <form method="post" action="/auth/login">
				    <p className="h5 text-center mb-4">Sign in</p>
				    <Input name="email" label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
				    <Input name="password" label="Type your password" icon="lock" group type="password" validate/>
				    <div className="text-center">
              <Button type="submit">Login</Button>
				    </div>
            <div className="text-center">
              <Button color="pink" href="/auth/instagram">
                <Fa icon="instagram" className="mr-3"/>
                Sign in with Instagram
              </Button>
              <Button color="danger" href="/auth/google">
                <Fa icon="google" className="mr-3"/>
                Sign in with Google
              </Button>
            </div>
          </form>
        </CardTitle>
      </Col>
    );
  }
}

export default FormLogin;
