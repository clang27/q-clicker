import React from 'react';
import linkedin from '../images/linkedin.jpg'
import github from '../images/github.jpg'

class Footer extends React.Component {
  version = '0.0.2';

  render() {
    return (
        <footer>
            <span id="version">{this.version}</span>
            <a href='https://www.linkedin.com/in/clang27' rel='noopener noreferrer' target='_blank' ><img src={linkedin} type="image/jpeg" alt="Clang's LinkedIn Profile" /></a>
            <a href='https://github.com/clang27/q-clicker' rel='noopener noreferrer' target='_blank' ><img src={github} type="image/jpeg" alt="Clang's GitHub Profile" /></a>
        </footer>
       );
    }
}

export default Footer;
