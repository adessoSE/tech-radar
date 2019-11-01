import React from "react";
import RadarDataService from "./RadarDataService";
import FAQ from "./FAQ";


import javaJSON from './java-radar.json';
import jsJSON from './javascript-radar.json';
import msJSON from './microsoft-radar.json';



import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

import logo from "../static/img/adesso.svg";

import '../static/css/styles.scss';
import '../static/css/desctop.scss';
import '../static/css/tablet.scss';
import '../static/css/mobile.scss';


export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: 0
    };
  }

  componentDidMount = () => {
    this.initializeTab();
  };

  //Based on the url, set the state ""value", which is needed for tabs, to a specific value
  initializeTab = () => {
    if (window.location.href.indexOf("/") > -1) this.setState({ value: 0 });
    if (window.location.href.indexOf("/java") > -1) this.setState({ value: 0 });
    if (window.location.href.indexOf("/microsoft") > -1) this.setState({ value: 1 });
    if (window.location.href.indexOf("/javascript") > -1) this.setState({ value: 2 });
    if (window.location.href.indexOf("/faq") > -1) this.setState({ value: 3 });
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
            <AppBar className="tech-appbar" title="Techradar" position="static" color="default">
              
              <Tabs className="tech-tabs" centered="true" value={this.state.value} onChange={this.handleChange} textColor="primary"> 
                
                <Tab
                  className="tech-tab"
                  label={
                    <img
                      src={logo}
                      className="tech-tab-img"
                      alt="adesso's company logo" /> } />
                
                <Tab
                  className="tech-tab"
                  id="javaTab"
                  label="Java"
                  component={Link}
                  to="/java"
                  value={0} />
                
                <Tab
                  className="tech-tab"
                  id="microTab"
                  label="Microsoft"
                  component={Link}
                  to="/microsoft"
                  value={1} />
                
                <Tab
                  className="tech-tab"
                  id="jsTab"
                  label="JavaScript"
                  component={Link}
                  to="/javascript"
                  value={2} />
                
                <Tab
                  className="tech-tab"
                  id="faq"
                  label="FAQ"
                  component={Link}
                  to="/faq"
                  value={3} />
              </Tabs>
            </AppBar>
            </div>

          <Switch>
            <Route exact path="/" component = {() => (<RadarDataService data={javaJSON}/>)} />
            <Route path="/java" component={() => (<RadarDataService data={javaJSON}/>)} />
            <Route path="/microsoft" component={() => (<RadarDataService data={msJSON}/>)} />
            <Route path="/javascript" component={() => (<RadarDataService data={jsJSON}/>)} />
            <Route path="/faq" component={FAQ} />
          </Switch>

        </Router>
        
    );
  }
}


