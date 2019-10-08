import React from 'react'; 
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AppComponent from '../src/components/AppComponent';
import { showJava, showMS, showJS, FAQ } from '../src/components/AppComponent';
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
        });

        expect(showJava).toBeDefined();
        expect(showMS).toBeDefined();
        expect(showJS).toBeDefined();
        expect(FAQ).toBeDefined();
    });
    it('check, FAQ is there', () => {
        act(() => {
            render(<AppComponent />, container);
            render(FAQ(), container);
        });

        const faqPage = container.querySelector('.faq-container');
        expect(faqPage.innerHTML).toBe('<h2>How can I participate?</h2><p>The data for the radar is maintained <a id=\"gitlab\" href=\"https://gitlab.com/thomas.franz/adesso-technologie-radar\">here</a>. Make our radar better for all of us based on your experience and expertise. Feel free to discuss, open issues, create merge requests.</p><h2>Radar UI</h2><p>The source code of the UI of the radar is available <a id=\"scm\" href=\"https://bitbucket.adesso-group.com/scm/tr/react-techradar-mobile-team\">here</a>.</p>')
    })
})



