import React from 'react';
import {Col, CardTitle, Input, Button} from 'mdbreact';
import FormErrors from './FormErrors';

class FormReset extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      password2: '',
      formErrors: {password: '', password2: ''},
      passwordValid: false,
      password2Valid: false,
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
    let passwordValid = this.state.passwordValid;
    let password2Valid = this.state.password2Valid;

    switch(fieldName){
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        passwordValid = value
        break;
      case 'password2':
        password2Valid = value === passwordValid ? true : false;
        fieldValidationErrors.password2 = password2Valid ? '': ' must equals Password';
        break;
      default:
      break;
    }
    this.setState({formErrors: fieldValidationErrors,
                  passwordValid: passwordValid,
                  password2Valid: password2Valid,
                }, this.validateForm);
  }

  validateForm(){
    this.setState({formValid: this.state.passwordValid && this.state.password2Valid});
  }

  errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
  }
    render(){
        return(
         <Col  md="6" className="col-md-6">
            <CardTitle>
              Reset Password
              <hr/>
              <FormErrors formErrors={this.state.formErrors} />
              <form method="post" action={`/api/reset/${this.props.match.params.token}`}>

                <Input name="password" className={`md-form ${this.errorClass(this.state.formErrors.password)}`} label="New Password" icon="lock" group type="password" value={this.state.password} onChange={(event) => this.handleUserInput(event)}/>
                <Input name="password2" className={`md-form ${this.errorClass(this.state.formErrors.password2)}`} label="Confirm Password" icon="lock" group type="password" value={this.state.password2} onChange={(event) => this.handleUserInput(event)}/>
                <div className="text-center">
                  <Button disabled={!this.state.formValid} type="submit">Update Password</Button>
                </div>
              </form>
            </CardTitle>
        </Col>
        );
    }
}

export default FormReset;
