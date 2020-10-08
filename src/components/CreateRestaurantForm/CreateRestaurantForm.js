import React, { Component } from 'react'
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Button from "../../building_blocks/CustomButtons/Button.js";
import Card from "../../building_blocks/Card/Card.js";
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardBody from "../../building_blocks/Card/CardBody.js";
import CardFooter from "../../building_blocks/Card/CardFooter.js";
import ManageItemsService from "../../service/ManageItemsService";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import ManageRestaurantService from "../../service/ManageRestaurantService";
import Navbar from "../../building_blocks/Navbars/Navbar";
import DashboardPage from "../Dashboard_DeliveryRestaurant/Dashboard_DeliveryRestaurant";
import "../Form-styles.css"

class CreateRestaurantForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            rfc:'',
            location:'',
            availability:'',
            restManagerName:'',
            restManagerEmail:'',
            restManagerPassword: '',
            restManagerPhone: ''
        }
        this.addRestaurantsClicked = this.addRestaurantsClicked.bind(this)
    }

    addRestaurantsClicked() {
        ManageRestaurantService.createNewRestaurant(this.state)
            .then(
                response => {
                    console.log(this.state)
                    this.props.history.push(`/restaurants`)
                }
            )
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };


    render() {
        return (
            <div>
                <Navbar/>
                <div className="content">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="rose">
                                    <h4 >Create New Restaurant</h4>
                                    <p >Complete Profile</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                name="name"
                                                label="Name"
                                                id="name"
                                                onChange={this.handleChange}
                                                value={this.name}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                name="rfc"
                                                label="RFC"
                                                id="rfc"
                                                onChange={this.handleChange}
                                                defaultValue={this.rfc}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                name="location"
                                                label="Location"
                                                id="location"
                                                onChange={this.handleChange}
                                                defaultValue={this.location}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                name="restManagerName"
                                                label="Manager Name"
                                                id="restManagerName"
                                                onChange={this.handleChange}
                                                defaultValue={this.restManagerName}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                name="restManagerEmail"
                                                label="Manager Email"
                                                id="restManagerEmail"
                                                onChange={this.handleChange}
                                                defaultValue={this.restManagerEmail}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                type="password"
                                                name="restManagerPassword"
                                                label="Manager Password"
                                                id="restManagerPassword"
                                                onChange={this.handleChange}
                                                defaultValue={this.restManagerPassword}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <TextField
                                                fullWidth="10px"
                                                name="restManagerPhone"
                                                label="Manager Phone"
                                                id="restManagerPhone"
                                                onChange={this.handleChange}
                                                defaultValue={this.restManagerPhone}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="rose" onClick={this.addRestaurantsClicked}>Add Restaurant</Button>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default CreateRestaurantForm