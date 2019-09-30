import React from 'react'
import BlipDetailSheetComponent from './BlipDetailSheetComponent';

import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';    
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import { Button, Icon, Slide, TextField, Container } from '@material-ui/core';
import BlipListingComponent from './BlipListingComponent';

import javaJSON from './java-radar.json'
import jsJSON from './javascript-radar.json'
import msJSON from './microsoft-radar.json'

// TODO: Used later
import OutsideClickHandler from 'react-outside-click-handler';
import AutoCompleteInput from './AutoCompleteInput';

const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "1.5em"
        }
      }
    }
}), styles = {
    tooltip: {
      color: "lightblue",
      backgroundColor: "green"
    }
}, technologies = () => {
    const list = wholeList();
    return list.map((e) => e.name)
}, wholeList = () => {
    var arr = [];
    for (let item of javaJSON) arr.push(item);
    for (let item of jsJSON) arr.push(item);
    for (let item of msJSON) arr.push(item);
    return arr;
}, RemoveButton = (props) => {
    return <Button className="closeButton" onClick={props.onClick}> 
        <Icon>
            clear
        </Icon>
    </Button>
}, textPosition = (i) => {
    if (i<10) {
        return 2;
    }
    if (i<100) {
        return 3.5;
    }
    return 5.5;
};


class RadarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resolvedData: [],
            size: 0, 
            blipRadius:0, 
            centerPointX: 0,
            centerPointY: '',
            
            alphaSteps: 0,
            qOnePathDef: 0,
            qTwoPathDef: 0,
            qThreePathDef: '',
            qFourPathDef: '',
            qOneTextX: '',

            clickedBlip: null,
            showBlipDetail: false,
            transition: false,
            value: 0,
            showBlipListing: false,
            filteredBlips: [],

            searchedTech: ''
        }
    }

    componentWillMount = () => {
        let arr = [];
        Promise.resolve(this.props.blips)
                .then(function(data){
                    arr = data;
                });
        setTimeout(() => {
            this.setState({ resolvedData: arr }); 
            this.initializeRadar();
        }, 100);
    }
    
    initializeRadar() {
		var kurvenPunkt = 35, sizeR = 500;
        this.qOneTextX = this.size/4;
        
        const halfRadius = sizeR/2;
        
        this.setState({
            size: sizeR,
            blipRadius: sizeR / 80,
            centerPointX: halfRadius,
            centerPointY: halfRadius,
            qOneTextX: halfRadius,
            qOnePathDef: "M 0 "+ (halfRadius-40)+" Q "+kurvenPunkt+" "+kurvenPunkt
                +" "+(halfRadius-40)+" 0",
            qTwoPathDef: "M "+(halfRadius+40)+" 0 Q "+(sizeR - kurvenPunkt)
                +" "+kurvenPunkt+" "+sizeR+" "+(halfRadius-40),
            qThreePathDef: "M "+(sizeR)+" "+(halfRadius+40)+" Q "
                +(sizeR - kurvenPunkt)+" "+(sizeR- kurvenPunkt)+" "+(halfRadius+40)+" "+sizeR,
            qFourPathDef: "M "+(halfRadius-40)+" "+sizeR
                +" Q "+kurvenPunkt+" "+(sizeR - kurvenPunkt)+" 0 "+(halfRadius+40)
        })
    }

    openInfoOfBox = (e) => {
        this.setState({
            clickedBlip: e,
            showBlipDetail: true
        })
    }

    removeBlip() {
        this.setState({showBlipDetail: false})
    }

    renderBlip() {
        if (this.state.showBlipDetail) {
            return <Slide in={true} direction="down" mountOnEnter unmountOnExit>
                <div className="blip-overlay">
                    <BlipDetailSheetComponent ref={(ele) => this.blipDetail = ele } {...this.state.clickedBlip} onOutside={() => this.removeBlip()} element={<RemoveButton onClick={() => {
                        this.removeBlip();
                    }} />} />
                </div>
            </Slide>      
        }
    }

    renderBlipListing() {
        if (this.state.showBlipListing) 
            return <BlipListingComponent 
                        {...this.state.filteredBlips} 
                        openInfo={this.openInfoOfBox} 
                        onClick={() => this.setState({ showBlipListing: false }) } 
                    />
    }

    handleBlipListing(value) {
        setTimeout(() => {
            var quadrantCase;

            switch(value) {
                case 0:
                    this.setState( { showBlipListing: false });
                    return;
                case 1:
                    quadrantCase = 1;
                    break;
                case 2:
                    quadrantCase = 2;
                    break;
                case 3:
                    quadrantCase = 4;
                    break;
                case 4:
                    quadrantCase = 3;
                    break;
                default:
                    break;
            }
            const filteredQuadrant = this.state.resolvedData.filter(blip => blip.quadrant === quadrantCase);

            if (filteredQuadrant.length > 0) 
                this.setState({showBlipListing: true, filteredBlips: filteredQuadrant})
            else 
                this.setState({showBlipListing: false, filteredBlips: []})
        }, 100)
    }
    
    handleChange = (event, newValue) => {
        this.setState({value: newValue})
        this.handleBlipListing(newValue);
    }

    handleSearchState = (e) => {
        this.setState( { searchedTech: e.target.value } )
    }

    handleSearchResult() {
        const temp = this.state.searchedTech.toLowerCase();
        
        const searchedBlip = wholeList().find((e) => 
             (e.name.toLowerCase() == temp));

        if (searchedBlip !== undefined) {
            this.setState({
                showBlipDetail: true,
                searchedTech: '',
                clickedBlip: searchedBlip
            })
        } else {
            this.setState({
                showBlipDetail: false,
                searchedTech: '',
                clickedBlip: null
            })
        }
    }

    render() {
        const radius = this.state.blipRadius, size = this.state.size,
            centerX = this.state.centerPointX, centerY = this.state.centerPointY,
            searchedBlip = this.state.showBlipDetail ? this.renderBlip() : '',
            radarPanel = !this.state.showBlipListing ? (
            <div>
                <div>
                    <Container className="tech-textfield-container">
                    <TextField placeholder="Suche Technologie . . ." label="Suche Technologie . . ."variant="outlined" fullWidth={true} onChange={this.handleSearchState} onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.handleSearchResult();
                            e.target.value = '';
                        }
                    }}>
                    </TextField>
                    </Container>
                    
                    <div className="searched-blip">
                        {searchedBlip}
                    </div>
                </div>

                <div className="radar-svg">
                <svg id="radarplot" height="90%"  viewBox="0 0 500 500">
                    <path id="q1-path" d={this.state.qOnePathDef} fill="none"/>
                        <text x="100px" className="tech-path">
                            <textPath href="#q1-path">
                                Plattformen
                            </textPath>
                        </text>

                    <path id="q2-path" d={this.state.qTwoPathDef}  fill="none"/>
                        <text x="110px" className="tech-path">
                            <textPath href="#q2-path">
                                Methoden & Techniken
                            </textPath>
                        </text>

                    <path id="q3-path" d={this.state.qThreePathDef} fill="none"/>
                        <text x="95px" className="tech-path">
                            <textPath href="#q3-path">
                                Frameworks & Sprachen
                            </textPath>
                        </text>

                    <path id="q4-path" d={this.state.qFourPathDef} fill="none"/>
                        <text x="125px" className="tech-path">
                            <textPath href="#q4-path">
                                Werkzeuge
                            </textPath>
                        </text>
                    <circle cx={centerX} cy={centerY} r={size/2}  className="outerCircleRing"/>
                    <circle cx={centerX} cy={centerY} r={size/2.5} className="middleCircleRing" />
                    <circle cx={centerX} cy={centerY} r={size/4} className="innerCircleRing"/>
                    <line className="stroke" x1={0} y1={centerY} x2={size} y2={size/2}/>
                    <line className="stroke" x1={centerX} y1={0} x2={centerX} y2={size}/>
                    {
                        this.state.resolvedData.map((blip, index) => {
                            return  (
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip className="tooltip-blip" title={blip.name}>    
                                        <g key={index} id={blip.name} onClick={ () => this.openInfoOfBox(blip)   }  >
                                        <circle className="blipCircle" cx={blip.x}
                                            cy={blip.y}
                                            r={radius}
                                        />
                                        <text className ="blipIndex" 
                                            x={blip.x - textPosition(index)} 
                                            y={blip.y + 2}
                                            fontSize={radius-1}>{index+1}</text>
                                        </g>
                                    </Tooltip>
                                </MuiThemeProvider>
                            )
                        })
                    }
                    
                </svg>
                </div>
                <div className="quadrant-buttons">
                    <button id="mobile-plattform" onClick={(e) => this.handleChange(e, 1)}>1</button>
                    <button onClick={(e) => this.handleChange(e, 2)}>2</button>
                    <button onClick={(e) => this.handleChange(e, 3)}>3</button>
                    <button onClick={(e) => this.handleChange(e, 4)}>4</button>
                </div>
            </div>
            ) : '';

       

        return <div className="radar-root">
                <div>        
                    <AppBar centered position="static" color="default">
                        <Tabs 
                        className="quadrant-bar"
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        >
                        <Tab className="quadrant-tab" id = "alleQ" label="Alle Quadranten" value={0} />
                        <Tab className="quadrant-tab" id = "plattform" label="Plattformen" value={1} />
                        <Tab className="quadrant-tab" label="Methoden/ Techniken" value={2} />
                        <Tab className="quadrant-tab" label="Frameworks & Sprachen" value={3} />
                        <Tab className="quadrant-tab" label="Werkzeuge" value={4} />
                        </Tabs>
                    </AppBar>                    
                </div>
                {radarPanel}
                
                
                {this.renderBlip()}
                {this.renderBlipListing()}
        </div>
    }
}

export default withStyles(styles)(RadarComponent);

// comment