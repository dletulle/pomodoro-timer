/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import React from 'react';
import './App.css';
import Break from './Components/Break';
import Controls from  './Components/Controls';
import Session from './Components/Session';
import Timer from './Components/Timer';

let timer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerLabel: "Session",
      breakLength: 5,
      sessionLength: 25,
      minLessThanTen: "",
      sessionMinutes: 25,
      secLessThanTen: "0",
      sessionSeconds: 0,
      playPause: false
    };

    this.countdown = this.countdown.bind(this);
    this.startPauseClick = this.startPauseClick.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.incrementDecrementClick = this.incrementDecrementClick.bind(this);
    this.zeroLogic = this.zeroLogic.bind(this);
  }
  
  zeroLogic(min, sec=0) {
    if (sec < 10) {
      this.setState({secLessThanTen: "0"})
    } else {
      this.setState({secLessThanTen: ""})
    }
    if (min !== "empty") {
      if (min < 10) {
      this.setState({minLessThanTen: "0"})
    } else {
      this.setState({minLessThanTen: ""})
    }
    }
  }

  countdown() {
    const seconds = this.state.sessionSeconds;
    const minutes = this.state.sessionMinutes;
    const label = this.state.timerLabel;
    const audio = document.getElementById("beep");
    
    if (minutes == 0 && seconds == 0 && label === "Session") {
      const breakLength = this.state.breakLength;
      this.setState({
        sessionMinutes: breakLength,
        sessionSeconds: 0,
        timerLabel: "Break"
      })
      this.zeroLogic(breakLength);
      audio.play()
    } else if (minutes == 0 && seconds == 0 && label === "Break") {
      const sessionLength = this.state.sessionLength;
      this.setState({
        sessionMinutes: sessionLength,
        sessionSeconds: 0,
        timerLabel: "Session"
      })
      this.zeroLogic(sessionLength);
      audio.play()
    } else {
      if (seconds - 1 < 0) {
      this.setState({
        sessionMinutes: minutes - 1,
        sessionSeconds: 59
      });
      this.zeroLogic(minutes - 1, 59);
    } else {
      this.setState({ sessionSeconds: seconds - 1 });
      this.zeroLogic("empty", seconds - 1);
    }
    }
  }

  startPauseClick() {
    const playState = this.state.playPause;
    this.setState({ playPause: !playState });
    if (!playState) {
      timer = setInterval(this.countdown, 1000);
    } else {
      clearInterval(timer);
      timer = undefined;
    }
  }

  resetClick(e) {
    const playState = this.state.playPause;
    const audio = document.getElementById("beep");
    this.setState({ playPause: !playState });
    clearInterval(timer);
    timer = undefined;
    this.setState({
      timerLabel: "Session",
      breakLength: 5,
      sessionLength: 25,
      minLessThanTen: "",
      sessionMinutes: 25,
      secLessThanTen: "0",
      sessionSeconds: 0,
      playPause: false
    });
    this.zeroLogic(25);
    audio.pause();
    audio.currentTime = 0;
  }

  incrementDecrementClick(e) {
    // If timer is paused, increment or decrement session or break based on id
    if (this.state.playPause === false) {
      const currentSession = this.state.sessionLength;
      const currentBreak = this.state.breakLength;
      const id = e.target.id;
      const label = this.state.timerLabel;
      
      switch (id) {
        case "session-increment":
          if (currentSession + 1 < 61) {
            this.setState({  sessionLength: currentSession + 1 })
            if (label === "Session") this.setState({sessionMinutes: currentSession + 1, sessionSeconds: 0}), this.zeroLogic(currentSession + 1);
          }
          break;
        case "session-decrement":
          if (currentSession - 1 > 0) {
            this.setState({ sessionLength: currentSession - 1 })
            if (label === "Session") this.setState({sessionMinutes: currentSession - 1, sessionSeconds: 0}), this.zeroLogic(currentSession - 1);
          }
          break;
        case "break-increment":
          if (currentBreak + 1 < 61) {
            this.setState({ breakLength: currentBreak + 1 })
            if (label === "Break") this.setState({sessionMinutes: currentBreak + 1, sessionSeconds: 0}), this.zeroLogic(currentBreak + 1);
          }
          break;
        case "break-decrement":
          if (currentBreak - 1 > 0) {
            this.setState({ breakLength: currentBreak - 1 })
            if (label === "Break") this.setState({sessionMinutes: currentBreak - 1, sessionSeconds: 0}), this.zeroLogic(currentBreak - 1);
          }
          break;
        default:
          break;
      }
    }
  }

  render() {
    return (
      <div>
        <Break bl={this.state.breakLength} ids={this.incrementDecrementClick} />
        <Session sl={this.state.sessionLength} ids={this.incrementDecrementClick} />
        <Timer
          minLessThanTen={this.state.minLessThanTen}
          secLessThanTen={this.state.secLessThanTen}
          label={this.state.timerLabel}
          timerMinutes={this.state.sessionMinutes}
          timerSeconds={this.state.sessionSeconds}
        />
        <Controls playPause={this.startPauseClick} reset={this.resetClick} />
        <audio id="beep" src="https://www.myinstants.com/media/sounds/victory-fanfare-ffvii.mp3"></audio>
      </div>
    );
  }
}

export default App;
