import React, { Component } from 'react'
import GridContainer from "../../building_blocks/Grid/GridContainer";
import GridItem from "../../building_blocks/Grid/GridItem";
import SnackbarContent from "../../building_blocks/Snackbar/SnackbarContent";
import Card from "../../building_blocks/Card/Card";
import CardBody from "../../building_blocks/Card/CardBody";
import Table from "../../building_blocks/Table/Table";
import CardHeader from "../../building_blocks/Card/CardHeader";
import Button from "../../building_blocks/CustomButtons/Button";
import {Add, AddBox, AddBoxOutlined, Done, Edit, Update} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import ManageMainService from "../../service/ManageMainService";
import './EditForm-style.css'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Danger from "../../building_blocks/Typography/Danger";
import ErrorIcon from "@material-ui/icons/Error";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import ManageRestaurantService from "../../service/ManageRestaurantService";
import Checkbox from "@material-ui/core/Checkbox";
import {emphasize} from "@material-ui/core";

class EditMainForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params.id,
            restName: '',
            employees: [],
            employee: {
                _id: '',
                restaurantId: this.props.match.params.id,
                firstName:'',
                lastName:'',
                position:'',
                availability: false
            },
            employeeEdit: {
                restaurantId: this.props.match.params.id,
                firstName:'',
                lastName:'',
                position:'',
                availability: false
            },
            open: false,
            openEdit: false,
            employeeEditId: ''
        }
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount() {
        console.log(this.state)
        this.refreshMain();
    }

    //METHOD USED TO GET INFORMATION FROM DATA BASE
    refreshMain(){
        ManageMainService.retrieveMainById(this.state._id)
            .then(
                response => {
                    this.setState({restName: response.data[0], employees: response.data[1]})
                }
            )
    }

    //SET STATE OF DIALOG TO TRUE AND OPEN IT
    handleOpen = event => {
        this.setState({
            ...this.state,
            open: true
        });
    };

    //SET STATE OF DIALOG EDIT TO TRUE AND OPEN IT
    handleOpenEdit(id){
        console.log(this.state)
        console.log(id);
        ManageMainService.retrieveEmployeeById(this.state._id, id)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        employeeEdit: {
                            restaurantId: this.props.match.params.id,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            position: response.data.position,
                            availability: response.data.availability
                        },
                        employeeEditId: id,
                        openEdit: true
                    })
                    console.log(this.state.employeeEdit)
                }
            )
    };

    //SET STATE OF DIALOG TO FALSE AND CLOSE IT
    handleClose = event => {
        this.setState({
            ...this.state,
            open: false,
            openEdit:false
        });
    };

    //HANDLE CHANGE IN TEXT FIELDS
    handleChange = event => {
        const { value, name } = event.target;
        const {employee} = this.state;
        employee[name] = value;
        this.setState({
            ...this.state,
            employee
        });
        console.log("STATE UPDATED")
        console.log(this.state)
    };

    //HANDLE CHANGE IN EMPLOYEE EDIT TEXT FIELDS
    handleChangeEdit = event => {
        const { value, name } = event.target;
        const {employeeEdit} = this.state;
        employeeEdit[name] = value;
        this.setState({
            ...this.state,
            employeeEdit
        });
        console.log("STATE UPDATED")
        console.log(this.state)
    };

    //ADD A NEW EMPLOYEE AND CHECK CONSTRAINTS
    addEmployee(){
        // if (this.state.name == "" || this.state.rfc == '' || this.state.location == '' || this.state.restManagerName == '' || this.state.restManagerEmail == "" || this.state.restManagerPassword == '' || this.state.restManagerPhone == ''){
        //     this.state.name == '' ? this.setState({errorName: true}) : this.setState({errorName: false})
        //     this.state.rfc == '' ? this.setState({errorRFC: true}) : this.setState({errorRFC: false})
        //     this.state.location == '' ? this.setState({errorLocation: true}) : this.setState({errorLocation: false})
        //     this.state.restManagerName == '' ? this.setState({errorRestManagerName: true}) : this.setState({errorRestManagerName: false})
        //     this.state.restManagerEmail == '' ? this.setState({errorRestManagerEmail: true}) : this.setState({errorRestManagerEmail: false})
        //     this.state.restManagerPassword == '' ? this.setState({errorRestManagerPassword: true}) : this.setState({errorRestManagerPassword: false})
        //     this.state.restManagerPhone == '' ? this.setState({errorRestManagerPhone: true}) : this.setState({errorRestManagerPhone: false})
        // }else{
        console.log("VALUES")
        console.log(this.state.employee)
        console.log(this.state._id)
        ManageMainService.createNewEmployee(this.state.employee, this.state._id)
            .then(
                response => {
                    this.setState({
                        ...this.state,
                        open: false
                    });
                    this.refreshMain();
                }
            )
        // ManageRestaurantService.createNewRestaurant(this.state)
        //     .then(
        //         response => {
        //             console.log(this.state)
        //             this.props.history.push(`/restaurants`)
        //         }
        //     )
        // }
    }

    //HANDLE CHECKBOX FOR AVAILABILITY IN CREATE NEW EMPLOYEE
    handleAvailabilityChange () {
        if (this.state.employee.availability == true){
            this.setState({ employee: {
                    restaurantId: this.props.match.params.id,
                    firstName:this.state.employee.firstName,
                    lastName:this.state.employee.lastName,
                    position:this.state.employee.position,
                    availability: false
                }})
        } else if (this.state.employee.availability == false){
            this.setState({ employee: {
                    restaurantId: this.props.match.params.id,
                    firstName:this.state.employee.firstName,
                    lastName:this.state.employee.lastName,
                    position:this.state.employee.position,
                    availability: true}})
        }
    }

    //HANDLE CHECKBOX FOR AVAILABILITY IN EDIT EMPLOYEE
    handleAvailabilityChangeEdit () {
        if (this.state.employeeEdit.availability == true){
            this.setState({ employeeEdit: {
                    restaurantId: this.props.match.params.id,
                    firstName:this.state.employeeEdit.firstName,
                    lastName:this.state.employeeEdit.lastName,
                    position:this.state.employeeEdit.position,
                    availability: false
                }})
        } else if (this.state.employeeEdit.availability == false){
            this.setState({ employeeEdit: {
                    restaurantId: this.props.match.params.id,
                    firstName:this.state.employeeEdit.firstName,
                    lastName:this.state.employeeEdit.lastName,
                    position:this.state.employeeEdit.position,
                    availability: true}})
        }
    }

    updateMain(id){
        this.props.history.push(`/${id}/main/`)
    }

    updateEmployee(employee){
        console.log(employee)
        this.setState({
            employeeEdit: {
                restaurantId: this.props.match.params.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                position: employee.position,
                availability: employee.availability
            }
        })
        console.log(this.state.employeeEdit)
        console.log(employee)
        console.log(this.state._id)
        console.log(this.state.employeeEdit)
        ManageMainService.updateEmployee(this.state._id, this.state.employeeEditId, employee)
            .then(
                response => {
                    this.setState({
                        ...this.state,
                        openEdit: false
                    });
                    this.refreshMain();
                }
            )
    }

    render() {
        return(
            <div>
                <div className={"restName"}>
                    <h3>
                        Restaurant:
                        <br/>
                        <small>
                            {this.state.restName}
                        </small>
                    </h3>
                </div>
                <div className={"restSch"}>
                    <h4>
                        SCHEDULE
                        <br/>
                        <small>
                            9:00 AM - 5:00 PM
                        </small>
                    </h4>
                </div>
                <div className={"restEmp"}>
                    <h4>
                        EMPLOYEES
                        <GridContainer item xs class={"tabW"}>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <GridItem  xs={"8"} >
                                            <Card>
                                                <CardBody>
                                                    <Table
                                                        tableData={
                                                            [
                                                                [<label class={"tableFName"}> {employee.firstName}</label>
                                                                    ,<label class={"tableLName"}> {employee.lastName}</label>,
                                                                    <label class={"tablePos"}> {employee.position}</label>,
                                                                    <label class={"table4"}> {employee.availability == true ? "Enable" : "Disable"}</label>,
                                                                    <Button onClick={() => this.handleOpenEdit(employee._id)}
                                                                            className={"button"} color={"warning"} >
                                                                        Edit
                                                                        <Edit className={"icon"}/>
                                                                    </Button>]
                                                            ]
                                                        }
                                                    />
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                )
                            }
                        </GridContainer>
                    </h4>
                </div>
                <div class={"pad"}>
                    <Button onClick={this.handleOpen} color={"warning"}>
                        ADD EMPLOYEE
                        <Add className={"icon"}/>
                    </Button>
                </div>
                <Dialog
                    fullWidth="50px"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>
                        Add New Employee:
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            <TextField
                                required
                                //error={this.state.errorRestManagerEmail}
                                fullWidth="50px"
                                name="firstName"
                                label="First Name"
                                id="firstName"
                                onChange={this.handleChange}
                                //defaultValue={this.restManagerEmail}
                            />
                            <br/>
                            <br/>
                            <TextField
                                required
                                error={this.state.errorRestManagerEmail}
                                fullWidth="50px"
                                name="lastName"
                                label="Last Name"
                                id="lastName"
                                onChange={this.handleChange}
                                //defaultValue={this.restManagerEmail}
                            />
                            <br/>
                            <br/>
                            <TextField
                                required
                                error={this.state.errorRestManagerEmail}
                                fullWidth="50px"
                                name="position"
                                label="Position"
                                id="position"
                                onChange={this.handleChange}
                                //defaultValue={this.restManagerEmail}
                            />
                            <br/>
                            <br/>
                            <label>
                                Availability
                            </label>
                            <br/>
                            <Checkbox color={"default"} checked={this.state.employee.availability} onChange={ () => {this.handleAvailabilityChange()}}/>
                            <br/>
                            <br/>
                            <Button color={"success"} className={"button"} onClick={() => this.addEmployee()}>
                                Confirm
                                <Done className={"icon"}/>
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Dialog
                    fullWidth="50px"
                    open={this.state.openEdit}
                    onClose={this.handleClose}
                >
                    <DialogTitle>
                        Edit Employee:
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            <TextField
                                required
                                //error={this.state.errorRestManagerEmail}
                                fullWidth="50px"
                                name="firstName"
                                label="First Name"
                                id="firstName"
                                onChange={this.handleChangeEdit}
                                value={this.state.employeeEdit.firstName + ""}
                                //defaultValue={this.restManagerEmail}
                            />
                            <br/>
                            <br/>
                            <TextField
                                required
                                error={this.state.errorRestManagerEmail}
                                fullWidth="50px"
                                name="lastName"
                                label="Last Name"
                                id="lastName"
                                onChange={this.handleChangeEdit}
                                value={this.state.employeeEdit.lastName + ""}
                                //defaultValue={this.restManagerEmail}
                            />
                            <br/>
                            <br/>
                            <TextField
                                required
                                error={this.state.errorRestManagerEmail}
                                fullWidth="50px"
                                name="position"
                                label="Position"
                                id="position"
                                onChange={this.handleChangeEdit}
                                value={this.state.employeeEdit.position + ""}
                                //defaultValue={this.restManagerEmail}
                            />
                            <br/>
                            <br/>
                            <label>
                                Availability
                            </label>
                            <br/>
                            <Checkbox color={"default"} checked={this.state.employeeEdit.availability == true ? true : false}
                                      onChange={ () => {this.handleAvailabilityChangeEdit()}}/>
                            <br/>
                            <br/>
                            <Button color={"success"} className={"button"} onClick={() => this.updateEmployee(this.state.employeeEdit)}>
                                Confirm
                                <Done className={"icon"}/>
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <br/>
                <div className={"edit"}>
                    <Button onClick={() => this.updateMain(this.state._id)} color={"warning"}>
                        Confirm
                        <Update className={"icon"}/>
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter (EditMainForm)