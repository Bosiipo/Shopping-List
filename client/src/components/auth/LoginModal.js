import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ModalBody,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';


class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    message: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error){
      // Check for register error
      if(error.id === 'LOGIN_FAIL'){
        this.setState({ message: error.message.message });
      } else {
        this.setState({message: null});
      }
    }

    // If authenticated, close modal.
    if (this.state.modal) {
      if(isAuthenticated) {
        this.toggle();
      }
    }

  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    // Use this.setState({[e.target.name]: e.target.value }) instead of this.setState({name: e.target.value})
    // because for this particular component, the input is dynamic, I think it means it can be anything
    // unlike an email and password form where input is static. One particular thing
    this.setState({ [e.target.name]: e.target.value });
    // console.log([e.target.name], [e.target.value]);
  };

  onSubmit = e => {
    e.preventDefault();

    const {email, password} = this.state;

    const user = {
        email,
        password
    }

    // Attempt to login
    this.props.login(user);
    
  };

  render() {
    // const { items } = this.props.item;
    // console.log(this.props.item);
    // console.log(this.state);
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
            Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            { this.state.message ? (<Alert color="danger">{ this.state.message }</Alert>) : null }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
