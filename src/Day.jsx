import React from "react";

class Day extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidUpdate() {
        
    }

    render() {
    
        if (this.props.sum === null) {
            return (
                <div className="day-container">

                </div>
            )
        }
        
        const activities = [];
        if (this.props.sum) {
            const limit = this.props.sum.length < 4 ? this.props.sum.length : 5;
            for (let i = 0; i < limit; i++) {
                const object = this.props.sum[i];
                if (object) {
                    activities.push(<p className ='event' key={object.id}>{object.summary}</p>)
                }
                
            }
        }
        
        return (
            <div className="day-container">
                <h4 className = 'day-heading'>{this.props.day}</h4>
                {activities}
            </div>
        )
    }
}

export default Day;