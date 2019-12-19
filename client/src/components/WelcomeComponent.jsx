import React from "react";
import RadarDataService from "./RadarDataService";

import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';

import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";

import logo from "../static/img/adesso.svg";

import "../static/css/styles.scss";
import "../static/css/desctop.scss";
import "../static/css/mobile.scss";
import ProtectedRoute  from './ProtectedRoute';

const WelcomeComponent = (props) => {

        return <Card>
            <CardHeader
                title= {'Herzlich Willkommen , '+localStorage.getItem('name')+'. Sie sind erfolgreich eingeloggt!'}>
            </CardHeader>
        </Card>


}

export default WelcomeComponent;