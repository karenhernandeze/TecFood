import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Done from "@material-ui/icons/Done";
import Block from "@material-ui/icons/Block";
import AccessTime from "@material-ui/icons/AccessTime";
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Card from "../../building_blocks/Card/Card.js";
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardIcon from "../../building_blocks/Card/CardIcon.js";
import CardFooter from "../../building_blocks/Card/CardFooter.js";
import "./Dashboard-style.css"
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {AirportShuttleTwoTone} from "@material-ui/icons";
import ManageDeliveryService from "../../service/ManageDeliveryService";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {Icon} from "@material-ui/core";

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            orders: [],
            order: {
                _id: '',
                customerName: '',
                restaurantId:'',
                customerId:'',
                orderDescription:'',
                orderNumber:'',
                orderStatus:''
            },
            test:''
        }
        this.useStyles = this.useStyles.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.setOrderAsMissed = this.setOrderAsMissed.bind(this);
    }

    componentDidMount() {
        this.refreshCourses();
    }

    handleClickOpen (order) {
        this.setState(prevState => ({
            open: !prevState.open,
            order: {
                _id: order._id,
                customerName: order.customerName,
                restaurantId: order.restaurantId,
                customerId: order.customerId,
                orderDescription: order.orderDescription,
                orderNumber: order.orderNumber,
                orderStatus: order.orderStatus
            }
        }));
        console.log(order)
        console.log(this.state.order._id)
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.order.customerName)
        console.log(this.state.order.restaurantId)
        console.log(this.state.order.orderDescription)
        console.log(this.state.order._id + "G: "+this.state.test)
    }

    handleClose = event => {
        const { value, open } = event.target;
        this.setState({
            ...this.state,
            open: false
        });
        console.log(this.state)
        console.log(this.state.orders)
    };

    refreshCourses() {
        ManageDeliveryService.retrieveAllOrders()
            .then(
                response => {
                    console.log(response);
                    this.setState({ orders: response.data })
                }
            )
    }

    setOrderAsMissed (id){
        ManageDeliveryService.setOrderAsMissed(id).then(
            response => {
                console.log( "MISSED" + id);
                console.log(response.data);
                this.refreshCourses()
            }
        )
        this.setState({
            ...this.state,
            open: false
        });
        console.log("OPEN: "+this.state.open)
        console.log(this.state.orders)
    }

    setOrderAsDelivered(id){
        ManageDeliveryService.setOrderAsDelivered(id).then(
            response => {
                console.log( "DELIVERED" + id);
                this.refreshCourses()
            }
        )
        this.setState({
            ...this.state,
            open: false
        });
        console.log("OPEN: "+this.state.open)
        console.log(this.state.orders)
    }

    useStyles(){
        makeStyles(styles);
    }

    render() {
        const classes = this.useStyles();
        return (
            <div>
                <GridContainer>
                    {
                        this.state.orders.map(
                            order =>
                                <GridItem xs={12} sm={6} md={3} key={order._id}>
                                    <Card onClick={() => this.handleClickOpen(order)}>
                                        <CardHeader color={
                                            order.orderStatus === "Ready" ? "warning" :
                                                order.orderStatus === "Delivered" ? "success" :
                                                    order.orderStatus === "Pending" ? "info" : "warning"
                                        } stats icon>
                                            <CardIcon color={
                                                order.orderStatus === "Ready" ? "warning" :
                                                    order.orderStatus === "Delivered" ? "success" :
                                                        order.orderStatus === "Pending" ? "info" :
                                                            order.orderStatus === "Missed" ? "danger" : null
                                            }>
                                                {
                                                    order.orderStatus === "Ready" ? <AirportShuttleTwoTone /> :
                                                        order.orderStatus === "Delivered" ? <Done/> :
                                                            order.orderStatus === "Pending" ? <AccessTime/> :
                                                                order.orderStatus === "Missed" ? <Block/> : null
                                                }
                                            </CardIcon>
                                            <p className={"cardCategory"}>{order.orderDescription}</p>
                                            <h3 className={"cardTitle"}>{order.customerName}</h3>
                                            {/*<Test></Test>*/}
                                        </CardHeader>
                                        <CardFooter stats>
                                            <div className={"stats"}>
                                                {
                                                    order.orderStatus === "Ready" ? <AirportShuttleTwoTone /> :
                                                        order.orderStatus === "Delivered" ? <Done/> :
                                                            order.orderStatus === "Pending" ? <AccessTime/> : <Block/>
                                                }
                                                {order.orderStatus}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                        )
                    }

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby={this.state.order._id}
                    >
                        <DialogTitle>
                            {this.state.order.customerName}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <strong>ORDER ID: </strong> {this.state.order._id}
                                <br/><br/>
                                <strong>Order Number: </strong>{this.state.order.orderNumber}
                                <br/><br/>
                                <strong>Description: </strong> {this.state.order.orderDescription}
                                <br/><br/>
                                <strong>Restaurante Id: </strong>
                                {this.state.order.restaurantId}
                                <br/><br/>
                                <strong>Order Status: </strong>
                                {this.state.order.orderStatus}
                                <br/><br/>
                                LATER ON WE CAN PUT MORE INFO ABOUT PAYMENT, TRANSACTION, ETC
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {this.setOrderAsMissed(this.state.order._id)}} color="primary">
                                Missed
                            </Button>
                            <Button onClick={ () => {this.setOrderAsDelivered(this.state.order._id)}} color="primary" autoFocus>
                                Delivered
                            </Button>
                        </DialogActions>
                    </Dialog>




                </GridContainer>
            </div>
        );
    }

}

export default DashboardPage