import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'; 
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

import JavaDataService from './components/dataservices/JavaDataService';
import BlipDetailSheetComponent from './components/BlipDetailSheetComponent';
import javaJSON from './components/java-radar.json';

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
    it('check java title', () => {
        const java = {
            name: 'Java',
            ring: 'Einsetzen',
            radar: 'Java',
            desc: 'Test'
        }
        const wrapper = mount(<BlipDetailSheetComponent {...java} />);
        const wrongAssertionResult = {
            name: 'BAUM',
            ring: 'FALSCHE DATEN',
            radar: 'UNDEFINED',
            desc: 'NULL'
        }, assertionResult = {
            name: 'Java',
            ring: 'Einsetzen',
            radar: 'Java',
            desc: 'Test'
        };
        expect(wrapper.props()).toEqual(assertionResult);
        expect(wrapper.props()).not.toEqual(wrongAssertionResult);
    });
});