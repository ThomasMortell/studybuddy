import React, {Component} from 'react';
import notes from "../images/notes.jpg";
import text from "../images/text.jpg";
import code from "../images/code.jpg";
import library from "../images/library.jpg";
import library1 from "../images/library1.jpg";
import banner from "../images/study.jpg";
import students from "../images/students.jpg";

import calendar from "../images/calendar.jpg";

class AboutUs extends Component {
  render() {
    return(
      <div className="container">
        <div className="row box-header">
          <h1>Welcome to Study Buddy!</h1>
          <p className="aboutus-p">
            Study Buddy is a platform designed to make it easier for university students to
            connect, share their knowledge, work together and keep on top of their study schedule.
          </p>
          <img className="circle responsive-img drop-shadow" src={banner} alt="" width="400px" height="400px"></img>
        </div>

        <div className="row box">
          <div className="col s12 m12 l7 content">
            <h2>Join Study Groups</h2>
            <p className="aboutus-p">
              Join study groups to connect with other
              students undertaking the same modules as you and start studying together.
            </p>
          </div>
          <div className="col s12 m12 l5 imgBx">
            <img className="responsive-img circle drop-shadow" src={students} alt="" width="400px" height="400px"></img>
          </div>
        </div>

        <div className="row box">
          <div className="col s12 m12 l5 imgBx">
            <img className="responsive-img circle drop-shadow" src={text} alt="" width="400px" height="400px"></img>
          </div>
          <div className="col s12 m12 l7 content">
            <h2>Message Your Group</h2>
            <p className="aboutus-p">
              Are you struggling with a topic or have questions that your peers
              can answer? Message your group to start a discussion.
            </p>
          </div>
        </div>

        <div className="row box">
          <div className="col s12 m12 l7 content">
            <h2>Organise Your Time</h2>
            <h5>(Coming Soon)</h5>
            <p className="aboutus-p">
              Use the calendar to set events for your group to meet and study
              together, post when assignments are due or display upcoming
              academic holidays.
            </p>
          </div>
          <div className="col s12 m12 l5 imgBx">
            <img className="responsive-img circle drop-shadow" src={calendar} alt="" width="400px" height="400px"></img>
          </div>
        </div>

        <div className="row box">
          <div className="col s12 m12 l5 imgBx">
            <img className="responsive-img circle drop-shadow" src={notes} alt="" width="400px" height="400px"></img>
          </div>
          <div className="col s12 m12 l7 content">
            <h2>Upload Notes</h2>
            <h5>(Coming Soon)</h5>
            <p className="aboutus-p">
              Share lecture notes or other useful media to help your group or catch up on work.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutUs
