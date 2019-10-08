import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'; 
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

import JavaDataService from '../src/components/dataservices/JavaDataService';
import javaJSON from '../src/components/java-radar.json';

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

describe('Unit test: JavaDataService', () => {
    it('check all states', () => {
        const wrapper = shallow(<JavaDataService />);

        expect(wrapper.state('data')).toEqual(javaJSON);
        expect(wrapper.state('innerRingDistance')).toEqual(100);
        expect(wrapper.state('innerRingWidth')).toEqual(200);
        expect(wrapper.state('middleRingDistance')).toEqual(158.33333333333334);
        expect(wrapper.state('middleRingWidth')).toEqual(83.33333333333333);
        expect(wrapper.state('outerRingDistance')).toEqual(225);
        expect(wrapper.state('outerRingWidth')).toEqual(50);

        expect(wrapper.state('blips').length).toBeGreaterThan(0);
    });
    it('check all blips, whether they overlap', () => {
        const wrapper = shallow(<JavaDataService />);
        function checkOverlapping() {
            const blips = wrapper.state('blips');
            for (let i = 0; i < blips.length; i++) {
                let currentBlip = blips[i];
                let j = i+1;
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