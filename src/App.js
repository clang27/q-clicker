import React from 'react';

import Header from './components/Header'
import Speedometer from './components/Speedometer'
import Footer from './components/Footer'
import {averageKeyPressRate, BUFFER_LENGTH, LETTER_TO_PRESS, MS, SECOND, STATS, totalKeyPressRate} from './util.js'

class App extends React.Component {
    // Buffers/temporary-memory used for many stats
    keyPressesInSecondPace = [0];
    keyPressesInSecondTotal = [0];

    state = {
        keyDown: false,
        secondDownInterval: null,
        secondHeartbeatInterval: null,
        timeOnSite: 0,
        globalStats: STATS, // From DB
        userStats: STATS, // Personal Bests
        paceStats: STATS // If the user was to keep the pace, what their best user stat would be
    };

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

        this.setState({secondHeartbeatInterval: setInterval(this.secondHeartbeat, SECOND)});
    }

    componentWillUnmount() {
        clearInterval(this.state.secondHeartbeatInterval);
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
    };

    secondHeartbeat = () => {
        // If the key was not pressed in the past 3 seconds, clear the pace buffer
        if (
            this.keyPressesInSecondPace[this.keyPressesInSecondPace.length - 1] === 0 &&
            this.keyPressesInSecondPace[this.keyPressesInSecondPace.length - 2] === 0 &&
            this.keyPressesInSecondPace[this.keyPressesInSecondPace.length - 3] === 0
        ) {
            this.keyPressesInSecondPace = [0];
        }

        // Do NOT waste memory!! Clean the buffers up if they pass the max length of storage
        if (this.keyPressesInSecondPace.length > BUFFER_LENGTH){
            this.keyPressesInSecondPace = this.keyPressesInSecondPace.slice(this.keyPressesInSecondPace.length - BUFFER_LENGTH)
        }
        if (this.keyPressesInSecondTotal.length > BUFFER_LENGTH) {
            this.keyPressesInSecondTotal = this.keyPressesInSecondTotal.slice(this.keyPressesInSecondTotal.length - BUFFER_LENGTH)
        }

        const kps = this.keyPressesInSecondTotal[this.keyPressesInSecondTotal.length - 1];
        const kptens = totalKeyPressRate(this.keyPressesInSecondTotal, 10);
        const kpthirtys = totalKeyPressRate(this.keyPressesInSecondTotal, 30);
        const kpm = totalKeyPressRate(this.keyPressesInSecondTotal, 60);
        const kpfm = totalKeyPressRate(this.keyPressesInSecondTotal, 300);

        this.setState({
            timeOnSite: this.state.timeOnSite + 1,
            paceStats: {
                ...this.state.paceStats,
                keyPressesSecond: this.keyPressesInSecondPace[this.keyPressesInSecondPace.length - 1],
                keyPressesTenSecond: averageKeyPressRate(this.keyPressesInSecondPace, 10),
                keyPressesThirtySecond: averageKeyPressRate(this.keyPressesInSecondPace, 30),
                keyPressesMinute: averageKeyPressRate(this.keyPressesInSecondPace, 60),
                keyPressesFiveMinute: averageKeyPressRate(this.keyPressesInSecondPace, 300)
            },
            userStats: {
                ...this.state.userStats,
                keyPressesSecond: (kps > this.state.userStats.keyPressesSecond) ? kps : this.state.userStats.keyPressesSecond,
                keyPressesTenSecond: (kptens > this.state.userStats.keyPressesTenSecond) ? kptens : this.state.userStats.keyPressesTenSecond,
                keyPressesThirtySecond: (kpthirtys > this.state.userStats.keyPressesThirtySecond) ? kpthirtys : this.state.userStats.keyPressesThirtySecond,
                keyPressesMinute: (kpm > this.state.userStats.keyPressesMinute) ? kpm : this.state.userStats.keyPressesMinute,
                keyPressesFiveMinute: (kpfm > this.state.userStats.keyPressesFiveMinute) ? kpfm : this.state.userStats.keyPressesFiveMinute
            }
        });

        // The key presses in the second were recorded, add a new element to the buffer for the new seconds to be counted
        this.keyPressesInSecondPace.push(0);
        this.keyPressesInSecondTotal.push(0);
    };

    onKeyDown(e) {
        if (e.key === LETTER_TO_PRESS && !this.state.keyDown) {
            let interval = setInterval(this.setLongestKeyDown, MS);
            this.setState({
                keyDown: true,
                secondDownInterval: interval,
                paceStats: {
                    ...this.state.paceStats,
                    longestKeyPress: 0
                }
            });
        }
    }

    onKeyUp(e) {
        if (this.state.keyDown) {
            clearInterval(this.state.secondDownInterval);

            this.keyPressesInSecondPace[this.keyPressesInSecondPace.length - 1]++;
            this.keyPressesInSecondTotal[this.keyPressesInSecondTotal.length - 1]++;

            this.setState({
                keyDown: false,
                secondDownInterval: null,
                paceStats: {
                    ...this.state.paceStats,
                    totalKeyPresses: this.state.paceStats.totalKeyPresses + 1
                },
                userStats: {
                    ...this.state.userStats,
                    totalKeyPresses: this.state.userStats.totalKeyPresses + 1,
                    longestKeyPress: (this.state.paceStats.longestKeyPress > this.state.userStats.longestKeyPress) ? this.state.paceStats.longestKeyPress : this.state.userStats.longestKeyPress
                }
            });
        }
    }

    render() {
        return (
            <div id='app' onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
                <Header timeOnSite={ this.state.timeOnSite } globalStats={ this.state.globalStats } userStats={ this.state.userStats }/>
                <Speedometer keyDown={ this.state.keyDown } paceStats={ this.state.paceStats }/>
                <Footer />
            </div>
       );
    }
}

export default App;
