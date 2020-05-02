import React, { Component } from 'react'
// import cn from 'classnames/bind'
import './timer.component.css'
import TimeLabel from './label.timer.component';
import {Card, CardGrid, Div} from "@vkontakte/vkui";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import Headline from "@vkontakte/vkui/dist/components/Typography/Headline/Headline";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
//const cx = cn.bind(styles)

class CountDown extends Component {
    constructor(props) {
        super(props)
        this.count = this.count.bind(this)
        this.state = {
            days: 0,
            minutes: 0,
            hours: 0,
            secounds: 0,
            time_up:""
        }
        this.x = null
        this.deadline = null
    }
    count () {
        var now = new Date().getTime();
        var t = this.deadline - now;
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        this.setState({days, minutes, hours, seconds})
        if (t < 0) {
            clearInterval(this.x);
            this.setState({ days: 0, minutes: 0, hours: 0, seconds: 0, time_up: "Уже идет" })
        }
    }
    componentDidMount() {
        this.deadline = new Date(this.props.time).getTime();

        this.x = setInterval(this.count, 1000);
    }

    render() {
        const { days, seconds, hours, minutes, time_up } = this.state;
        return (
            <CardGrid>
                <Card size="l">
                    <Div>
                    <div className="timer-container">
                        <div className="timer-element">
                            <span className="number">{days}</span>
                            <span className="label"><TimeLabel number={days} type={"days"}></TimeLabel></span>
                        </div>
                        <div className="timer-element">
                            <span className="number">{hours}</span>
                            <span className="label"><TimeLabel number={hours} type={"hours"}></TimeLabel></span>
                        </div>
                        <div className="timer-element">
                            <span className="number">{minutes}</span>
                            <span className="label"><TimeLabel number={minutes} type={"minutes"}></TimeLabel></span>
                        </div>
                        <div className="timer-element">
                            <span className="number">{seconds}</span>
                            <span className="label"><TimeLabel number={seconds} type={"seconds"}></TimeLabel></span>
                        </div>
                    </div>
                    </Div>
                </Card>
            </CardGrid>

        )
    }
}

export default CountDown