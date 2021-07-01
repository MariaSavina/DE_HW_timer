import React, { Component } from 'react';

const {Provider, Consumer} = React.createContext();

class ThemeContext extends Component {
    state={
        theme: 'light'
    }

    setTheme = () => {
        this.setState({theme: this.state.theme == 'light' ? this.state.theme ='dark' : this.state.theme ='light'})
    }

    render(){
        const contextValue = {
            theme : this.state.theme,
            changeTheme: this.setTheme
            }
        return(
            <Provider value={contextValue}>{this.props.children}</Provider>
        )
    }
}

export {ThemeContext, Consumer};