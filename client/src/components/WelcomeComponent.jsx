import React from "react";
import RadarDataService from "./RadarDataService";

import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import AppComponent from "./AppComponent";
import "../static/css/styles.scss";
import "../static/css/desctop.scss";
import "../static/css/mobile.scss";


const WelcomeComponent = (props) => {

        return <Card>
            <CardHeader
                title= {'Herzlich Willkommen , '+localStorage.getItem('name')+'. Sie sind erfolgreich eingeloggt!'}>
            </CardHeader>
        </Card>
}

export default WelcomeComponent;