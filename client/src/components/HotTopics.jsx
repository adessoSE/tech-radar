import React from "react";
import commentService from "../services/commentService";
import javaJSON from '../components/java-radar.json';
import jsJSON from "./javascript-radar.json";
import msJSON from "./microsoft-radar.json";
import "../static/css/hotTopicsStyles.scss";
import Icon from "@material-ui/core/Icon";

export default class HotTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 4,
      commentsAllSorted: new Array({}),
      commentsWithinXDays: new Array({}),
      meinungArr: ["Nach Evaluieren verschieben!",
        "Nach Überdenken verschieben!",
        "Nach Einsetzen verschieben!",
        "In Einsetzen belassen!",
        "In Evaluieren belassen!",
        "In Überdenken belassen!"],
      technologies: new Array(({})),
      trending: new Array(({})),
      latest: new Array(({})),
    };
    this.getTotalCommentCountPerTechnology = this.getTotalCommentCountPerTechnology.bind(this);
    this.getAllTechnologies = this.getAllTechnologies.bind(this);
    this.withinTheLastXDays = this.withinTheLastXDays.bind(this);
    this.getTop5TrendingDiscussions = this.getTop5TrendingDiscussions.bind(this);
    this.getRingForTechnology = this.getRingForTechnology.bind(this);
    this.getTeilnehmer = this.getTeilnehmer.bind(this);
    this.getCount = this.getCount.bind(this);
    this.getLatestComment = this.getLatestComment.bind(this);
    this.shortenText = this.shortenText.bind(this);
    this.getAllComments = async () => {
      const data = await commentService.getByRadarType();
      const commentsAllSorted = [];
      const commentsWithinXDays = [];
      data.sort(function compare(a, b) {
        var partsA = a.zeit.split(', ');
        var datesA = partsA[0].split('/');
        var timeA = partsA[1].split(':');
        var dateA = new Date('20' + datesA[2], datesA[1], datesA[0], timeA[0], timeA[1], timeA[2]);

        var partsB = b.zeit.split(', ');
        var datesB = partsB[0].split('/');
        var timeB = partsB[1].split(':');
        var dateB = new Date('20' + datesB[2], datesB[1], datesB[0], timeB[0], timeB[1], timeB[2]);

        return dateB - dateA;
      });

      data.map(item => {
        commentsAllSorted.push({
          autor: item.autor,
          text: item.text,
          meinung: this.state.meinungArr[item.meinung - 1],
          zeit: item.zeit,
          technologie: item.technologie,
          radar: item.radar
        })
      });

      data.filter(item => {
        return this.withinTheLastXDays(item.zeit, 56); // 56 Tage = 2 Monate
      })
      .map(item => {
        commentsWithinXDays.push({
          autor: item.autor,
          text: item.text,
          meinung: this.state.meinungArr[item.meinung - 1],
          zeit: item.zeit,
          technologie: item.technologie,
          radar: item.radar
        })
      });
      this.setState({
        commentsWithinXDays: commentsWithinXDays,
        commentsAllSorted: commentsAllSorted
      });
    };
    this.getAllComments().then(()=>{
      this.getAllTechnologies();
    }).then(()=>{
      this.getTop5TrendingDiscussions();
    }).then(()=>{
      this.getTop5LatestDiscussions();
    });
  }

  withinTheLastXDays(zeit, xDays) {
    var parts = zeit.split(', ');
    var dates = parts[0].split('/');
    var time = parts[1].split(':');
    var date = new Date('20' + dates[2], (dates[1]-1), dates[0], time[0], time[1], time[2]);
    var xDaysAgo = new Date();
    xDaysAgo.setDate(xDaysAgo.getDate() - xDays);
    return(date - xDaysAgo >= 0);
  }

  getCount(item, value) {
    var commentsOneCommentPerUser = this.getTeilnehmer(this.state.commentsAllSorted, item.technologie, item.radar);
    var countValue = commentsOneCommentPerUser.filter(comment => {
      return comment.meinung === this.state.meinungArr[value - 1];
    }).length > 0 ? commentsOneCommentPerUser.filter(comment => {
      return comment.meinung === this.state.meinungArr[value - 1];
    }).length : 0;
    return countValue;
  }

  getTeilnehmer(com, tech, radar) {
    var comments = com.filter(comment => {
      return comment.technologie === tech &&
          comment.radar === radar
    });
    var commentsOneCommentPerUser = [];
    comments.forEach(comment => {
      if((commentsOneCommentPerUser.findIndex(element => element.autor === comment.autor))===-1){
        var commentsWithSameName = comments.filter(item => {
          return item.autor === comment.autor;
        });
        commentsWithSameName.sort((a, b) => {
          var partsA = a.zeit.split(', ');
          var datesA = partsA[0].split('/');
          var timeA = partsA[1].split(':');
          var dateA = new Date('20' + datesA[2], datesA[1], datesA[0], timeA[0], timeA[1], timeA[2]);

          var partsB = b.zeit.split(', ');
          var datesB = partsB[0].split('/');
          var timeB = partsB[1].split(':');
          var dateB = new Date('20' + datesB[2], datesB[1], datesB[0], timeB[0], timeB[1], timeB[2]);

          return dateB - dateA;
        });
        commentsOneCommentPerUser.push(commentsWithSameName[0]);
      }
    });
    return commentsOneCommentPerUser;
  }

  getAllTechnologies() {
    const techs = [];
    for (var i = 0; i < javaJSON.length; i++) {
      techs.push({
        technologie: javaJSON[i].name,
        kommentaranzahl: this.getTotalCommentCountPerTechnology(javaJSON[i].name, "java", this.state.commentsWithinXDays),
        gesamtkommentaranzahl: this.getTotalCommentCountPerTechnology(javaJSON[i].name, "java", this.state.commentsAllSorted),
        radar: "java",
        radarAnzeigen: "Java",
        ring: javaJSON[i].ring,
        ringAnzeigen: javaJSON[i].ring.charAt(0).toUpperCase() + javaJSON[i].ring.slice(1),
        teilnehmer: this.getTeilnehmer(this.state.commentsAllSorted, javaJSON[i].name, "java").length,
      });
    }
    for (var j = 0; j < jsJSON.length; j++) {
      techs.push({
        technologie: jsJSON[j].name,
        kommentaranzahl: this.getTotalCommentCountPerTechnology(jsJSON[j].name, "javascript", this.state.commentsWithinXDays),
        gesamtkommentaranzahl: this.getTotalCommentCountPerTechnology(jsJSON[j].name, "javascript", this.state.commentsAllSorted),
        radar: "javascript",
        radarAnzeigen: "Javascript",
        ring: jsJSON[j].ring,
        ringAnzeigen: jsJSON[j].ring.charAt(0).toUpperCase() + jsJSON[j].ring.slice(1),
        teilnehmer: this.getTeilnehmer(this.state.commentsAllSorted, jsJSON[j].name, "javascript").length,
      });
    }
    for (var k = 0; k < msJSON.length; k++) {
      techs.push({
        technologie: msJSON[k].name,
        kommentaranzahl: this.getTotalCommentCountPerTechnology(msJSON[k].name, "microsoft", this.state.commentsWithinXDays),
        gesamtkommentaranzahl: this.getTotalCommentCountPerTechnology(msJSON[k].name, "microsoft", this.state.commentsAllSorted),
        radar: "microsoft",
        radarAnzeigen: "Microsoft",
        ring: msJSON[k].ring,
        ringAnzeigen: msJSON[k].ring.charAt(0).toUpperCase() + msJSON[k].ring.slice(1),
        teilnehmer: this.getTeilnehmer(this.state.commentsAllSorted, msJSON[k].name, "microsoft").length
      });
    }
    this.setState({
      technologies: techs
    });
  }

  getTotalCommentCountPerTechnology(technologie, radar, comments) {
    return comments.filter(comment => {
      return comment.technologie === technologie &&
          comment.radar === radar
    }).length;
  }

  getTop5TrendingDiscussions() {
    var trending = this.state.technologies;
    trending = trending.sort(function compare(a, b) {
      return b.kommentaranzahl - a.kommentaranzahl
    }).slice(0,5);
    this.setState({
      trending: trending
    });
  }

  getRingForTechnology(technologie, radar) {
    var json;
    if(radar === "java") {
      json = javaJSON
    }
    else if(radar === "javascript") {
      json = jsJSON;
    }
    else {
      json = msJSON;
    }
    for (var i = 0; i < json.length; i++) {
      if(json[i].name === technologie) {
        return json[i].ring;
      }
    }
  }

  getLatestComment(tech, radar) {
    var comments = this.state.commentsAllSorted.filter(comment => {
      return comment.technologie === tech &&
          comment.radar === radar
    });
    return comments[0]
  }

  getTop5LatestDiscussions() {
    const discussedTechs = [];
    const latest = [];
    for (var l = 0; l < this.state.commentsAllSorted.length; l++) {
      const name = this.state.commentsAllSorted[l].technologie;
      const radar = this.state.commentsAllSorted[l].radar;
      if(!discussedTechs.includes(name) && discussedTechs.length < 5) {
        discussedTechs.push(name);
        latest.push({
          technologie: name,
          gesamtkommentaranzahl: this.getTotalCommentCountPerTechnology(name, radar, this.state.commentsAllSorted),
          radar: radar.charAt(0).toUpperCase() + radar.slice(1),
          ring: this.getRingForTechnology(name, radar).charAt(0).toUpperCase() + this.getRingForTechnology(name, radar).slice(1),
          lastComment: this.getLatestComment(name, radar),
          lastCommentAutor: this.getLatestComment(name, radar).autor,
          lastCommentText: this.shortenText(this.getLatestComment(name, radar).text),
          lastCommentMeinung: this.getLatestComment(name, radar).meinung,
          lastCommentTime: this.getLatestComment(name, radar).zeit
        });
      }
    }
    this.setState(({
      latest: latest
    }));
  }

  shortenText(text) {
    if (text.length > 150) {
      text = text.slice(0,150);
    }
    return '"' + text + ' ..."';
  }

  getStyle(item, value) {
          var countValue = this.getCount(item, value);
          var count = this.getTeilnehmer(this.state.commentsAllSorted, item.technologie, item.radar).length;
          var width = (countValue * 100 / count) + '%';
          return {
              width: width
          };
      }

      getBalken(item) {
          let balken = <div className="balken"></div>;
          if (item.ring === "einsetzen" && (!(this.getCount(item, 4) === 0 && this.getCount(item, 1) === 0 && this.getCount(item,2) === 0))) {
              balken = (<div className="balken">

                  <div className="innen tooltip" style={this.getStyle(item,4)}>{this.getCount(item,4)}<span
                      className="tooltiptext">Einsetzen</span></div>

                  <div className="mitte tooltip" style={this.getStyle(item,1)}>{this.getCount(item,1)}<span
                      className="tooltiptext">Evaluieren</span></div>

                  <div className="aussen tooltip" style={this.getStyle(item,2)}>{this.getCount(item,2)}<span
                      className="tooltiptext">Überdenken</span></div>
              </div>);

          } else if (item.ring === "evaluieren" && (!(this.getCount(item,5) === 0 && this.getCount(item,2) === 0 && this.getCount(item,3) === 0))) {
              balken = (<div className="balken">
                  <div className="innen tooltip" style={this.getStyle(item,3)}>{this.getCount(item,3)}<span
                      className="tooltiptext">Einsetzen</span></div>
                  <div className="mitte tooltip" style={this.getStyle(item,5)}>{this.getCount(item,5)}<span
                      className="tooltiptext">Evaluieren</span></div>
                  <div className="aussen tooltip" style={this.getStyle(item,2)}>{this.getCount(item,2)}<span
                      className="tooltiptext">Überdenken</span></div>
              </div>);
          } else if (item.ring === "überdenken" && (!(this.getCount(item,6) === 0 && this.getCount(item,1) === 0 && this.getCount(item,3) === 0))) {
              balken = (<div className="balken">
                  <div className="innen tooltip" style={this.getStyle(item,3)}>{this.getCount(item,3)}<span
                      className="tooltiptext">Einsetzen</span></div>
                  <div className="mitte tooltip" style={this.getStyle(item,1)}>{this.getCount(item,1)}<span
                      className="tooltiptext">Evaluieren</span></div>
                  <div className="aussen tooltip" style={this.getStyle(item,6)}>{this.getCount(item,6)}<span
                      className="tooltiptext">Überdenken</span></div>
              </div>);
          }
          return balken;
      }


  render() {
    return (
        <div className="container">
            <div className="row">
                <h3 className="column titleT">Trending</h3>
                <h3 className="column titleL">Latest</h3>
            </div>
            <div className="row">
            <div className="card cardT">
                {this.state.trending.map(item => {
                    return (<div className="cardRow">
                       <div className="box">
                          <div className="anzahl">{item.gesamtkommentaranzahl}</div>
                          <div className="icon"><Icon>forum</Icon></div>
                       </div>
                       <div className="column">
                              <div className="trending">
                                 <div className="title">{item.technologie}</div>
                                 <div>{item.ringAnzeigen} | {item.radarAnzeigen} </div>
                                 <div className="autor">Teilnehmeranzahl: {item.teilnehmer}</div>
                                  <div>{this.getBalken(item)}</div>
                              </div>

                       </div>
                    </div>)
                                })}</div>
            <div className="card cardL">
                {this.state.latest.map(item => {
                    return (<div className="cardRow">
                        <div className="timeStamp">
                        <div className="time">{item.lastCommentTime ? item.lastCommentTime.slice(0, -3).slice(item.lastCommentTime.indexOf(',')+1) : ""}</div>
                        <div className="date">{item.lastCommentTime ? item.lastCommentTime.slice(0,item.lastCommentTime.indexOf(',')).slice(0,-2).replace('/','.').replace('/','.') : ""}</div>
                        </div>
                        <div className="column">
                            <div className="infos">
                                <div className="title">{item.technologie}</div>
                                <div>{item.ring} | {item.radar} </div>
                                <div className="autor">{item.lastCommentAutor}</div>
                                <div className="meinung">{item.lastCommentMeinung}</div>
                            </div>
                            <div className="comment">{item.lastCommentText}</div>
                        </div>
                    </div>)
                })}
            </div>
            </div>
        </div>
    );
  }
}