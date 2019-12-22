import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  toggle = () => {
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

    // Using Postman, I'll only type in the name as the id would be generated by
    // the database, just like here!

    const newItem = {
      name: this.state.name
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close Modal
    this.toggle();
  };

  render() {
    // const { items } = this.props.item;
    // console.log(this.props.item);
    // console.log(this.state);
    return (
      <div>
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add shopping item'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Item
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
  // Item is the name of the reducer in combineReducers, index.js
  item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);