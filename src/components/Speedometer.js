import React from 'react';

class Speedometer extends React.Component {
  render() {
    return (
        <div className="speedometer-container">
            <div className="speedometer">
                <span id="letter">{ this.props.letter }</span>
                <p>
                    Total Presses: { this.props.paceStats.totalKeyPresses } |
                    Press Length: { this.props.paceStats.longestKeyPress.toFixed(2) } sec |
                    KPS: { this.props.paceStats.keyPressesSecond } |
                    KPM: { this.props.paceStats.keyPressesMinute } |
                    KPH: { this.props.paceStats.keyPressesHour }
                </p>
            </div>
        </div>
       );
    }
}

export default Speedometer;
