import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'; 
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

import RadarDataService from './components/dataservices/RadarDataService';

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
    it('check all states', () => {
        const wrapper = mount(<RadarDataService />);
        const assertionObj = {
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
        }
        expect(wrapper.state()).toEqual(assertionObj);
    });
    it('check the functions . . .', () => {

    });
})