import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
// import { act } from 'react-dom/test-utils';
import { shallow, mount/*, render*/ } from 'enzyme';

import RadarDataService from '../components/RadarDataService.jsx';
import msJSON from '../components/microsoft-radar.json';

let container = null;

configure({ adapter: new Adapter() });

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Unit test: RadarDataService', () => {
    it('check all states1', () => {
        const wrapper = shallow(<RadarDataService />);
        const assertionObj = {
            blips: [],
            data: undefined,

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
        expect(wrapper.state()).toEqual(assertionObj);
    });
    it('check the functions . . .', () => {

    });
});

describe('Unit test: MSDataService', () => {
    it('check all states2', () => {
        const wrapper = shallow(<RadarDataService data={msJSON} />);

        expect(wrapper.state('data')).toEqual(msJSON);
        expect(wrapper.state('innerRingDistance')).toEqual(100);
        expect(wrapper.state('innerRingWidth')).toEqual(200);
        expect(wrapper.state('middleRingDistance')).toEqual(158.33333333333334);
        expect(wrapper.state('middleRingWidth')).toEqual(83.33333333333333);
        expect(wrapper.state('outerRingDistance')).toEqual(225);
        expect(wrapper.state('outerRingWidth')).toEqual(50);

        expect(wrapper.state('blips').length).toBeGreaterThan(0);
    });

    it('check all blips, whether they overlap', () => {
        const wrapper = mount(<RadarDataService data={msJSON} />);
        function checkOverlapping() {
            const blips = wrapper.state('blips');
            for (let i = 0; i < blips.length; i++) {
                let currentBlip = blips[i];
                let j = i + 1;
                for (j; j < blips.length; j++) {
                    const nextBlip = blips[j];
                    if (currentBlip.x === nextBlip.x &&
                        currentBlip.y === nextBlip.y) {
                        return false;
                    }
                }
            }
            return true;
        }
        expect(checkOverlapping()).toBe(true);
    });
});