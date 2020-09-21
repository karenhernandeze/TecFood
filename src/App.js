import React, { Component } from 'react';
import Admin from "./layouts/Admin";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Admin} />
                    {/*<Redirect from="/" to="/orders/" />*/}
                </Switch>git
            </Router>
        )
    }
}
export default App