import React, { Component } from 'react';
import Admin from "./layouts/Admin";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminItems from "./layouts/AdminItems";
import "./assets/css/material-dashboard-react.css"
import CreateItemForm from "./components/CreateItemForm/CreateItemForm";
import EditItemForm from "./components/EditItemForm/EditItemForm";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/orders" exact component={Admin} />
                    <Route path="/items" exact component={AdminItems} />
                    <Route path="/item" exact component={CreateItemForm}/>
                    <Route path="/item/:id" exact component={EditItemForm}/>
                </Switch>
            </Router>
        )
    }
}
export default App