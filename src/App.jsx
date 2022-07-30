import React from "react";
import Week from './Week.jsx';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().toLocaleString('default', {month: 'long'});
        this.csDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];
        this.dayHash = {
            'Monday': 1,
            'Tuesday': 2,
            'Wednesday': 3,
            'Thursday': 4,
            'Saturday': 5
        }

        this.state = {
            calendar: null,
            month: this.currentMonth,
            schedule: [],
            numWeeks: 0,
            weeks: null
        }
    }

    async getData() {  
        fetch('http://slack-server-production.us-west-2.elasticbeanstalk.com/calendar/PTRI/8')
        .then(response => response.json())
        .then(data => {
            //filter the data based on entries that are of the same year
            const calendar = Object.entries(data).filter(array => {
                const dateObj = new Date(array[0]);
                return dateObj.getFullYear() <= this.currentYear;
            });
            //update the class's calender property to the filtered data
            this.setState({calendar: calendar})
            //filter the calendar further by only gathering items that are of the current month, update the schedule property of state
            const schedule = calendar.filter(array => {
                const dateObj = new Date(array[0]);
                return dateObj.toLocaleString('default', {month: 'long'}) === this.state.month;
            })
            this.setState({schedule: schedule});
            //get the number of weeks in the current schedule. should be last day - first day/7 
            const firstDay = new Date(schedule[0][0]).getDate(); const lastDay = new Date(schedule[schedule.length - 1][0]).getDate()
            const numWeeks = Math.ceil((lastDay - firstDay + 1) / 7);
            this.setState({numWeeks: numWeeks});
            //update the weeks property of state
            //first declare weeks variable and set it equal to a 2D matrix mxn, with m = number of weeks and n = 5
            const weeks = Array(numWeeks).fill(Array(5).fill(null));
            this.setState({weeks: weeks});
            
            let start = 0;
            let idx = 0;
            while (idx < schedule.length) {
                let event = schedule[idx];
                const day = new Date(event[0]).toLocaleString('en-us', {weekday:'long'});
                if (this.dayHash[day]) {
                    //deep clone the state's weeks array
                    const weekClone = JSON.parse(JSON.stringify(this.state.weeks));
                    //update the appropriate cell in the 2d matrix
                    weekClone[start][this.dayHash[day] - 1] = event;
                    this.setState({weeks: weekClone})
                    //if the hashed value is 5, that means we reached the end of a week and reset the start variable
                    if (this.dayHash[day] === 5) ++start;
                }
                ++idx;
            }
            // console.log(this.state)
        });
    }

    componentDidMount() {
        this.getData();
        // console.log(this.state)
    }

    render () {
        //create day headers for the calendar (mon, tue, wed, etc)
        const dayHeaders = [];
        for (const day of this.csDays) {
            dayHeaders.push(<div className = "day-header">{day}</div>)
        }
        //push the numWeeks number of Week components into the array
        const weeks = [];

        for (let i = 0; i < this.state.numWeeks; i++) {
            weeks.push(<Week month={this.state.month} key={`week${i}`} text= {`Week ${i + 1}`} row={i} info={this.state.weeks}></Week>)
        }
        return (
            <div className="Title">
                <h1 className="title-heading">{`Calendar for ${this.state.month}, ${this.currentYear}`}</h1>
                <div className="day-header-wrapper">{dayHeaders}</div>
                <div className="week-wrapper">{weeks}</div>
            </div>
        ) 
    }
}

export default App;