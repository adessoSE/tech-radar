import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from '../App.js';

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

describe('Unit test: App', () => {
    it('renders App', () => {
        act(() => {
            render(<App />, container);
        });
        expect.stringContaining('<div id="appJS-root">');
    })
})
