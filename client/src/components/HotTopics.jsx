import React from "react";
import commentService from "../services/commentService";
import javaJSON from '../components/java-radar.json';
import jsJSON from "./javascript-radar.json";
import msJSON from "./microsoft-radar.json";

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
      console.log(this.state.commentsAllSorted); // TODO entfernen
      console.log(this.state.commentsWithinXDays); // TODO entfernen
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

  getAllTechnologies() {
    const techs = [];
    for (var i = 0; i < javaJSON.length; i++) {
      techs.push({
        technologie: javaJSON[i].name,
        kommentaranzahl: this.getTotalCommentCountPerTechnology(javaJSON[i].name, "java"),
        radar: "java",
        ring: javaJSON[i].ring,
        // TODO anzahl der diskussioneteilnehmer und voting/ tendenz erfassen, sobald vorhanden
      });
    }
    for (var j = 0; j < jsJSON.length; j++) {
      techs.push({
        technologie: jsJSON[j].name,
        kommentaranzahl: this.getTotalCommentCountPerTechnology(jsJSON[j].name, "javascript"),
        radar: "javascript",
        ring: jsJSON[j].ring,
        // TODO anzahl der diskussioneteilnehmer und voting/ tendenz erfassen, sobald vorhanden
      });
    }
    for (var k = 0; k < msJSON.length; k++) {
      techs.push({
        technologie: msJSON[k].name,
        kommentaranzahl: this.getTotalCommentCountPerTechnology(msJSON[k].name, "microsoft"),
        radar: "microsoft",
        ring: msJSON[k].ring,
        // TODO anzahl der diskussioneteilnehmer und voting/ tendenz erfassen, sobald vorhanden
      });
    }
    this.setState({
      technologies: techs
    });
  }

  getTotalCommentCountPerTechnology(technologie, radar) {
    return this.state.commentsWithinXDays.filter(comment => {
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
    console.log(this.state.trending); // TODO entfernen
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

  getTop5LatestDiscussions() {
    var discussedTechs = [];
    for (var l = 0; l < this.state.commentsAllSorted.length; l++) {
      var name = this.state.commentsAllSorted[l].technologie;
      var radar = this.state.commentsAllSorted[l].radar;
      if(!discussedTechs.includes(name) && discussedTechs.length < 5) {
        discussedTechs.push({
          technologie: name,
          kommentaranzahl: this.getTotalCommentCountPerTechnology(name, radar),
          radar: radar,
          ring: this.getRingForTechnology(name, radar)
          // TODO anzahl der diskussioneteilnehmer und voting/ tendenz erfassen, sobald vorhanden
        });
      }
    }
    this.setState(({
      latest: discussedTechs
    }));
    console.log(this.state.latest); // TODO entfernen
  }

  render() {
    return (
        <div >
        HotTopics
      </div>
    );
  }
}