import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, mount, render } from 'enzyme';
import React from 'react';
import { exportAllDeclaration } from '@babel/types';

import App from './App';
import AppComponent from './components/AppComponent';
import RadarComponent from './components/RadarComponent'
import JavaDataService from './components/dataservices/JavaDataService';


configure({ adapter: new Adapter() });

describe('<App />', () => {
    it('renders <App /> properly', () => {
      const wrapper = shallow(<App />);
      expect(wrapper).toMatchSnapshot();
    });
});  

describe('<AppComponent />', () => {
    it('renders <AppComponent /> properly', () => {
        const wrapper = shallow(<AppComponent />);
        expect(wrapper).toMatchSnapshot();
    })
})

describe('<JavaDataService /> \n', () => {
    it('renders <JavaDataService /> component properly', () => {
        const wrapper = shallow(<JavaDataService />);
        expect(wrapper).toMatchSnapshot();
    })
    it('find Java in Component', () => {
        const wrapper = shallow(<JavaDataService />);
        const blips = Object.values(wrapper.state('blips'));
        for (let item of blips) {
            if (item.name === "Java") {
                console.log(item);
                break;
            }
        }
        const buttons = wrapper.filter('g');
        const java = buttons.find({ title: "Java"})
        console.log(buttons.debug());
    })
})

