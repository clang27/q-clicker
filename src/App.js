import React from 'react';

import Header from './components/Header'
import Speedometer from './components/Speedometer'
import Footer from './components/Footer'

const LETTER_TO_PRESS = window.location.hostname[0];
const MS = 10;

class App extends React.Component {
    keyDown = false;

    stats = {
        totalKeyPresses: 0,
        longestKeyPress: 0,
        keyPressesSecond: 0,
        keyPressesMinute: 0,
        keyPressesTenMinute: 0,
        keyPressesHour: 0
    }

    state = {
        secondDownInterval: null,
        globalStats: this.stats,
        userStats: this.stats,
        paceStats: this.stats
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown.bind(this));
        document.removeEventListener("keyup", this.onKeyUp.bind(this));
    }

    setLongestKeyDown = () => {
        this.setState({
            paceStats: {
                ...this.state.paceStats,
                longestKeyPress: this.state.paceStats.longestKeyPress + (MS / 1000)
            }
        });
    }

    onKeyDown(e) {
        if (e.key === LETTER_TO_PRESS && !this.keyDown) {
            this.keyDown = true;

            clearInterval(this.state.secondUpInterval);
            var interval = setInterval(this.setLongestKeyDown, MS);
            this.setState({
                secondDownInterval: interval,
                secondUpInterval: null,
                paceStats: {
                    ...this.state.paceStats,
                    longestKeyPress: 0
                }
            });
        }
    }

    onKeyUp(e) {
        if (this.keyDown) {
            clearInterval(this.state.secondDownInterval);
            var interval = setInterval(this.countKeyUp, 1);

            this.setState({
                secondDownInterval: null,
                secondUpInterval: interval,
                paceStats: {
                    ...this.state.paceStats,
                    totalKeyPresses: this.state.paceStats.totalKeyPresses + 1
                }
            });
            this.keyDown = false;
        }
    }

    render() {
        return (
            <div id='app' onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
                <Header globalStats={ this.state.globalStats } userStats={ this.state.userStats }/>
                <Speedometer letter={ LETTER_TO_PRESS.toUpperCase() } paceStats={ this.state.paceStats }/>
                <Footer />
            </div>
       );
    }
}

export default App;
