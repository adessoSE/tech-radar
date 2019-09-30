import React from "react";
import MSDataService from "./dataservices/MSDataService";
import JSDataService from "./dataservices/JSDataService";
import JavaDataService from "./dataservices/JavaDataService";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

import logo from "../static/img/adesso.svg";

const showJava = () => {
    return <JavaDataService/>;
  },
  showMS = () => {
    return <MSDataService />;
  },
  showJS = () => {
    return <JSDataService />;
  },
  FAQ = () => {
    return (
      <div className="faq-container">
        <h2>How can I participate?</h2>
        <p>
          The data for the radar is maintained{" "}
          <a
            id="gitlab"
            href="https://gitlab.com/thomas.franz/adesso-technologie-radar"
          >
            here
          </a>
          . Make our radar better for all of us based on your experience and
          expertise. Feel free to discuss, open issues, create merge requests.
        </p>
        <h2>Radar UI</h2>
        {/* <p>The source code of the UI of the radar is available <a id="scm" href="https://scm.adesso.de/scm/git/adesso/techradar">here</a>.</p> */}
        <p>
          The source code of the UI of the radar is available{" "}
          <a
            id="scm"
            href="https://bitbucket.adesso-group.com/scm/tr/react-techradar-mobile-team"
          >
            here
          </a>
          .
        </p>
      </div>
    );
  };

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: 0
    };
  }

  componentDidMount = () => {
    /* this.setState({
            isStillLoading: false
        }) */
    this.initializeTab();
  };

  /**
   * Based on the url, set the state ""value", which is needed for tabs, to a specific value
   */
  initializeTab = () => {
    if (window.location.href.indexOf("/") > -1) this.setState({ value: 0 });
    if (window.location.href.indexOf("/java") > -1) this.setState({ value: 0 });
    if (window.location.href.indexOf("/microsoft") > -1)
      this.setState({ value: 1 });
    if (window.location.href.indexOf("/javascript") > -1)
      this.setState({ value: 2 });
    if (window.location.href.indexOf("/faq") > -1) this.setState({ value: 3 });
  };

  handleChange = (event, index) => {
    this.setState({
      value: index
    });
  };

  render() {
    return (
      <div className="grid-container">
        <Router>
          <div>
            <AppBar
              centered
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
                  id="faq"
                  label="FAQ"
                  component={Link}
                  to="/faq"
                  value={3}
                />
              </Tabs>
            </AppBar>
          </div>

          <Switch>
            <Route exact path="/" component={showJava} />
            <Route path="/java" component={showJava} />
            <Route path="/microsoft" component={showMS} />
            <Route path="/javascript" component={showJS} />
            <Route path="/faq" component={FAQ} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AppComponent;
