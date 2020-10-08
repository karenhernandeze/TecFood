import React, { Component } from 'react'
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Button from "../../building_blocks/CustomButtons/Button.js";
import Card from "../../building_blocks/Card/Card.js";
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardBody from "../../building_blocks/Card/CardBody.js";
import CardFooter from "../../building_blocks/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ManageDeliveryService from "../../service/ManageDeliveryService";
import Danger from "../../building_blocks/Typography/Danger";
import ErrorIcon from '@material-ui/icons/Error';
class DeliveryOnLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {
                _id: '',
                customerName: '',
                restaurantId:'',
                customerId:'',
                orderDescription:'',
                orderNumber:'',
                orderStatus:'',
                amount: '',
                paidOnCheckout: true
            },
            open:false,
            id: '',
            existence: false
        }
        this.searchOrderById = this.searchOrderById.bind(this)
    }

    //CALL SERVICE TO GET THE INFORMATION OF AND ORDER BY ID
    searchOrderById(id) {
        ManageDeliveryService.retrieveOrderById(id) //GET ORDER
            .then(
                response => {
                    console.log(response)
                    console.log(response.data)
                    this.setState({ order: response.data }) //SET STATE\
                    console.log("NEW STATE")
                    console.log(this.state.order)
                    {
                        this.state.order.map(
                            o => {
                                console.log(o)
                                this.setState({
                                    order:{
                                        _id: o._id,
                                        customerName: o.customerName,
                                        restaurantId: o.restaurantId,
                                        customerId: o.customerId,
                                        orderDescription: o.orderDescription,
                                        orderNumber: o.orderNumber,
                                        orderStatus: o.orderStatus,
                                        amount: o.amount,
                                        paidOnCheckout: o.paidOnCheckout
                                    },
                                    existence: true,
                                    open: true
                                })
                                console.log("NEW STATE NOW")
                                console.log(this.state)
                            }
                        )
                    }
                }
            )
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    open: true,
                    existence: false
                });
            });
    }

    //SAVE DATA BEING CHANGED IN THE INPUT
    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    //SET STATE OF DIALOG TO FALSE AND CLOSE IT
    handleClose = event => {
        this.setState({
            ...this.state,
            open: false
        });
    };

    //SET ORDER AS MISSED
    setOrderAsMissed (id){
        ManageDeliveryService.setOrderAsMissed(id).then(
            response => {
                console.log(response)
            }
        )
        this.setState({
            ...this.state,
            open: false
        });
    }

    //SET ORDER AS DELIVERED
    setOrderAsDelivered(id){
        ManageDeliveryService.setOrderAsDelivered(id).then(
            response => {
                console.log(response)
            }
        )
        // this.setState( {
        //     paidOnCheckout: true
        // });
        // this.setState(prevState => ({
        //     ...this.state,
        //     open: !prevState.open,
        //     order: {
        //         _id: id,
        //         customerName: this.state.customerName,
        //         restaurantId: this.state.restaurantId,
        //         customerId: this.state.customerId,
        //         orderDescription: this.state.orderDescription,
        //         orderNumber: this.state.orderNumber,
        //         orderStatus: this.state.orderStatus,
        //         amount: this.state.amount,
        //         paidOnCheckout: true
        //     }
        // }));
    }


    render() {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="info">
                            <h4 >FIND ORDER</h4>
                            <p >Enter Order ID</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth="75px"
                                        color="success"
                                        name="id"
                                        label="Order Number"
                                        id="outlined-start-adornment"
                                        onChange={this.handleChange}
                                        value={this.name}
                                    />
                                </GridItem>
                            </GridContainer>
                            <div><br/> </div>
                        </CardBody>
                        <CardFooter>
                            <Button color="info" onClick={() => this.searchOrderById(this.state.id)}>Search</Button>
                        </CardFooter>
                    </Card>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        // aria-labelledby={this.state.order._id}
                    >
                        <DialogTitle>
                            Order Information:
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>

                                {/*DISCOMMENT THIS WHEN BE IS FIXED AND EXCEPTIONS ARE APPLIED*/}
                                {this.state.existence === false ?
                                    <Danger>
                                        <ErrorIcon/>
                                        <strong >This Order Does Not Exists </strong>
                                    </Danger>
                                    :
                                    (<>
                                        {/*{<Success>*/}
                                        <strong>Customer Name: </strong> {this.state.order.customerName}
                                        {/*</Success>}*/}
                                        <br/><br/>
                                        <strong>ORDER ID: </strong> {this.state.order._id}
                                        <br/><br/>
                                        <strong>Order Number: </strong>{this.state.order.orderNumber}
                                        <br/><br/>
                                        <strong>Description: </strong> {this.state.order.orderDescription}
                                        <br/><br/>
                                        <strong>Restaurant Id: </strong>
                                        {this.state.order.restaurantId}
                                        <br/><br/>
                                        <strong>Order Status: </strong>
                                        {this.state.order.orderStatus}
                                        <br/><br/>
                                        <strong>Amount: $</strong>
                                        {this.state.order.amount}
                                        <br/><br/>
                                        {
                                            this.state.order.paidOnCheckout === false ?
                                                <Danger>
                                                    <strong >NOT PAID, RECEIVE PAYMENT </strong>
                                                </Danger>:
                                                <strong> PAID </strong>
                                        }
                                    </>)
                                }
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {
                                this.state.order.orderStatus === "Ready" ? (
                                    <>
                                        <Button onClick={() => {this.setOrderAsMissed(this.state.order._id)}} color="danger">
                                            Missed
                                        </Button>
                                        <Button onClick={ () => {this.setOrderAsDelivered(this.state.order._id)}} color="success" autoFocus>
                                            Delivered
                                        </Button>
                                    </>) : this.state.order.orderStatus === "Missed" ?
                                    (<Button onClick={ () => {this.setOrderAsDelivered(this.state.order._id)}} color="success" autoFocus>
                                        Delivered
                                    </Button>) : this.state.order.orderStatus === "Delivered" ? (
                                        <Button onClick={ () => {this.setOrderAsMissed(this.state.order._id)}} color="danger" autoFocus>
                                            Missed
                                        </Button>
                                    ) : null
                            }
                        </DialogActions>
                    </Dialog>
                </GridItem>
            </GridContainer>
        )
    }
}

export default DeliveryOnLocation