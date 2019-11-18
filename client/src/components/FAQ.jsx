import React from "react";

export default class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      value: 0
    };
  }
 

  render() {
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
  }
}