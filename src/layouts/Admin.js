import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../components/Navbars/Navbar";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle"
import DashboardPage from "../views/Dashboard/Dashboard";
const useStyles = makeStyles(styles);

export default function Admin() {
    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    return (
        <div className={classes.wrapper}>
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar/>
                <div className={classes.content}>
                    <DashboardPage></DashboardPage>
                </div>
            </div>
        </div>
    );
}
