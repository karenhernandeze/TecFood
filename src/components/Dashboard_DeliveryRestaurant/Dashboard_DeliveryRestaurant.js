import React, {Component} from "react";
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
import {AirportShuttleTwoTone, ArrowDropDown} from "@material-ui/icons";
import ManageDeliveryService from "../../service/ManageDeliveryService";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "../../building_blocks/CustomButtons/Button"
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Poppers from "@material-ui/core/Popper";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Danger from "../../building_blocks/Typography/Danger";

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
                orderStatus:'',
                amount: '',
                paidOnCheckout: true
            },
            openOrders: false,
            orderState: '',
            orderStateName:'All Orders'
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.setOrderAsMissed = this.setOrderAsMissed.bind(this);
    }

    //GET ALL ORDERS
    componentDidMount() {
        console.log(this.state.order)
        this.refreshOrders();
    }

    //METHOD USED TO GET ALL ORDERS
    refreshOrders() {
        ManageDeliveryService.retrieveAllOrders()
            .then(
                response => {
                    console.log(response);
                    this.setState({ orders: response.data })
                }
            )
        console.log(this.state.orders)
    }

    //WHEN ONE CARD IS OPENED, SET STATE OF DIALOG TO TRUE AND RETRIEVE DATA FOR THAT ORDER
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
                orderStatus: order.orderStatus,
                amount: order.amount,
                paidOnCheckout: order.paidOnCheckout
            }
        }));
    };

    //SET STATE OF DIALOG TO FALSE
    handleClose = event => {
        this.setState({
            ...this.state,
            open: false,
            openOrders:false
        });
    };

    //SET ORDER AS MISSED
    setOrderAsMissed (id){
        ManageDeliveryService.setOrderAsMissed(id).then(
            response => {
                this.refreshOrders()
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
                this.refreshOrders()
            }
        )
        this.setState( {
            paidOnCheckout: true
        });
        this.setState(prevState => ({
            ...this.state,
            open: !prevState.open,
            order: {
                _id: id,
                customerName: this.state.customerName,
                restaurantId: this.state.restaurantId,
                customerId: this.state.customerId,
                orderDescription: this.state.orderDescription,
                orderNumber: this.state.orderNumber,
                orderStatus: this.state.orderStatus,
                amount: this.state.amount,
                paidOnCheckout: true
            }
        }));
    }

    //OPEN BUTTON AT RIGHT TOP
    handleClickOrders = event => {
        const { value, openOrders } = event.target;
        this.setState({
            ...this.state,
            openOrders: true
        });
    };

    //CLICK TO SEE ALL ORDERS
    handleClickAllOrders = event => {
        this.setState({
            ...this.state,
            orderState: "",
            orderStateName: "All Orders",
            openOrders: false
        });
    };

    //CLICK TO OPEN MISSED ORDERS
    handleClickMissedOrders = event => {
        this.setState({
            ...this.state,
            orderState: "Missed",
            orderStateName: "Missed Orders",
            openOrders: false
        });
    };

    //CLICK TO OPEN ORDERS READY
    handleClickOrdersReady = event => {
        this.setState({
            ...this.state,
            orderState: "Ready",
            orderStateName: "Orders Ready",
            openOrders: false
        });
    };

    //CLICK TO OPEN ORDERS DELIVERED
    handleClickDeliveredOrders = event => {
        this.setState({
            ...this.state,
            orderState: "Delivered",
            orderStateName: "Delivered Orders",
            openOrders: false
        });
    };

    //CLICK TO OPEN ORDERS IN PROCESS
    handleClickOrdersInProcess = event => {
        this.setState({
            ...this.state,
            orderState: "Pending",
            orderStateName: "Pending Orders",
            openOrders: false
        });
    };

    render() {
        const {orders} = this.state
        const filteredOrders = orders.filter(order =>
            order.orderStatus.includes(this.state.orderState)
        );

        return (
            <div>
                <div className="dialog2" >
                    <Button
                        color = {"info"}
                        variant="contained"
                        onClick={this.handleClickOrders}
                    >
                        {this.state.orderStateName}
                        <KeyboardArrowDownIcon/>
                    </Button>
                    <Poppers
                        open={this.state.openOrders}
                        anchorEl={this.state.openOrders}
                        transition
                        disablePortal
                        className="dialog3"
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList role="menu">
                                    <MenuItem
                                        class="da"
                                        onClick={this.handleClickAllOrders}
                                    >
                                        All Orders
                                    </MenuItem>
                                    <MenuItem
                                        class="da"
                                        onClick={this.handleClickMissedOrders}
                                    >
                                        Missed Orders
                                    </MenuItem>
                                    <MenuItem
                                        class="da"
                                        onClick={this.handleClickOrdersReady}
                                    >
                                        Orders Ready
                                    </MenuItem>
                                    <MenuItem
                                        class="da"
                                        onClick={this.handleClickDeliveredOrders}
                                    >
                                        Delivered Orders
                                    </MenuItem>
                                    <MenuItem
                                        class="da"
                                        onClick={this.handleClickOrdersInProcess}
                                    >
                                        Orders in Process
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Poppers>
                </div>

                <GridContainer className="dialog">
                    {

                        filteredOrders.map(
                            order =>
                                <GridItem xs={12} sm={6} md={3} key={order._id}>
                                    <Card className={"dialog"} onClick={() => this.handleClickOpen(order)}>
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
                                        </CardHeader>
                                        <CardFooter stats>
                                            <div className={"stats"}>
                                                {
                                                    order.orderStatus === "Ready" ? (<AirportShuttleTwoTone />) :
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
                </GridContainer>
            </div>
        );
    }
}

export default DashboardPage
