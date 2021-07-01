import React from 'react';

import {ThemeContext, Consumer} from '../Context/Context.js'

import './main.scss';


class Main extends React.Component {
    constructor(props){
        super(props);
         this.state ={
            inpMin:'',
            inpSec:'',
            minutes: "00",
            seconds: "00"
        }
    }

    inputTime = (e) => {
        if(e.target.value.length == 2){
            e.target.value += ':'
        }
        let res=e.target.value.split('')
        this.setState ({
            inpMin: res[0]+res[1] > 59 ? 59 : res[0]+res[1],
            inpSec: res[3]+res[4] > 59 ? 59 : res[3]+res[4]
        })
    }

    setCount = () => {
        this.setState ({
            minutes: this.state.inpMin,
            seconds: this.state.inpSec
        })
    }

    startCount = () => {
        this.timerID=setInterval(()=>this.setState ({
            minutes: this.state.seconds == "00" ? (this.state.minutes == "00" ? "00" : (this.state.minutes>9?this.state.minutes - 1:`0${this.state.minutes - 1}`)) : this.state.minutes,
            seconds: this.state.seconds == "00" ? (this.state.minutes == "00" ? "00" : 59) : (this.state.seconds>10?this.state.seconds - 1:`0${this.state.seconds - 1}`) 
        }),1000)
    }

    stopCount = () => {
        this.setState ({
            minutes: this.state.minutes,
            seconds: this.state.seconds
        })
        clearInterval(this.timerID);
    }

    resetCount = () => {
        this.setState ({
            minutes: "00",
            seconds: "00"
        })
        clearInterval(this.timerID);
    }

    render() {
        return <Consumer>
                    {context=>(
                            <main className={`main main-${context.theme}`}>
                                <input maxLength={5} placeholder={"00:00"} onChange={this.inputTime}/>
                                <div className="main__result">{this.state.minutes}:{this.state.seconds}</div>
                                <div className="main__buttons">
                                    <button className={`main__buttons-child button-${context.theme}`} onClick={this.setCount}>set</button>
                                    <button className={`main__buttons-child button-${context.theme}`}>stop</button>
                                    <button className={`main__buttons-child button-${context.theme}`}>start</button>
                                    <button className={`main__buttons-child button-${context.theme}`}>reset</button>
                                </div>
                            </main>
                        )
                    }
                </Consumer>
        
        
    }
  }

export default Main