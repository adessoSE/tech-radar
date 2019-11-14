import React, {createRef, useRef /*, useEffect */} from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tooltip
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

class BlipDetailSheetComponent extends React.Component {
  wrapperRef = createRef();


  constructor(props) {
    super(props)
    this.state = {
      comments: new Array(
          {autor: 'Petra', text: 'Coole Technologie', status: 1, zeit: {datum: "13.11.2019", uhrzeit: "12:45"}},
          {autor: 'Bernd', text: 'Groﬂartig', status: 1, zeit: {datum: "13.11.2019", uhrzeit: "12:45"}},
          {autor: 'Franz', text: 'Toll', status: 2, zeit: {datum: "13.11.2019", uhrzeit: "12:45"}},
          {autor: 'Ute', text: 'Spitze!', status: 1, zeit: {datum: "13.11.2019", uhrzeit: "12:45"}},
          {autor: 'Patricia', text: 'Klasse', status: 3, zeit: {datum: "13.11.2019", uhrzeit: "12:45"}}
      ),
      newCommentAutor: "Jenny",
      newCommentText: "",
      showDiscussion: false,
    };
    this.addNewComment = this.addNewComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showDiscussion = this.showDiscussion.bind(this);
    this.getDropdownStatus = this.getDropdownStatus.bind(this);
  }

  addNewComment() {
    const modifiedComments = this.state.comments;
    modifiedComments.push({autor: this.state.newCommentAutor, text: this.state.newCommentText});
    this.setState({
      comments: modifiedComments
    });
  }

  showDiscussion(){
    if(this.state.showDiscussion===true){
      this.setState({showDiscussion: false});
    }
    else{
      this.setState({showDiscussion: true});
    }
  }

  handleChange(e) {
    this.setState({newCommentText: e.target.value});
  }

  getDropdownStatus(){
    let dropdown = null;
    if(this.props.ring == "einsetzen"){
      dropdown = (<select>
        <option value={3}>Nach schlecht verschieben</option>
        <option value={2}>Belassen</option>
      </select>);
    }
    else if(this.props.ring == "evaluieren"){
      dropdown = (<select>
        <option value={1}>Nach gut verschieben</option>
        <option value={3}>Nach schlecht verschieben</option>
      </select>);
    }
    else if(this.props.ring == "¸berdenken"){
      dropdown = (<select>
        <option value={1}>Nach gut verschieben</option>
        <option value={2}>Belassen</option>
      </select>);
    }
    return dropdown;
  }

  render() {
    let stat =["Status1","Status2","Status3"]
    var commentListItems = this.state.comments.map(function (item) {
      return (
          <div>{item.autor} | {item.text} | {stat[item.status-1]} | {item.zeit.datum} | {item.zeit.uhrzeit} </div>
      );
    });

    let discussion;
    let buttonText;
    if(this.state.showDiscussion === true){
      discussion = (<div>
        {commentListItems}
        {this.getDropdownStatus()}
        <input type="text" value={this.state.newCommentText}
               onChange={this.handleChange}/>
        <Button size="large" color="primary" onClick={this.addNewComment}>
          Send
        </Button>
      </div>);
      buttonText = (<span>
                Collapse all
            </span>)
    }
    else {
      discussion = null;
      buttonText = (<span>
                Show Discussion
            </span>)
    }

    // useOutsideAlerter(wrapperRef);
    return (
        <div ref={this.wrapperRef} id="blip-detail-sheet">
          <Card className="blip-detail-sheet">
            <CardActions>
              <div id="blip-close-mobile" className="blip-close-button-mobile">
                {this.props.element}
              </div>
            </CardActions>
            <CardMedia title={this.props.name}></CardMedia>
            <CardContent>
              <div className="blip-header">
                <h2>{this.props.name}</h2>
                <Button size="large" color="primary">
                  <Tooltip title="Merge 'n Commit!">
                    <Icon>favorite</Icon>
                  </Tooltip>
                </Button>
              </div>
              <h3>
                {this.props.ring} | {this.props.radar}
              </h3>
              {this.props.desc}
              {/*this.props.showDiscussion &&*/}
              <Button size="large" color="primary" onClick={this.showDiscussion}>
                {buttonText}
              </Button>
              {discussion}
            </CardContent>
          </Card>
        </div>
    );
  }
}


export default BlipDetailSheetComponent;