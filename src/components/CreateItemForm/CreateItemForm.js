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

class AddMaterialForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            price: '',
            availability: true,
            includedSides: '',
            restaurantId: "5f52e7ac97345cbcabcfc829"
        }
        this.addItemsClicked = this.addItemsClicked.bind(this)
    }

    addItemsClicked() {
        console.log("THIS.PROPS")
        console.log(this.props)
        console.log(this.props.history)
        ManageItemsService.createNewItem(this.state)
            .then(
                response => {
                    console.log(this.state)
                    this.props.history.push(`/`)
                    //this.setState({ item: response.data })
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
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="success">
                            <h4 >Edit Profile</h4>
                            <p >Complete your profile</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <TextField
                                        name="name"
                                        label="Name"
                                        id="outlined-start-adornment"
                                        onChange={this.handleChange}
                                        value={this.name}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField
                                        name="description"
                                        label="Description"
                                        id="description"
                                        onChange={this.handleChange}
                                        defaultValue={this.description}
                                    />
                                </GridItem>
                            </GridContainer>
                            <div><br/> </div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <Input
                                        name="price"
                                        label="Price"
                                        id="price"
                                        onChange={this.handleChange}
                                        defaultValue={this.price}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                    <TextField
                                        name="includedSides"
                                        label="Included Sides"
                                        id="included-sides"
                                        onChange={this.handleChange}
                                        defaultValue={this.includedSides}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="success" onClick={this.addItemsClicked}>Add Item</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        )
    }
}

export default AddMaterialForm