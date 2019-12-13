import React, {createRef} from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Tooltip
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import commentService from "../services/commentService";
import writeCommentService from "../services/writeCommentService";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import userService from "../services/userService";

class BlipDetailSheetComponent extends React.Component {
    wrapperRef = createRef();

    constructor(props) {
        super(props);
        this.state = {
            comments: new Array({}),
            newCommentAutor: "Jenny",
            newCommentText: "",
            newMeinung: "",
            showDiscussion: false,
            valid: false,
            clicked: false,
            meinungArr: ["Nach Evaluieren verschieben!",
                "Nach Überdenken verschieben!",
                "Nach Einsetzen verschieben!",
                "In Einsetzen belassen!",
                "In Evaluieren belassen!",
                "In Überdenken belassen!"],
            test: new Array({})
        };
        this.addNewComment = this.addNewComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewMeinung = this.handleNewMeinung.bind(this);
        this.showDiscussion = this.showDiscussion.bind(this);
        this.getDropdownStatus = this.getDropdownStatus.bind(this);
        this.getBalken = this.getBalken.bind(this);
        this.getCount = this.getCount.bind(this);
        this.getTotalCount = this.getTotalCount.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.getCommentsAll = async () => {
            const data = await commentService.getByRadarType();
            const comments = [];
            data.map(item => {
                comments.push({
                    autor: item.autor,
                    text: item.text,
                    meinung: this.state.meinungArr[item.meinung - 1],
                    zeit: item.zeit,
                    technologie: item.technologie,
                    radar: item.radar
                })
            });
            this.setState({
                comments: comments
            });
        };
        this.getCommentsAll();
        // TODO delete this debugging implementation or replace with actual useful implementation
        this.test = async () => {
            const datatest = await userService.getUserInfo("max.mustermann@gmail.com", "Adesso-Projekt-2k19");
            const test = [];
            datatest.map(item => {
                test.push({
                    email: item.email,
                    passwort: item.passwort,
                    rolle: item.rolle,
                    name: item.name
                })
            });
            console.log(datatest);
            console.log(test);
            this.setState({
                test: test
            });
        };
        this.test();
    }

    addNewComment() {
        this.setState({clicked: true});
        if (this.state.newMeinung === "" || this.state.newCommentText == "") {
            this.setState({valid: false});
        } else {
            this.setState({valid: true});
            var datestorage = new Date();
            var time = datestorage.getDay() + "/" + datestorage.getMonth() + "/" + datestorage.getFullYear() + ", " + datestorage.getHours() + ":" + datestorage.getMinutes() + ":" + datestorage.getSeconds();
            const modifiedComments = this.state.comments;
            writeCommentService.addComment({
                autor: this.state.newCommentAutor,
                text: this.state.newCommentText,
                meinung: this.state.newMeinung,
                zeit: time,
                technologie: this.props.name,
                radar: this.props.radar,
            }).then(
            modifiedComments.push({
                autor: this.state.newCommentAutor,
                text: this.state.newCommentText,
                meinung: this.state.meinungArr[this.state.newMeinung - 1],
                zeit: time,
                technologie: this.props.name,
                radar: this.props.radar,
            }));
            this.setState({
                comments: modifiedComments,
                newCommentAutor: "Jenny", //ToDo
                newCommentText: "",
                newMeinung: ""
            });
        }
    }

    showDiscussion() {
        if (this.state.showDiscussion === true) {
            this.setState({showDiscussion: false});
        } else {
            this.setState({showDiscussion: true});
        }
    }

    handleChange(e) {
        if (e.target.value == "") {
            this.setState({valid: false})
        } else if (e.target.value != "" && this.state.newMeinung != "") {
            this.setState({valid: true})
        }
        this.setState({newCommentText: e.target.value});
    }

    handleNewMeinung(e) {
        this.setState({newMeinung: e.target.value})
        if (this.state.newMeinung == "") {
            this.setState({
                valid: false
            })
        } else if (this.state.newMeinung != "" && this.state.newCommentText != "") {
            this.setState({
                valid: true
            })
            console.log(e.target.value)
        }
    }

    // Dropdown wird erstellt mit Optionen angepasst an die Position der Technologie im Ring
    getDropdownStatus() {
        let dropdown = null;
        if (this.props.ring === "einsetzen") {
            dropdown = (<div><FormControl>
                <InputLabel id="demo-customized-select-label">Wähle...</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={this.state.newMeinung}
                    onChange={this.handleNewMeinung}
                    className="meinungDropdown"
                >
                    <MenuItem value={4}>In Einsetzen belassen!</MenuItem>
                    <MenuItem value={1}>Nach Evaluieren verschieben!</MenuItem>
                    <MenuItem value={2}>Nach Überdenken verschieben!</MenuItem>
                </Select>
            </FormControl></div>);
        } else if (this.props.ring === "evaluieren") {
            dropdown = (<div><FormControl>
                <InputLabel id="demo-customized-select-label">Wähle...</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={this.state.newMeinung}
                    onChange={this.handleNewMeinung}
                    className="meinungDropdown"
                >
                    <MenuItem value={5}>In Evaluieren belassen!</MenuItem>
                    <MenuItem value={2}>Nach Überdenken verschieben!</MenuItem>
                    <MenuItem value={3}>Nach Einsetzen verschieben!</MenuItem>
                </Select>
            </FormControl></div>);
        } else if (this.props.ring === "überdenken") {
            dropdown = (<div><FormControl>
                <InputLabel id="demo-customized-select-label">Wähle...</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={this.state.newMeinung}
                    onChange={this.handleNewMeinung}
                    className="meinungDropdown"
                >
                    <MenuItem value={6}>In Überdenken belassen!</MenuItem>
                    <MenuItem value={1}>Nach Evaluieren verschieben!</MenuItem>
                    <MenuItem value={3}>Nach Einsetzen verschieben!</MenuItem>
                </Select>
            </FormControl></div>);
        }
        return dropdown;
    }

    getCount(value) {
        var countValue = this.state.comments.filter(comment => {
            return comment.technologie === this.props.name &&
                comment.radar === this.props.radar &&
                comment.meinung === this.state.meinungArr[value - 1]
        }).length;
        return countValue;
    }

    getTotalCount() {
        return this.state.comments.filter(comment => {
            return comment.technologie === this.props.name &&
                comment.radar === this.props.radar
        }).length;
    }

    getStyle(value) {
        var countValue = this.getCount(value);
        var count = this.getTotalCount();
        var width = (countValue * 100 / count) + '%';
        var style = {
            width: width
        };
        return style;
    }

    getBalken() {
        let balken = <div className="balken"></div>;
        if (this.props.ring === "einsetzen" && (!(this.getCount(4) === 0 && this.getCount(1) === 0 && this.getCount(2) === 0)) && this.getTotalCount() >= 5) {
            balken = (<div className="balken">
                <div className="innen tooltip" style={this.getStyle(4)}>{this.getCount(4)}<span
                    className="tooltiptext">In Einsetzen belassen</span></div>
                <div className="mitte tooltip" style={this.getStyle(1)}>{this.getCount(1)}<span
                    className="tooltiptext">Nach Evaluieren verschieben</span>
                </div>
                <div className="außen tooltip" style={this.getStyle(2)}>{this.getCount(2)}<span
                    className="tooltiptext">Nach Überdenken verschieben</span>
                </div>
            </div>);

        } else if (this.props.ring === "evaluieren" && (!(this.getCount(5) === 0 && this.getCount(2) === 0 && this.getCount(3) === 0)) && this.getTotalCount() >= 5) {
            balken = (<div className="balken">
                <div className="innen tooltip" style={this.getStyle(5)}>{this.getCount(5)}<span
                    className="tooltiptext">In Evaluieren belassen</span></div>
                <div className="mitte tooltip" style={this.getStyle(2)}>{this.getCount(2)}<span
                    className="tooltiptext">Nach Überdenken verschieben</span></div>
                <div className="außen tooltip" style={this.getStyle(3)}>{this.getCount(3)}<span
                    className="tooltiptext">Nach Einsetzen verschieben</span></div>
            </div>);
        } else if (this.props.ring === "überdenken" && (!(this.getCount(6) === 0 && this.getCount(1) === 0 && this.getCount(3) === 0)) && this.getTotalCount() >= 5) {
            balken = (<div className="balken">
                <div className="innen tooltip" style={this.getStyle(6)}>{this.getCount(6)}<span
                    className="tooltiptext">In Überdenken belassen</span></div>
                <div className="mitte tooltip" style={this.getStyle(1)}>{this.getCount(1)}<span
                    className="tooltiptext">Nach Evaluieren verschieben</span></div>
                <div className="außen tooltip" style={this.getStyle(3)}>{this.getCount(3)}<span
                    className="tooltiptext">Nach Einsetzen verschieben</span></div>
            </div>);
        }
        return balken;
    }

    render() {
        var commentListItems = this.state.comments
            .filter(comment => {
                return comment.technologie === this.props.name &&
                    comment.radar === this.props.radar
            })
            .sort(function compare(a, b) {
                var partsA = a.zeit.split(', ');
                var datesA = partsA[0].split('/');
                var timeA = partsA[1].split(':');
                var dateA = new Date('20' + datesA[2], datesA[1], datesA[0], timeA[0], timeA[1], timeA[2]);

                var partsB = b.zeit.split(', ');
                var datesB = partsB[0].split('/');
                var timeB = partsB[1].split(':');
                var dateB = new Date('20' + datesB[2], datesB[1], datesB[0], timeB[0], timeB[1], timeB[2]);

                return dateA - dateB;
            })
            .map(function (item) {
                let meinung = (item.meinung === "Nach Einsetzen verschieben!" || item.meinung === "In Einsetzen belassen!") ?
                    <div className="meinung innen">{item.meinung}</div> :
                    (item.meinung === "Nach Evaluieren verschieben!" || item.meinung === "In Evaluieren belassen!") ?
                        <div className="meinung mitte">{item.meinung}</div> :
                        (item.meinung === "Nach Überdenken verschieben!" || item.meinung === "In Evaluieren belassen!") ?
                            <div className="meinung außen">{item.meinung}</div> : ""
                return (<div className="discussionItem mitte">

                        <div className="discussionContainer">
                            <div className="name"><p>{item.autor}</p><p><span className="timestamp">{item.zeit}</span></p></div>
                            <div><p>{item.text}</p><p>{meinung}</p></div>
                        </div>
                        <div className="discussionContainer">
                            <div></div>
                            <div>

                            </div>
                        </div>
                    </div>
                );
            });
        let error;
        if (this.state.valid == false && this.state.clicked == true) {
            error = (<div>Bitte alle Felder ausfüllen.</div>);
        } else {
            error = ""
        }
        ;
        let discussion;
        let discussionButton;
        if (this.state.showDiscussion === true) {
            discussion = (<div>
                <div>{commentListItems}</div>
                <div>{error}</div>
                <hr/>
                <h4>Beteilige Dich an der Diskussion</h4>
                <div className="discussionContainer">

                    <span>Möchtest Du, dass diese Technologie innerhalb des Radars verschoben wird?
                        {this.getDropdownStatus()}</span>
                    <span><textarea type="text" value={this.state.newCommentText} maxLength="500"
                                    onChange={this.handleChange} className="inputText"
                                    placeholder="Hinterlasse Deinen Kommentar hier..."/>
                    <Button size="large" color="primary" onClick={this.addNewComment} className="sendButton">
                        Senden
                    </Button></span>
                </div>
            </div>);
            discussionButton = (
                <Button className="diskussionButton" size="large" color="primary" onClick={this.showDiscussion}>
                    Einklappen <Icon>expand_less</Icon>
                </Button>)
        } else {
            discussion = null;
            discussionButton = (
                <Button className="diskussionButton" size="large" color="primary" onClick={this.showDiscussion}>
                    Diskussion anzeigen <Icon>expand_more</Icon>
                </Button>)
        }

        // useOutsideAlerter(wrapperRef);
        return (
            <div ref={this.wrapperRef} id="blip-detail-sheet">
                <Card className="dialog blip-detail-sheet ">
                    <CardActions>
                        <div id="blip-close-mobile" className="blip-close-button-mobile">
                            {this.props.element}
                        </div>
                    </CardActions>
                    <CardMedia title={this.props.name} className="cardBody"></CardMedia>
                    <CardContent>
                        <div className="blip-header">
                            <h2>{this.props.name}</h2>
                            <Button size="large" color="primary">
                                <Tooltip title="Merge 'n Commit!">
                                    <Icon>favorite</Icon>
                                </Tooltip>
                            </Button>
                            <h3>{this.props.ring} | {this.props.radar}</h3>
                        </div>

                        <div className="desc">{this.props.desc}</div>
                        {this.getBalken()}
                        {discussionButton}

                        {discussion}

                    </CardContent>
                </Card>
            </div>
        );
    }
}


export default BlipDetailSheetComponent;