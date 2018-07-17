
import React from 'react';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import {Row } from 'mdbreact';

class FormGrid extends React.Component {
    render(){
        return(
          <Row>
            <FormLogin />
            <FormRegister />
          </Row>
        );
    }
}

export default FormGrid;
