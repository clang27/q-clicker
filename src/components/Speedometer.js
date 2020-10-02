import React from 'react';
import {LETTER_TO_PRESS} from '../util.js';

class Speedometer extends React.Component {
  getSpeedometerStyle = () => {
    let {keyPressesSecond} = this.props.paceStats;
    let bt = '1em solid transparent';
    let br = '1em solid transparent';
    let bl = '1em solid transparent';
    let bb = '1em solid transparent';

    if(keyPressesSecond > 0) {
        bl = '1em solid #d43434';
    }
    if(keyPressesSecond > 6) {
        bt = '1em solid #d43434';
    }
    if(keyPressesSecond > 10) {
        br = '1em solid #d43434';
    }

    return {
        borderTop: bt,
        borderBottom: bb,
        borderLeft: bl,
        borderRight: br,
        borderRadius: '50%'
    }
  };

  getLetterStyle = () => {
      return {
          fontSize: (this.props.keyDown) ? '19.5rem' : '20rem'
      }
    };

  render() {
    return (
        <div className="speedometer-container">
            <div style={this.getSpeedometerStyle()} className="speedometer">
                <span id="letter" style={this.getLetterStyle()}>{ LETTER_TO_PRESS.toUpperCase() }</span>
                <div id="pace">
                <p>
                    <label>Pace:</label>
                    1 sec: <span className="pace-odometer">{ this.props.paceStats.keyPressesSecond.toString().padStart(2, '0') }</span>&nbsp;
                    10 sec: <span className="pace-odometer">{ this.props.paceStats.keyPressesTenSecond.toString().padStart(3, '0') }</span>&nbsp;
                    30 sec: <span className="pace-odometer">{ this.props.paceStats.keyPressesThirtySecond.toString().padStart(3, '0') }</span>&nbsp;
                    1 min: <span className="pace-odometer">{ this.props.paceStats.keyPressesMinute.toString().padStart(3, '0') }</span>&nbsp;
                    5 min: <span className="pace-odometer">{ this.props.paceStats.keyPressesFiveMinute.toString().padStart(4, '0') }</span><br/><br/>
                    Held for <span className="pace-odometer">{ this.props.paceStats.longestKeyPress.toFixed(2) }</span> seconds
                </p>
                </div>
            </div>
        </div>
       );
    }
}

export default Speedometer;
