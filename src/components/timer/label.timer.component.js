import React, {PureComponent} from 'react';
class TimeLabel extends PureComponent {
    constructor(props) {
        super(props);
        this.compute = this.compute.bind(this);
        this.state = {
            label: ' '
        }
        this.x = '';
    }

    compute() {
        if ((this.props.number <= 19) && (this.props.number >= 10)) {
            switch (this.props.type) {
                case 'hours':
                    this.x = 'Часов';
                    break;
                case 'seconds':
                    this.x = 'Секунд';
                    break;
                case 'minutes':
                    this.x = 'Минут';
                    break;
                case 'days':
                    this.x = 'Дней';
                    break;
            }

        } else {
            switch (this.props.type) {
                case 'hours':
                    if (this.props.number % 10 == 1) {
                        this.x = 'Час';
                    } else if ((this.props.number % 10 == 2) || (this.props.number % 10 == 3) || (this.props.number % 10 == 4)) {
                        this.x = 'Часа';
                    } else {
                        this.x = 'Часов';
                    }
                    break;
                case 'seconds':
                    if (this.props.number % 10 == 1) {
                        this.x = 'Секунда';
                    } else if ((this.props.number % 10 == 2) || (this.props.number % 10 == 3) || (this.props.number % 10 == 4)) {
                        this.x = 'Секунды';
                    } else {
                        this.x = 'Секунд';
                    }
                    break;
                case 'minutes':
                    if (this.props.number % 10 == 1) {
                        this.x = 'Минута';
                    } else if ((this.props.number % 10 == 2) || (this.props.number % 10 == 3) || (this.props.number % 10 == 4)) {
                        this.x = 'Минуты';
                    } else {
                        this.x = 'Минут';
                    }
                    break;
                case 'days':
                    if (this.props.number % 10 == 1) {
                        this.x = 'День';
                    } else if ((this.props.number % 10 == 2) || (this.props.number % 10 == 3) || (this.props.number % 10 == 4)) {
                        this.x = 'Дня';
                    } else {
                        this.x = 'Дней';
                    }
                    break;
            }
        }
        this.state.label = this.x;
    }


    render() {
        this.compute();
        return (
            <div>{this.state.label}</div>
        )
    }
}
export default TimeLabel