import React from "react";
import RadarDataService from "./RadarDataService";
import FAQ from "./FAQ";
import HotTopics from "./HotTopics";

import javaJSON from "./java-radar.json";
import jsJSON from "./javascript-radar.json";
import msJSON from "./microsoft-radar.json";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar";
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';

import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";

import logo from "../static/img/adesso.svg";

import "../static/css/styles.scss";
import "../static/css/desctop.scss";
import "../static/css/mobile.scss";
import ProtectedRoute  from './ProtectedRoute';


export default class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            value: 0
        };
    }

    tabs;
    componentDidMount = () => {
        this.initializeTab();
    };

    //Based on the url, set the state ""value", which is needed for tabs, to a specific value
    initializeTab = () => {
        if (window.location.href.indexOf("/") > -1) this.setState({value: 0});
        if (window.location.href.indexOf("/java") > -1) this.setState({value: 0});
        if (window.location.href.indexOf("/microsoft") > -1)
            this.setState({value: 1});
        if (window.location.href.indexOf("/javascript") > -1)
            this.setState({value: 2});
        if (window.location.href.indexOf("/faq") > -1) this.setState({value: 3});
        if (window.location.href.indexOf("/hottopics") > -1) this.setState({value: 4});
    };

    handleChange = (event, index) => {
        this.setState({
            value: index
        });
    };


    render() {
        return (
            <Router>
                <div id="techleiste">
                    <AppBar
                        className="tech-appbar"
                        title="Techradar"
                        position="static"
                        color="default"
                    >
                        <Tabs
                            className="tech-tabs"
                            centered
                            value={this.state.value}
                            onChange={this.handleChange}
                            textColor="primary"
                        >
                            <Tab
                                className="tech-tab"
                                label={
                                    <img
                                        src={logo}
                                        className="tech-tab-img"
                                        alt="adesso's company logo"
                                    />
                                }
                                component={Link}
                                to="/java"
                                value={0}
                            />

                            <Tab
                                className="tech-tab"
                                id="javaTab"
                                label="Java"
                                component={Link}
                                to="/java"
                                value={0}
                            />

                            <Tab
                                className="tech-tab"
                                id="microTab"
                                label="Microsoft"
                                component={Link}
                                to="/microsoft"
                                value={1}
                            />

                            <Tab
                                className="tech-tab"
                                id="jsTab"
                                label="JavaScript"
                                component={Link}
                                to="/javascript"
                                value={2}
                            />

                            <Tab
                                className="tech-tab"
                                id="hottopicTab"
                                label="Hot Topics"
                                component={Link}
                                to="/hottopics"
                                value={4}
                            />

                            <Tab
                                className="tech-tab"
                                id="faq"
                                label="FAQ"
                                component={Link}
                                to="/faq"
                                value={3}
                            />
                            <Button variant="contained" id="log out">
                                Log out
                            </Button>
                        </Tabs>
                    </AppBar>
                    <Card>
                        <CardHeader
                            title= {'Herzlich Willkommen , '+localStorage.getItem('name')+'. Sie sind erfolgreich eingeloggt!'}>

                        </CardHeader>

                    </Card>
                </div>

                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => <RadarDataService data={javaJSON}/>}
                    />
                    <ProtectedRoute
                        path="/java"
                        component={() => <RadarDataService data={javaJSON}/>}
                    />
                    <ProtectedRoute
                        path="/microsoft"
                        component={() => <RadarDataService data={msJSON}/>}
                    />
                    <ProtectedRoute
                        path="/javascript"
                        component={() => <RadarDataService data={jsJSON}/>}
                    />
                    <ProtectedRoute
                        path="/hottopics"
                        component={HotTopics}
                    />
                    <ProtectedRoute path="/faq" component={FAQ}/>
                </Switch>
            </Router>
        );
    }
}
