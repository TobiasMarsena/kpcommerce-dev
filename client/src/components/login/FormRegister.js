import React from 'react';
import { Input, Button, Col} from 'mdbreact';

class FormRegister extends React.Component {
    render(){
      return(
			<Col md="6" className="col-md-6">
				<h2 className="mb-5">Form register</h2>
				<form method="post" action="/auth/register">
				    <p className="h5 text-center mb-4">Sign up</p>
				    <Input name="name" label="Your name" icon="user" group type="text" required error="wrong" success="right" />
				    <Input name="email" label="Your email" icon="envelope" group type="email" required error="wrong" success="right" />
				    <Input name="password" label="Your password" icon="lock" group type="password" required />
				    <div className="text-center">
				        <Button type="submit" color="deep-orange">Sign up</Button>
				    </div>
				</form>
			</Col>
		)
	}
}

export default FormRegister;
