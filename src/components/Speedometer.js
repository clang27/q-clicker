import React from 'react';
import {LETTER_TO_PRESS} from '../util.js';

class Speedometer extends React.Component {
  getSpeedometerStyle = () => {
    let {keyPressesSecond} = this.props.paceStats;

    return {
        borderTop: (keyPressesSecond > 6) ? '1em solid #d43434' : '1em solid white',
        borderBottom: '1em solid transparent',
        borderLeft: (keyPressesSecond > 0) ? '1em solid #d43434' : '1em solid white',
        borderRight: (keyPressesSecond > 10) ? '1em solid #d43434' : '1em solid white',
        borderRadius: '50%'
    }
  };

  getLetterStyle = () => {
      return {
          fontSize: (this.props.keyDown) ? '20.5rem' : '21rem',
          textShadow: (this.props.keyDown) ? '2px 2px 2px darkgray' : '4px 4px 4px darkgray'
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
