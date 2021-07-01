import React from 'react';

import {ThemeContext, Consumer} from '../Context/Context.js'

import './header.scss'
import '../Main/main.scss'

const Header = () => (
    <header className="header">
        <div className="header__info">
            <h2>Timer</h2>
            <img src="../../../public/assets/--pocket-watch--v1.png" style={{width: "50px"}}/>
        </div>
        <Consumer>
            {context=>(
                    <button className={`main__buttons-child button-${context.theme}`} onClick={context.changeTheme}>{context.theme}</button>
                )
            }
        </Consumer>
    </header>
)

export default Header