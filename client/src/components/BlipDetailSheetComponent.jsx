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

class BlipDetailSheetComponent extends React.Component {
    wrapperRef = createRef();

    constructor(props) {
        super(props);
        this.state = {
            comments: new Array({}),
            newCommentAutor: localStorage.getItem("name"),
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
        this.getTeilnehmer = this.getTeilnehmer.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.getTrailingZeroIfNeeded = this.getTrailingZeroIfNeeded.bind(this);
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
    }

    getTrailingZeroIfNeeded(number) {
        return number<10?'0':'';
    }

    addNewComment() {
        this.setState({clicked: true});
        if (this.state.newMeinung === "" || this.state.newCommentText == "") {
            this.setState({valid: false});
        } else {
            this.setState({valid: true});
            var datestorage = new Date();
            var month = (datestorage.getMonth() + 1);
            var date = this.getTrailingZeroIfNeeded(datestorage.getDate()) + datestorage.getDate() + "/"
                + this.getTrailingZeroIfNeeded(month) + month + "/"
                + datestorage.getFullYear().toString().slice(2,4) + ", "
                + this.getTrailingZeroIfNeeded(datestorage.getHours()) + datestorage.getHours() + ":"
                + this.getTrailingZeroIfNeeded(datestorage.getMinutes()) + datestorage.getMinutes() + ":"
                + this.getTrailingZeroIfNeeded(datestorage.getSeconds()) + datestorage.getSeconds();
            const modifiedComments = this.state.comments;
            writeCommentService.addComment({
                autor: this.state.newCommentAutor,
                text: this.state.newCommentText,
                meinung: this.state.newMeinung,
                zeit: date,
                technologie: this.props.name,
                radar: this.props.radar,
            }).then(
            modifiedComments.push({
                autor: this.state.newCommentAutor,
                text: this.state.newCommentText,
                meinung: this.state.meinungArr[this.state.newMeinung - 1],
                zeit: date,
                technologie: this.props.name,
                radar: this.props.radar,
            }));
            this.setState({
                comments: modifiedComments,
                newCommentAutor: localStorage.getItem("name"),
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
        this.setState({newMeinung: e.target.value});
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

    getTeilnehmer() {
        const comments = this.state.comments.filter(comment => {
            return comment.technologie === this.props.name &&
                comment.radar === this.props.radar
        });
        console.log("COMMENTS", comments);
        var commentsOneCommentPerUser = [];
        comments.forEach(comment => {
             if((commentsOneCommentPerUser.findIndex(element => element.autor === comment.autor))===-1){
                 var commentsWithSameName = comments.filter(item => {
                     return item.autor === comment.autor;
                 });
                 commentsWithSameName.sort((a, b) => {
                     return new Date(b.zeit) - new Date(a.zeit);
                 });
                 commentsOneCommentPerUser.push(commentsWithSameName[0]);
             }
        });
        console.log("RESULT", commentsOneCommentPerUser);
        return commentsOneCommentPerUser;
    }

    getCount(value) {
        var commentsOneCommentPerUser = this.getTeilnehmer();
        var countValue = commentsOneCommentPerUser.filter(comment => {
            return comment.meinung === this.state.meinungArr[value - 1];
        }).length > 0 ? commentsOneCommentPerUser.filter(comment => {
            return comment.meinung === this.state.meinungArr[value - 1];
        }).length : 0;
        console.log("Countvalue", countValue);
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
        var count = this.getTeilnehmer().length;
        var width = (countValue * 100 / count) + '%';
        console.log(count);
        return {
            width: width
        };
    }

    getBalken() {
        let balken = <div className="balken"></div>;
        if (this.props.ring === "einsetzen" && (!(this.getCount(4) === 0 && this.getCount(1) === 0 && this.getCount(2) === 0))) {
            balken = (<div className="balken">
                <div className="innen tooltip" style={this.getStyle(4)}>{this.getCount(4)}<span
                    className="tooltiptext">In Einsetzen belassen</span></div>
                <div className="mitte tooltip" style={this.getStyle(1)}>{this.getCount(1)}<span
                    className="tooltiptext">Nach Evaluieren verschieben</span>
                </div>
                <div className="aussen tooltip" style={this.getStyle(2)}>{this.getCount(2)}<span
                    className="tooltiptext">Nach Überdenken verschieben</span>
                </div>
            </div>);

        } else if (this.props.ring === "evaluieren" && (!(this.getCount(5) === 0 && this.getCount(2) === 0 && this.getCount(3) === 0))) {
            balken = (<div className="balken">
                <div className="innen tooltip" style={this.getStyle(5)}>{this.getCount(5)}<span
                    className="tooltiptext">In Evaluieren belassen</span></div>
                <div className="mitte tooltip" style={this.getStyle(2)}>{this.getCount(2)}<span
                    className="tooltiptext">Nach Überdenken verschieben</span></div>
                <div className="aussen tooltip" style={this.getStyle(3)}>{this.getCount(3)}<span
                    className="tooltiptext">Nach Einsetzen verschieben</span></div>
            </div>);
        } else if (this.props.ring === "überdenken" && (!(this.getCount(6) === 0 && this.getCount(1) === 0 && this.getCount(3) === 0))) {
            balken = (<div className="balken">
                <div className="innen tooltip" style={this.getStyle(6)}>{this.getCount(6)}<span
                    className="tooltiptext">In Überdenken belassen</span></div>
                <div className="mitte tooltip" style={this.getStyle(1)}>{this.getCount(1)}<span
                    className="tooltiptext">Nach Evaluieren verschieben</span></div>
                <div className="aussen tooltip" style={this.getStyle(3)}>{this.getCount(3)}<span
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
                        (item.meinung === "Nach Überdenken verschieben!" || item.meinung === "In Überdenken belassen!") ?
                            <div className="meinung aussen">{item.meinung}</div> : ""
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