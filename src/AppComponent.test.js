import React from 'react'; 
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AppComponent from './components/AppComponent';
import JavaDataService from './components/dataservices/JavaDataService';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Unit test: AppComponent', () => {
    it('renders AppComponent', () => {
        act(() => {
            render(<AppComponent />, container);
        });
        expect.stringContaining('<div className="grid-container">');
    })
    it('looking for AppBar in AppComponent \n and whole tabs', () => {
        act(() => {
            render(<AppComponent />, container);
        });
        expect.stringContaining('<AppBar centered className="tech-appbar" title="Techradar" position="static" color="default">');
        expect(container.querySelector('#javaTab')).not.toBeNull();
        expect(container.querySelector('#microTab')).not.toBeNull();
        expect(container.querySelector('#jsTab')).not.toBeNull();
        expect(container.querySelector('#faq')).not.toBeNull();
    });
    it('check main URL and JavaDataService', () => {
        act(() => {
            render(<AppComponent />, container);
        });
        const button = container.querySelector('#javaTab');
        expect(button.innerHTML).toBe('<span class=\"MuiTab-wrapper\">Java</span><span class=\"MuiTouchRipple-root\"></span>');
        
        act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        })
        //expect(window.location.href).toBe('http://localhost/java')
        //expect(container.querySelector('#javaDS')).not.toBeNull();

        const showJava1 = JavaDataService.showJava
        act(() => {
            render(<JavaDataService id="javaDS"/>, container);
        });

        expect(showJava1).not.toBeDefined();
        //expect.stringContaining('id="javaDS"');
    })
})



