import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TableItems from "../components/TableItems/TableItems";
import Navbar from "../building_blocks/Navbars/Navbar"
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle"
const useStyles = makeStyles(styles);

export default function AdminItems() {
    const classes = useStyles();
    return (
        <div>
            <Navbar/>
            <div className={classes.content}>
                <TableItems/>
            </div>
        </div>
    );
}
