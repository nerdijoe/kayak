import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  ControlLabel,
  FormControl,
  Checkbox,
  PageHeader,
  Alert,
} from 'react-bootstrap';

import {
  axiosSignIn,
  adminSignInErrorClear,
} from '../../actions';

const ErrorMessage = ({formErrors}) => (
  <div>
    <div></div>
    {
      Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <Alert bsStyle="warning">
            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
          </Alert>
        );
      }
    })}
  </div>
);

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('admin_token') != null) {
      this.props.history.push('/dashboard');
    }

    this.props.adminSignInErrorClear();
    // this.props.signUpSuccessClear();
  }

  validateField(fieldName, value) {
    const formErrorsValidation = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrorsValidation.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 4;
        formErrorsValidation.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: formErrorsValidation,
      emailValid,
      passwordValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  handleSignIn(e) {
    e.preventDefault();
    console.log('handleSignIn', this.state);

    this.props.axiosSignIn(this.state, this.props.history);
  }

  handleChange(e) {
    const target = e.target;
    console.log(`handleChange ${target.name}=[${target.value}]`);
    
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.validateField(target.name, target.value);
    });
  }

  render() {
    return (
      <div>
        <PageHeader>Kayak Admin 🤘 <small></small></PageHeader>
        <Row className="show-grid">
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}>
          
            <Form horizontal onSubmit={(e) => { this.handleSignIn(e); }} >
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="Email" name="email" value={this.state.email} onChange={(e) => { this.handleChange(e); }} />
                </Col>
              </FormGroup>
        
              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e) => { this.handleChange(e); }} />
                </Col>
              </FormGroup>
        
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit" disabled={!this.state.formValid}>
                    Sign in
                  </Button>
                </Col>
              </FormGroup>
            </Form>

          </Col>
          <Col xsHidden md={4}></Col>
        </Row>

        {
          // display sign in error message
          (this.props.signInErrorMsg.length > 0) ? 
            <Alert bsStyle="danger">
              {this.props.signInErrorMsg}
            </Alert>
            :
            ''
        }

        <ErrorMessage formErrors={this.state.formErrors} />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_authenticated: state.AdminReducer.is_authenticated,
    signInErrorMsg: state.AdminReducer.signInErrorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    axiosSignIn: (data, router) => { dispatch(axiosSignIn(data, router)); },
    adminSignInErrorClear: () => { dispatch(adminSignInErrorClear()); },
  };
};

const connectedSignIn = withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
export default connectedSignIn;
