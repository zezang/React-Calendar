import React from "react";

class Day extends React.Component {
    constructor(props) {
        super(props);

        this.day = null;
        this.events = [];
    }

    initChild = () => {
        console.log(this.props.contents)
        if (this.props.contents) {
            this.day = new Date(this.props.contents[0]).getDate();
            this.events = [];
            this.props.contents[1].forEach(object => {
                this.events.push(object.summary)
            })
        }
        // this.day = new Date(this.props.contents[0]).getDate()
        console.log(this.events)
    }

    componentDidUpdate() {
        this.initChild()
    }

    render() {
        if (this.props.contents === null) {
            return (
                <div className="day-container">
                    
                </div>
            )
        }
        const activities = [];
        const limit = this.events.length < 4 ? this.events.length : 5;
        for (let i = 0; i < limit; i++) {
            activities.push(<p className ='event'>{this.events[i]}</p>)
        }
        return (
            
            <div className="day-container">
                <h4 className = 'day-heading'>{this.day}</h4>
                {activities}
            </div>
        )
    }
}

export default Day;