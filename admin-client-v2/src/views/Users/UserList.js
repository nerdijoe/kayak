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
    ControlLabel,
    FormControl,
} from 'react-bootstrap';

import { axiosEditUser, axiosFetchUser } from '../../actions';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            isEdit: false,
            userSelected: {},


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

    onFieldChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            userSelected: {...this.state.userSelected, [e.target.name]: e.target.value}
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log("after modify -----"+this.state.userSelected);
        console.log(this.state.userSelected);
        this.props.axiosEditUser(this.state.userSelected);
        this.props.axiosFetchUser();
        this.setState({showModal: false});
        this.setState({isEdit: false});
        /*const id = this.state.userSelected.id;
        this.props.users.map((user,index) => {
            if(user.id === id) {
                user = this.state.userSelected;
                console.log(index);
                this.props.users[index] = user;
                console.log(this.props.users);
            }
        });*/
        this.setState({userSelected: {}});

    }

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );

        return (
            <div className="Content">

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
                        <th>Profile Image</th>
                        <th>is Deleted</th>
                        <th>Ation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.users.map((user) => {
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
                                    <td>{user.profileImage}</td>
                                    <td>{user.isDeleted}</td>
                                    <td><DropdownButton bsStyle="info" title="view or modify">
                                        <MenuItem eventKey="1" active
                                                  onClick={() => this.openModalView(user)}>View</MenuItem>
                                        <MenuItem eventKey="2"
                                                  onClick={() => this.openModalModify(user)}>Modify</MenuItem>
                                    </DropdownButton>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>


                <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Info</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form horizontal onSubmit={this.handleSubmit}>
                            <fieldset disabled={!this.state.isEdit}>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        First Name
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="input" value={this.state.userSelected.firstName}
                                                     onChange={this.onFirstNameChange}
                                        />
                                    </Col>
                                </FormGroup>


                                {Object.keys(this.state.userSelected).map((keyName) => {
                                    return (
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={2}>
                                                {keyName}
                                            </Col>
                                            <Col sm={10}>
                                                <FormControl type="input" name={keyName}
                                                             value={this.state.userSelected[keyName]}
                                                             onChange={this.onFieldChange}
                                                />
                                            </Col>
                                        </FormGroup>
                                    )
                                })
                                }
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        axiosEditUser: (data) => { dispatch(axiosEditUser(data)); },
        axiosFetchUser: () => { dispatch(axiosFetchUser()); },
    };
};

const connectedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList);
export default connectedUserList;
