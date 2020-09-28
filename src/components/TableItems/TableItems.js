import React, {Component} from "react";
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Table from "../../building_blocks/Table/Table.js";
import Card from "../../building_blocks/Card/Card"
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardBody from "../../building_blocks/Card/CardBody.js";
import ManageItemsService from "../../service/ManageItemsService";
import "./TableItem-style.css"
import Button from "../../building_blocks/CustomButtons/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {green} from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from 'react-router-dom';

class TableItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            item: {
                _id:'',
                availability: '',
                description:'',
                image:'',
                includedSides:'',
                name:'',
                price:'',
                restaurantId: ''
            },
            checked: false
        }
        this.addNewItem = this.addNewItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.refreshItems();
    }

    refreshItems() {
        ManageItemsService.retrieveAllItems()
            .then(
                response => {
                    this.setState({ items: response.data })
                    this.setState( item =>
                    {
                        if (item.availability == true){
                            this.setState({checked: true})
                        } else if (item.availability == false) {
                            this.setState({checked: false})
                        }
                    })
                }
            )
    }

    addNewItem() {
        console.log("THIS.PROPS")
        console.log(this.props)
        this.props.history.push(`/item`)
    }

    handleChange (item) {
        if (item.availability == true){
            ManageItemsService.disableAvailability(item._id).then(
                response => {
                    //this.setState({checked: false})
                    console.log("enable")
                    this.refreshItems()
                }
            )
        } else if (item.availability == false){
            ManageItemsService.enableAvailability(item._id).then(
                response => {
                    console.log("DISABLE")
                    this.refreshItems();
                }
            )
        }
    }

    updateItem(id) {
        //console.log('update ' + id)
        this.props.history.push(`/item/${id}`)
    }

    render(){
        return(
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="success">
                            <h4 className={"cardTitleWhite"}>ITEMS DASHBOARD</h4>
                            <p className={"cardCategoryWhite"}>
                                Restaurant: Name
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="success"
                                tableHead={["Name", "Description", "Price", "Image", "Availability", "Sides", "Edit"]}
                                tableData={
                                    this.state.items.map(
                                        item =>
                                            [
                                                [item.name],
                                                [item.description],
                                                [item.price],
                                                [item.image],
                                                [
                                                    <FormControlLabel
                                                        control={<Checkbox color={"default"} checked={item.availability} onChange={ () => {this.handleChange(item)}}/>}
                                                        labelPlacement="top"
                                                    />
                                                ],
                                                [item.includedSides + ''],
                                                [<Button color={"warning"} onClick={() => this.updateItem(item._id)}> Edit </Button>]
                                            ],
                                    )}
                            />
                        </CardBody>
                    </Card>
                    <Button color="success" onClick={this.addNewItem}> Add </Button>
                </GridItem>
            </GridContainer>
        )
    }
}

export default withRouter (TableItems)
