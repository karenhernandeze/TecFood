import React, { Component } from 'react';
import Admin from "./layouts/Admin";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import AdminItems from "./layouts/AdminItems";
import "./assets/css/material-dashboard-react.css"
import CreateItemForm from "./components/CreateItemForm/CreateItemForm";
import EditItemForm from "./components/EditItemForm/EditItemForm";
import AdminRestaurants from "./layouts/AdminRestaurants";
import AdminDeliveryOnLocation from "./layouts/AdminDeliveryOnLocation";
import CreateRestaurantForm from "./components/CreateRestaurantForm/CreateRestaurantForm";
import EditRestaurantForm from "./components/EditRestaurantForm/EditRestaurantForm";
import AdminMain from "./layouts/AdminMain";
import AdminEditMain from "./layouts/AdminEditMain";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/orders" exact component={Admin} />
                    <Route path="/orders/:id" exact component={Admin} />
                    <Route path="/items/:id" exact component={AdminItems} />
                    {/*<Route path="/items/" exact component={AdminItems} />*/}
                    <Route path="/item" exact component={CreateItemForm}/>
                    <Route path="/item/:id" exact component={EditItemForm}/>
                    <Route path="/restaurants" exact component={AdminRestaurants} />
                    <Route path="/restaurant" exact component={CreateRestaurantForm} />
                    <Route path="/restaurant/:id" exact component={EditRestaurantForm} />
                    <Route path="/order/dol" exact component={AdminDeliveryOnLocation} />
                    <Route path="/:id/main" exact component={AdminMain} />
                    <Route path="/:id/main/e/" exact component={AdminEditMain} />
                </Switch>
            </Router>
        )
    }
}
export default App