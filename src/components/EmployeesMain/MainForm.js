import React, { Component } from 'react'
import './MainForm-style.css'
import GridContainer from "../../building_blocks/Grid/GridContainer";
import GridItem from "../../building_blocks/Grid/GridItem";
import Card from "../../building_blocks/Card/Card";
import CardBody from "../../building_blocks/Card/CardBody";
import Table from "../../building_blocks/Table/Table";
import Button from "../../building_blocks/CustomButtons/Button";
import {Edit} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import ManageMainService from "../../service/ManageMainService";

class MainForm extends Component {
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
                availability:''
            }
        }
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

    //REDIRECT TO THE EDIT FORM
    updateMain(id) {
        this.props.history.push(`/${id}/main/e`)
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
                        <GridContainer xs>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <GridItem xs={"8"}>
                                            <Card>
                                                <CardBody>
                                                    <Table
                                                        tableData={
                                                            [
                                                                [employee.firstName, employee.lastName, employee.position]
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
                <div className={"edit"}>
                    <Button onClick={() => this.updateMain(this.state._id)} color={"warning"}>
                        Edit
                        <Edit className={"icon"}/>
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter (MainForm)