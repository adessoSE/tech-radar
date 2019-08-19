import RadarDataService from './RadarDataService';
import javadata from '../java-radar.json';
import React  from 'react';
import RadarComponent from '../RadarComponent';

class JavaDataService extends RadarDataService {
    constructor(props) {
        super(props);
        this.state = {
            blips: [],
            data: javadata,

            size: 500, 
            blipRadius: 0, 
            centerPointX: 0,
            centerPointY: 0,
            outerRingWidth: 0,
            middleRingWidth: 0,
            innerRingWidth: 0,
            alphaSteps: 2,
            outerRingDistance: 0,
            middleRingDistance: 0,
            innerRingDistance: 0
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.createBlipData();
    }

    render() {
        return <>
            <RadarComponent blips={this.state.blips} />
            </>
    }
}

export default JavaDataService;