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
import  MuiDownShift from 'mui-downshift';

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
}, suggestions = () => {
    const list = wholeList();
    let suggestions = [];
    list.forEach((item, idx) => {
        let suggestion = {
            label: item.name,
            value: idx
        }
        suggestions.push(suggestion);
    });
    return suggestions;
}, wholeList = () => {
    let arr = [];
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

            filteredItems: []
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

    handleStateChange = changes => {
        const searchValue = changes.inputValue;
        if (typeof searchValue === 'string') {
          const filteredItems = suggestions().filter(item => item.label.toLowerCase().includes(searchValue.toLowerCase()));
          this.setState({ filteredItems });
          suggestions().find((suggestion) => {
              if (suggestion.label === searchValue) {
                  const technology = wholeList().find((e) => (e.name === searchValue));
                  this.setState({
                    showBlipDetail: true,
                    clickedBlip: technology
                  })
              }
          })
        }
    }

    render() {
        const { filteredItems, blipRadius, size, centerPointX, centerPointY,
            qOnePathDef, qTwoPathDef, qThreePathDef, qFourPathDef } = this.state;
        const showBlipDetail = this.state.showBlipDetail ? (
                <Slide in={true} direction="down" mountOnEnter unmountOnExit>
                    <div className="blip-overlay">
                        <BlipDetailSheetComponent ref={(ele) => this.blipDetail = ele } {...this.state.clickedBlip} onOutside={() => this.removeBlip()} element={<RemoveButton onClick={() => {
                            this.removeBlip();
                            }} />} 
                        />
                    </div>
                </Slide> 
            ): '',
            showBlipList = this.state.showBlipListing ? (
                <BlipListingComponent 
                    {...this.state.filteredBlips} 
                    openInfo={this.openInfoOfBox} 
                    onClick={() => this.setState({ showBlipListing: false }) } 
                />
            ): '',
            radarPanel = !this.state.showBlipListing ? (
            <div>
                <div id="autocomplete-div">
                    <Container>
                        <MuiDownShift 
                            items={filteredItems}
                            onStateChange={this.handleStateChange}
                            fullWidth={true}
                            variant="outlined"
                            getInputProps={
                                () => ({
                                    label: 'Suche Technologie . . . ',
                                    helperText: 'Gebe eine Technologie ein (z.B.: JavaFX) . . '
                                })
                            }
                        />
                    </Container>
                </div>
                <div className="radar-svg">
                <svg id="radarplot" height="90%"  viewBox="0 0 500 500">
                    <path id="q1-path" d={qOnePathDef} fill="none"/>
                        <text x="100px" className="tech-path">
                            <textPath href="#q1-path">
                                Plattformen
                            </textPath>
                        </text>

                    <path id="q2-path" d={qTwoPathDef}  fill="none"/>
                        <text x="110px" className="tech-path">
                            <textPath href="#q2-path">
                                Methoden & Techniken
                            </textPath>
                        </text>

                    <path id="q3-path" d={qThreePathDef} fill="none"/>
                        <text x="95px" className="tech-path">
                            <textPath href="#q3-path">
                                Frameworks & Sprachen
                            </textPath>
                        </text>

                    <path id="q4-path" d={qFourPathDef} fill="none"/>
                        <text x="125px" className="tech-path">
                            <textPath href="#q4-path">
                                Werkzeuge
                            </textPath>
                        </text>
                    <circle cx={centerPointX} cy={centerPointY} r={size/2}  className="outerCircleRing"/>
                    <circle cx={centerPointX} cy={centerPointY} r={size/2.5} className="middleCircleRing" />
                    <circle cx={centerPointX} cy={centerPointY} r={size/4} className="innerCircleRing"/>
                    <line className="stroke" x1={0} y1={centerPointY} x2={size} y2={size/2}/>
                    <line className="stroke" x1={centerPointX} y1={0} x2={centerPointX} y2={size}/>
                    {
                        this.state.resolvedData.map((blip, index) => {
                            return  (
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip className="tooltip-blip" title={blip.name}>    
                                        <g key={index} id={blip.name} onClick={ () => this.openInfoOfBox(blip)   }  >
                                        <circle className="blipCircle" cx={blip.x}
                                            cy={blip.y}
                                            r={blipRadius}
                                        />
                                        <text className ="blipIndex" 
                                            x={blip.x - textPosition(index)} 
                                            y={blip.y + 2}
                                            fontSize={blipRadius-1}>{index+1}</text>
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
                    <AppBar id="radar-appbar" centered position="static" color="default">
                        <Tabs id="quadrant-bar" className="quadrant-bar"
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
                
                
                {showBlipDetail}
                {showBlipList}
        </div>
    }
}

export default withStyles(styles)(RadarComponent);