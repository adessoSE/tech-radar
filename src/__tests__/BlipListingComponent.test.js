import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';
import BlipListingComponent from '../components/BlipListingComponent.jsx';
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
    it('check blip list', () => {
        const wrapper = mount(<BlipListingComponent {...javaJSON} />);
        expect(wrapper.html()).toMatch(/Einsetzen/);
        expect(wrapper.html()).toMatch(/Evaluieren/);
        expect(wrapper.html()).toMatch(/Überdenken/);
        expect(wrapper.html()).not.toMatch(/BAUM/);
    });
    it('check, if there are some elements in use list', () => {
        const wrapper = mount(<BlipListingComponent {...javaJSON} />),
            useListLength = wrapper.find('#machuPichu').children().length,
            evaluateListLength = wrapper.find('#rainbowMountain').children().length,
            rethinkListLength = wrapper.find('#salarPlates').children().length;

        expect(useListLength).not.toBeLessThan(2);
        expect(evaluateListLength).not.toBeLessThan(2);
        expect(rethinkListLength).not.toBeLessThan(2);
    });
});