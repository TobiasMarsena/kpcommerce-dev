import React from 'react';
import {Col, CardTitle, Input, Button} from 'mdbreact';
import FormErrors from './FormErrors';

class FormForget extends React.Component {
  constructor(props){
    super(props);
    this.state = {     
      email: '',
      password: '',    
      formErrors: {email: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value){
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;

    switch(fieldName){
      case 'email':
        let emailTemp = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);;
             // .split(',')
             // .map(email => email.trim())
             // .filter(email => emailTemp.test(email)===false);

          emailValid = emailTemp;
          fieldValidationErrors.email = emailValid ? '' : ' is invalid';
          break;
        default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                }, this.validateForm);
  }

  validateForm(){
    this.setState({formValid: this.state.emailValid});
  }

  errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
  }
    render(){
        return(       	
         <Col  md="6" className="col-md-6">
            <CardTitle>
              <legend>Forget Password</legend>
              <hr/>   
              <FormErrors formErrors={this.state.formErrors} />
              <form method="post" action="/auth/forgot">
                <Input name="email" className={`md-form ${this.errorClass(this.state.formErrors.email)}`} label="Type your email" icon="envelope" group type="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)}/>
                <div className="text-center">
                  <Button type="submit">Reset Password</Button>
                </div>
              </form>
            </CardTitle>
        </Col>			
        );
    }
}
      
export default FormForget;
                      