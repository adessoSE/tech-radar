import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
// import { act } from 'react-dom/test-utils';
import { /*shallow, */mount, render } from 'enzyme';

import RadarComponent from '../components/RadarComponent.jsx';
import javaJSON from '../components/java-radar.json';

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

describe('Unit test: BlipListingComponent', () => {
    it('check, if there are 4 mobile buttons', () => {
        const wrapper = mount(<RadarComponent {...javaJSON} />),
            buttons = wrapper.find('.quadrant-buttons');

        expect(buttons.children().length).toEqual(4);
    });
    it('check, if there is AppBar', () => {
        const wrapper = mount(<RadarComponent {...javaJSON} />),
            appBar = wrapper.find('#radar-appbar');

        expect(appBar.exists()).toEqual(true);
        expect(wrapper.find('#cuyInBolivia').exists()).not.toEqual(true);
    });
    it('check, if quadrant-tab has 5 tabs', () => {
        const wrapper = render(<RadarComponent {...javaJSON} />),
            tabs = wrapper.find('.quadrant-tab');

        expect(tabs.length).toEqual(5);
        expect(tabs.length).not.toEqual(25);
    })
});