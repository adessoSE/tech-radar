import React  from 'react';
import RadarComponent from '../RadarComponent';

class RadarDataService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blips: [],
            data: [],

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
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.state.data = this.props.data;
	}

	componentDidMount() {
        this.createBlipData();
	}
	
    createBlipData() {
		
		this.calculateBlipCoordinates();
		for (let item of this.state.data) {
			this.addBlip(item);
			this.state.blips.push(item);
		}
	}

	getBlipData() {
		return this.state.blips;
	}

	/* eslint-disable */
	calculateBlipCoordinates() {
		this.state.blipRadius = this.state.size / 80;		
		this.state.outerRingWidth = this.state.size / 10;
		this.state.middleRingWidth = this.state.size / 6;
		this.state.innerRingWidth = this.state.size / 2.5;

		this.state.centerPointX = this.state.size / 2;
		this.state.centerPointY = this.state.size / 2;

		this.state.outerRingDistance = this.state.size / 2 - this.state.outerRingWidth/2;
		this.state.middleRingDistance = this.state.size / 2 - this.state.outerRingWidth - this.state.middleRingWidth/2;
		this.state.innerRingDistance = this.state.innerRingWidth/2;		
	}

	radians(deg) { return deg * Math.PI / 180; }

	overlaps(blips, blip) {
		for (let b of blips) {
			if (b.positioned) {
				var dist = Math.sqrt(Math.abs(b.x - blip.x) ** 2 + Math.abs(b.y - blip.y) ** 2);
				if (dist < (2 * this.state.blipRadius)) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 
	 * @param blip 
	 * @param startRadius Where the positioning starts
	 * @param distance Where the positioning starts, i.e. distance of middle of the ring to the center of the radar
	 * @param ringWidth The width of the ring, i.e. how much the blip can deviate from the distance
	 */
	positionBlip(blip, startRadius, distance, ringWidth) {
		// 1. choose a  start distance
		//var dist = (distance - Math.random() * (this.ringWidth - 2 * this.blipRadius));
		var dist = distance;
		// 2. choose a start radius		
		var blipCoordinates = {x:1,y:1,radius:startRadius+5};
		blipCoordinates.x = this.state.centerPointX + dist * Math.cos(this.radians(startRadius+5));
		blipCoordinates.y = this.state.centerPointY - dist * Math.sin(this.radians(startRadius+5));		
		var j = 1;
		var i = 1;
		while (this.overlaps(this.state.blips, blipCoordinates) && i < (90/this.state.alphaSteps)) {
			//loop in alphaSteps steps through the radius
			var grad = (blipCoordinates.radius + this.state.alphaSteps) % 80 + 5 + startRadius;
			blipCoordinates.x = this.state.centerPointX + dist * Math.cos(this.radians(grad));
			blipCoordinates.y = this.state.centerPointY - dist * Math.sin(this.radians(grad));
			i++;
			while (this.overlaps(this.state.blips, blipCoordinates) && j < 20) {	
				// choose a new start distance
				dist = (distance - Math.random() * (ringWidth/2 - 2 * this.state.blipRadius));
				// choose a start radius
				grad = startRadius + Math.random() * 80 + 5;
				blipCoordinates.x = this.state.centerPointX + dist * Math.cos(this.radians(grad));
				blipCoordinates.y = this.state.centerPointY - dist * Math.sin(this.radians(grad));
				j++;
			}
		}					
		blip.x = blipCoordinates.x;
		blip.y = blipCoordinates.y;
		blip.positioned = true;
	}	

	addBlip(blip) {
		var startRadius;

		switch (blip.quadrant) {
			case (1): {
				startRadius = 90;
				break;
			}
			case (2): {
				startRadius = 0;
				break;
			}
			case (3): {
				startRadius = 180;
				break;
			}
			case (4): {
				startRadius = 270;
				break;
			}
			default:
				break;
		}
		
		switch (blip.ring) {
			case ('einsetzen'): {				
				this.positionBlip(blip, startRadius, this.state.innerRingDistance,this.state.innerRingWidth);
				break;
			}
			case ('evaluieren'): {				
				this.positionBlip(blip, startRadius, this.state.middleRingDistance,this.state.middleRingWidth);
				break;
			}
			case ('überdenken'): {				
				this.positionBlip(blip, startRadius, this.state.outerRingDistance,this.state.outerRingWidth);
				break;
			}
			default:
				break;
		}		
	}

	render() {
		return (
			
		<RadarComponent blips={this.state.blips} /> 
				
		);
	}
}

export default RadarDataService;