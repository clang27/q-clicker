import React from 'react';

class Header extends React.Component {
  render() {
    return (
        <header>
            <span className="first-stat">Presses: <span className="odometer">{ this.props.userStats.totalKeyPresses.toString().padStart(8, '0') }</span></span>
            <span>1 sec: <span className="odometer">{ this.props.userStats.keyPressesSecond.toString().padStart(2, '0') }</span></span>
            <span>10 sec: <span className="odometer">{ this.props.userStats.keyPressesTenSecond.toString().padStart(3, '0') }</span></span>
            <span>30 sec: <span className="odometer">{ this.props.userStats.keyPressesThirtySecond.toString().padStart(3, '0') }</span></span>
            <span>1 min: <span className="odometer">{ this.props.userStats.keyPressesMinute.toString().padStart(3, '0') }</span></span>
            <span>5 min: <span className="odometer">{ this.props.userStats.keyPressesFiveMinute.toString().padStart(4, '0') }</span></span>
            <span>Press Length: <span className="odometer">{ this.props.userStats.longestKeyPress.toFixed(2) }</span></span>
            <span className="last-stat">Time: <span className="odometer">{ this.props.timeOnSite.toString().padStart(8, '0') }</span></span>
        </header>
       );
    }
}

export default Header;
