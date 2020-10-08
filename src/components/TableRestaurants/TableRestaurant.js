import React, {Component} from "react";
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Table from "../../building_blocks/Table/Table.js";
import Card from "../../building_blocks/Card/Card"
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardBody from "../../building_blocks/Card/CardBody.js";
import ManageItemsService from "../../service/ManageItemsService";
import "./TableRestaurant-style.css"
import Button from "../../building_blocks/CustomButtons/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from 'react-router-dom';
import ManageRestaurantService from "../../service/ManageRestaurantService";

class TableRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            restaurant: {
                _id:'',
                name: '',
                rfc:'',
                location:'',
                availability:'',
                restManagerName:'',
                restManagerEmail:'',
                restManagerPassword: '',
                restManagerPhone: ''
            },
            checked: false
        }
        this.addNewRestaurant = this.addNewRestaurant.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.refreshRestaurants();
    }

    refreshRestaurants() {
        ManageRestaurantService.retrieveAllRestaurants()
            .then(
                response => {
                    this.setState({ restaurants: response.data })
                    console.log(response.data)
                    this.setState( restaurant =>
                    {
                        if (restaurant.availability == true){
                            this.setState({checked: true})
                        } else if (restaurant.availability == false) {
                            this.setState({checked: false})
                        }
                    })
                }
            )
    }

    addNewRestaurant() {
        this.props.history.push(`/restaurant`)
    }

    handleChange (restaurant) {
        if (restaurant.availability == true){
            ManageRestaurantService.disableAvailability(restaurant._id).then(
                response => {
                    //this.setState({checked: false})
                    console.log("enable")
                    this.refreshRestaurants()
                }
            )
        } else if (restaurant.availability == false){
            ManageRestaurantService.enableAvailability(restaurant._id).then(
                response => {
                    console.log("DISABLE")
                    this.refreshRestaurants();
                }
            )
        }
    }

    updateItem(id) {
        //console.log('update ' + id)
        this.props.history.push(`/restaurant/${id}`)
        //roseColor
    }

    render(){
        return(
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose">
                            <h4 className={"cardTitleWhite"}>RESTAURANTS DASHBOARD</h4>
                            <p className={"cardCategoryWhite"}>
                                Restaurant:
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="rose"
                                tableHead={["Name", "Location", "RFC", "Manager Name", "Manager Email", "Manager Phone", "Availability", "Edit"]}
                                tableData={
                                    this.state.restaurants.map(
                                        restaurant =>
                                            [
                                                [restaurant.name],
                                                [restaurant.location],
                                                [restaurant.rfc],
                                                [restaurant.restManagerName],
                                                [restaurant.restManagerEmail],
                                                [restaurant.restManagerPhone],
                                                [
                                                    <FormControlLabel
                                                        control={<Checkbox color={"default"} checked={restaurant.availability} onChange={ () => {this.handleChange(restaurant)}}/>}
                                                        labelPlacement="top"
                                                    />
                                                ],
                                                [<Button color={"warning"} onClick={() => this.updateItem(restaurant._id)}> Edit </Button>]
                                            ],
                                    )}
                            />
                        </CardBody>
                    </Card>
                    <Button color="rose" onClick={this.addNewRestaurant}> Add New Restaurant </Button>
                </GridItem>
            </GridContainer>
        )
    }
}

export default withRouter (TableRestaurant)
