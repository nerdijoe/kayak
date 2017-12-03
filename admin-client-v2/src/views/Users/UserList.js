import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Table,
    Button,
    Modal,
    OverlayTrigger,
    Popover,
    Tooltip,
    DropdownButton,
    MenuItem,
    Form,
    FormGroup,
    Col,
    Row,
    ControlLabel,
    FormControl,
} from 'react-bootstrap';

import { axiosEditUser, axiosFetchUser, searchUser, } from '../../actions';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            isEdit: false,
            userSelected: {},
            errors: {
                zipcodeError: '',
                phoneError: '',},
            searchBar: '',

        };
    }

    getInitialState() {
        return {
            showModal: false,
            isEdit: false,
            userSelected: {},
        };
    }

    closeModal() {
        this.setState({showModal: false});
        this.setState({isEdit: false});
        this.setState({userSelected: {}});
    }

    openModalView(user) {
        console.log('open view');
        this.setState({showModal: true});
        this.setState({isEdit: false});
        this.setState({userSelected: user});
    }

    openModalModify(user) {
        console.log('open modify');
        this.setState({showModal: true});
        this.setState({isEdit: true});
        this.setState({userSelected: user});
    }

    onFieldChange (e){

        this.setState({userSelected: {...this.state.userSelected, [e.target.name]: e.target.value }});

    };

    onChangeSearch(e){
        const target = e.target;
        console.log(`handleChange [${target.value}]`);

        this.setState({
            [target.name]: target.value,
        });
        this.props.searchUser(target.value);

    }

    handleValidation(){
        let formIsValid = true;
        let errorsV = {zipcodeError: '', phoneError: ''};

       //zipcode
        if(!this.state.userSelected.zipcode.match(/^\d{5}(?:[-\s]\d{4})?$/)){
            formIsValid = false;
            errorsV.zipcodeError = "Only digits and at leat 5";
        }

         //phone
         if(!this.state.userSelected.phone.match(/^\d{10}$/)){
             formIsValid = false;
             errorsV.phoneError = "phone error";
         }

        this.setState({errors: errorsV});
        return formIsValid;
    }


    handleSubmit (e) {
        e.preventDefault();
        console.log("after modify -----"+this.state.userSelected);
        console.log(this.state.userSelected);

        if(this.handleValidation()){
            alert("Form submitted");
            this.props.axiosEditUser(this.state.userSelected);
            this.setState({showModal: false});
            this.setState({isEdit: false});
            this.setState({userSelected: {}});
        }else{
            alert("Form has errors.")
        }

    };

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
            very popover. such engagement
            </Popover>);
        const tooltip = (
            <Tooltip id="modal-tooltip">
            wow.
            </Tooltip>);

        return (
            <div className="Content">

            <Row>
                <Col md={5} >
                    <FormControl type="text" value={this.state.searchBar} name="searchBar"
                        onChange={(e) => this.onChangeSearch(e)} placeholder="INPUT SEARCH KEY WORD">
                    </FormControl>
                </Col>
            </Row>

            <Table responsive>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Phone</th>
                            <th>Ation</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.users && this.props.searchUsers.filter(user => user.isDeleted !== true).map((user) => {
                            return (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.city}</td>
                            <td>{user.state}</td>
                            <td>{user.zipcode}</td>
                            <td>{user.phone}</td>
                            <td><DropdownButton bsStyle="info" title="view or modify">
                                    <MenuItem eventKey="1" active
                                    onClick={() => this.openModalView(user)}>View</MenuItem>
                                    <MenuItem eventKey="2"
                                    onClick={() => this.openModalModify(user)}>Modify</MenuItem>
                                </DropdownButton>
                            </td>
                        </tr>
                        )})}
                    </tbody>
            </Table>


        <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
            <Modal.Header closeButton>
            <Modal.Title>User Info</Modal.Title>
            </Modal.Header>

            <Modal.Body>

            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <fieldset disabled={!this.state.isEdit}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            First Name
                        </Col>
                        <Col sm={10}>
                            <FormControl required type="text" name="firstName" value={this.state.userSelected.firstName}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Last Name
                        </Col>
                        <Col sm={10}>
                            <FormControl required type="text" name="lastName" value={this.state.userSelected.lastName}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                            </Col>
                            <Col sm={10}>
                            <FormControl required type="email" name="email" value={this.state.userSelected.email}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" name="password" value={this.state.userSelected.password}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Address
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" name="address" value={this.state.userSelected.address}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            City
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" name="city" value={this.state.userSelected.city}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            State
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" name="state" value={this.state.userSelected.state}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Zipcode
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" name="zipcode" value={this.state.userSelected.zipcode}
                                onChange={this.onFieldChange.bind(this)}/>
                            <span style={{color: "red"}}>{this.state.errors.zipcodeError}</span>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Phone
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="phone" value={this.state.userSelected.phone}
                        onChange={this.onFieldChange.bind(this)}/>
                            <span style={{color: "red"}}>{this.state.errors.phoneError}</span>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            ProfileImage
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" name="profileimage" value={this.state.userSelected.profileimage}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Credit Card Number
                        </Col>
                        <Col sm={10}>
                            <FormControl type="number" name="creditCardNum" value={this.state.userSelected.creditCardNum}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Credit Card Full Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="creditCardFullName" value={this.state.userSelected.creditCardFullName}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Is Deleted
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="isDeleted" value={this.state.userSelected.isDeleted}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Created At
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="createdAt" value={this.state.userSelected.createdAt}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Updated At
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="updatedAt" value={this.state.userSelected.updatedAt}
                        onChange={this.onFieldChange.bind(this)}
                        />
                        </Col>
                    </FormGroup>

                </fieldset>
            {this.state.isEdit?
                (<FormGroup>
                    <Col smOffset={4} sm={10}>
                        <Button type="submit" >
                        Submit Change
                        </Button>
                    </Col>
                </FormGroup>): null}
            </Form>

        </Modal.Body>
        <Modal.Footer>
        <Button onClick={() => this.closeModal()}>Close</Button>
        </Modal.Footer>
        </Modal>

        </div>
        );
        }
    }

const mapStateToProps = (state) => {
    return {
    users: state.UserReducer.users,
    searchUsers: state.UserReducer.searchUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        axiosEditUser: (data) => { dispatch(axiosEditUser(data)); },
        searchUser: (data) => { dispatch(searchUser(data)); },
};
};

const connectedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList);
export default connectedUserList;