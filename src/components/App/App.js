import React from 'react';

import Header from '../Header';
import Main from '../Main';
import {ThemeContext, Consumer} from '../Context/Context.js'

import './app.scss';

const App = () => (
    <>
        <ThemeContext>
            <Header/>
            <Main/>
        </ThemeContext> 
    </>
)

export default App