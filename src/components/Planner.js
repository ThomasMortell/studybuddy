import React from 'react';
import moment from 'moment';

export default class Calendar extends React.Component {
	state = {
		dateContext: moment(),
		today: moment(),
		showYearPopup: false
	}
	
	weekdays = moment.weekdays();
	months = moment.months();
	
	year = () => {
		return this.state.dateContext.format("Y");
	}
	
	month = () => {
		return this.state.dateContext.format("MMMM");
	}
	
	daysInMonth = () => {
		return Number(this.state.dateContext.daysInMonth());
	}
	
	currentDate = () => {
		return this.state.dateContext.get("date");
	}
	
	currentDay = () => {
		return this.state.dateContext.format("D")
	}
	
	firstDayOfMonth = () => {
		let dateContext = this.state.dateContext;
		let firstDay = moment(dateContext).startOf('month').format('d');
		return Number(firstDay);
	}
	
	render(){
		var sent = "";
		var val = "";

		for(let i=1; i<= Math.ceil((this.firstDayOfMonth()+this.daysInMonth())/7)*7; i++){
			
			if((i-this.firstDayOfMonth()<1)||(i-this.firstDayOfMonth()>this.daysInMonth())){
				val = "";
			}
			
			else{
				val = i-this.firstDayOfMonth();
			}
			
			if(i%7===1){
				sent += "<tr><td>"+val+"</td>";
			}
			
			else if(i%7===0){	
				sent +=	"<td>"+val+"</td></tr>";
			}
			
			else{
				sent += "<td>"+val+"</td>";
			}			
		}
	
		return(
			<div className = "calander_container">
				<table className ="calendar">
					<thead>
						<tr className = "calendar-header1">
							<th>
								{this.months.indexOf(this.month())+1}
							</th>
							<th colSpan="4">
								{this.month()}
							</th>
							<th colSpan ="2">
								{this.year()}
							</th>
						</tr>
						<tr className = "calendar-header2">
							<th>Sunday</th>
							<th>Monday</th>
							<th>Tuesday</th>
							<th>Wednesday</th>
							<th>Thursday</th>
							<th>Friday</th>
							<th>Saturday</th>
						</tr>
					</thead>
					<tbody className = "calendar-body" dangerouslySetInnerHTML={{__html: sent}}>
					</tbody>
				</table>
			</div>
		);
	}
};