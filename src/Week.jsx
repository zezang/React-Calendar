import React from "react";
import Day from './Day.jsx'

class Week extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidUpdate() {
        // console.log(this.props.info[0])
    }
    render() {
        //conditional render if this.props.info is not undefined
        const days = [];
        if (this.props.info) {
            for (let i = 0; i < 5; i++) {
                let dayProp;
                let sumProp;
                if (this.props.info[i]) {
                    dayProp = new Date(this.props.info[i][0]).getDate();
                    sumProp = this.props.info[i][1];
                }
                days.push(<Day row={this.props.row} key={`Day${(this.props.row + 1) * (i + 1)}`} col={i} info= {this.props.info[i]} day={dayProp} sum={sumProp}></Day>)
            }
        }

        return(
            <div className="week">
                <div className="week-heading">{this.props.text}</div>
                {days}
            </div>
        )
    }
}

export default Week