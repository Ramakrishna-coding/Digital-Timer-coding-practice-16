import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeInSeconds: 0,
      isRunningTime: false,
      timeInMinutes: 25,
    }
    console.log('constructor called')
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
    console.log('componentDidMount called')
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
    console.log('componentWillUnmount called')
  }

  tick = () => {
    const {timeInSeconds, timeInMinutes, isRunningTime} = this.state
    if (isRunningTime) {
      if (timeInSeconds === 0 && timeInMinutes !== 0) {
        this.setState({
          timeInSeconds: 59,
          timeInMinutes: timeInMinutes - 1,
          isRunningTime: true,
        })
      } else if (timeInSeconds === 0 && timeInMinutes === 0) {
        this.setState({
          timeInSeconds: 0,
          timeInMinutes: 0,
          isRunningTime: false,
        })
      }
      if (timeInMinutes === 0 && timeInSeconds !== 0) {
        this.setState({
          timeInSeconds: timeInSeconds - 1,
        })
      }
    }
  }

  toggleStartButton = () => {
    const {isRunningTime} = this.state
    this.setState({isRunningTime: !isRunningTime})
  }

  toggleResetButton = () => {
    this.setState({
      timeInMinutes: 25,
      timeInSeconds: 0,
      isRunningTime: false,
    })
  }

  decreaseCountButton = () => {
    const {timeInMinutes} = this.state
    this.setState({timeInMinutes: timeInMinutes > 0 ? timeInMinutes - 1 : 0})
  }

  increaseCountButton = () => {
    const {timeInMinutes} = this.state
    this.setState({timeInMinutes: timeInMinutes + 1})
  }

  render() {
    const {timeInSeconds, isRunningTime, timeInMinutes} = this.state
    console.log('render called')
    const buttonImg = isRunningTime
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isRunningTime ? 'pause icon' : 'play icon'
    const startText = isRunningTime ? 'Pause' : 'Start'

    const stringifiedMinutes =
      timeInMinutes > 9 ? timeInMinutes : `0${timeInMinutes}`
    const stringifiedSeconds =
      timeInSeconds > 9 ? timeInSeconds : `0${timeInSeconds}`

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="box">
          <div className="bg-img">
            <div className="bg-white">
              <h1 className="time">
                {`${stringifiedMinutes}:${stringifiedSeconds}`}
              </h1>
              <p className="is-running">
                {isRunningTime ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="time-container">
            <div className="start-reset-box">
              <div className="item-box">
                <button
                  type="button"
                  className="button"
                  onClick={this.toggleStartButton}
                >
                  <img src={buttonImg} alt={altText} className="button-img" />
                  <p className="start-reset">{startText}</p>
                </button>
              </div>
              <div className="item-box">
                <button
                  type="button"
                  className="button"
                  onClick={this.toggleResetButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="button-img"
                  />
                  <p className="start-reset">Reset</p>
                </button>
              </div>
            </div>
            <p className="limit-text">Set Timer Limit</p>
            <div className="time-limit-box">
              <button
                className="change-time-count"
                type="button"
                onClick={!isRunningTime && this.decreaseCountButton}
              >
                -
              </button>
              <p className="time-count">{stringifiedMinutes}</p>
              <button
                className="change-time-count"
                type="button"
                onClick={!isRunningTime && this.increaseCountButton}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
