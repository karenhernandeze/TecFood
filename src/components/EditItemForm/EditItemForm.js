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
import Navbar from "../../building_blocks/Navbars/Navbar";
const preset = 'muvwlutm';

class EditItemForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params.id,
            name: '',
            description: '',
            price: '',
            image:'',
            availability: true,
            includedSides: '',
            restaurantId: "5f52e7ac97345cbcabcfc829"
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.refreshItems = this.refreshItems.bind(this)
    }

    componentDidMount() {
        this.refreshItems();
    }

    refreshItems() {
        console.log("REFRESH ITEMS ")
        console.log(this.state._id)
        console.log(ManageItemsService.retrieveItemById(this.state._id))
        ManageItemsService.retrieveItemById(this.state._id)
            .then(
                response=> {this.setState({
                    name: response.data.name,
                    price: response.data.price,
                    description: response.data.description,
                    includedSides: response.data.includedSides,
                    image: response.data.image
                })
                    console.log(response)
                }
            )
        console.log("STATE")
        console.log(this.state)
    }

    onSubmit = async() => {
        const linkPhoto = await this.onSubmitImage()
        console.log(linkPhoto)
        this.setState({
            ...this.state,
            image: linkPhoto
        });

        ManageItemsService.updateItem(this.state._id, this.state)
            .then(
                response => {
                    this.props.history.push(`/items`)
                    this.setState({ items: response.data })
                }
            )
    }

    //UPLOAD IMAGE CHANGE
    onChange = event => {
        this.setState({
            ...this.state,
            image: event.target.files[0]
        });
        console.log("ON CHANGE")
        console.log(event)
        console.log(event.target)
        console.log(event.target.file)
        console.log(event.target.files[1])
    };

    onSubmitImage (){
        const formData = new FormData();
        formData.append('file', this.state.image);
        formData.append('upload_preset', preset);
        const link = ManageItemsService.updloadImage(formData).then(
            response => {
                console.log(response)
                return response
            }
        )
        return link;
    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
        console.log("HAndle change")
        console.log(this.state)
    };


    render() {
        return (
            <div>
                <Navbar/>
                <div className="content">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="success">
                                    <h4 >Edit Profile</h4>
                                    <p >Complete your profile</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                name="name"
                                                label={"Name"}
                                                id="outlined-start-adornment"
                                                onChange={this.handleChange}
                                                value={this.state.name}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                name="description"
                                                label="Description"
                                                id="description"
                                                onChange={this.handleChange}
                                                value={this.state.description}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <Input
                                                fullWidth="25px"
                                                name="price"
                                                label="Price"
                                                id="price"
                                                onChange={this.handleChange}
                                                value={this.state.price}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                fullWidth="25px"
                                                name="includedSides"
                                                label="Included Sides"
                                                id="included-sides"
                                                onChange={this.handleChange}
                                                value={this.state.includedSides}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <div className='container'>
                                                <div className='file-field input-field'>
                                                    <div className='btn'>
                                                        <span> PREVIOUS IMAGE</span>
                                                        <br/>
                                                        <div>
                                                            {
                                                                ((this.state.image) == null || (this.state.image) == "") ?
                                                                    <p >none</p> :
                                                                    <img src={this.state.image}/>
                                                            }
                                                        </div>
                                                        <span>UPDATE IMAGE</span>
                                                        <br/>
                                                        <input type='file' name='image' onChange={this.onChange} accept=".png"/>
                                                    </div>
                                                </div>

                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="success" onClick={this.onSubmit}>Update</Button>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default EditItemForm