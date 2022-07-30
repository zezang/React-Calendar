import React from "react";
import Day from './Day.jsx'

class Week extends React.Component {
    constructor(props) {
        super(props);
        this.slice = null;
        this.data = {};
    }

    initChild = () => {
        this.slice = this.props.info[this.props.row];
        for (let i = 0; i < 5; i++) {
            this.data[i] = this.slice[i]
        }
    }

    componentDidUpdate() {
        this.initChild()
    }

    render() {
        const days = [];
        for (let i = 0; i < 5; i++) {
            if(this.data[i] === null) days.push(<Day row={this.props.row} key={`Day${(this.props.row + 1) * (i + 1)}`} info={this.slice} col={i} contents={null}></Day>)
            else {
                days.push(<Day row={this.props.row} key={`Day${(this.props.row + 1) * (i + 1)}`} info={this.slice} col={i} contents={this.data[i]}></Day>)
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