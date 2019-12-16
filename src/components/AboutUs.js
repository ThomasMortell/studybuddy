import React, {Component} from 'react';
import group from "../images/study group.jpg";
import study from "../images/study.jpg";
import notes from "../images/notes.jpg";
import text from "../images/text.jpg";
import code from "../images/code.jpg";
import library from "../images/library.jpg";
import library1 from "../images/library1.jpg";
import banner from "../images/study.jpg";

import calendar from "../images/calendar.jpg";

class AboutUs extends Component {
  render() {
    return(
<div className="container">
<div className="row box-header">
<h1>Welcome to Study Buddy!</h1>
<p>This is what it's all about</p>
<img className="circle responsive-img drop-shadow" src={banner} alt="studybuddy logo of an
  apple on top of books cartoonized" width="400px" height="400px">
</img>
</div>

      <div className="row box">
            <div className="col l7 content">
              <h2>Join Study Groups!</h2>
              <p>sdgfliueagfliuea</p>
            </div>
            <div className="col l5 imgBx">
              <img className="responsive-img circle drop-shadow" src={group} alt="studybuddy logo of an
                apple on top of books cartoonized" width="400px" height="400px">
              </img>
            </div>
            </div>

<div className="row box">
      <div className="col l5 imgBx">
        <img className="responsive-img circle drop-shadow" src={text} alt="studybuddy logo of an
          apple on top of books cartoonized" width="400px" height="400px">
        </img>
      </div>
      <div className="col l7 content">
        <h2>Start A Discussion</h2>
        <p>sdgfliueagfliuea</p>
      </div>
      </div>

      <div className="row box">
      <div className="col l7 content">
        <h2>Schedule Meetings</h2>
        <p>sdgfliueagfliuea</p>
      </div>
              <div className=" col l5 imgBx">
                <img className="responsive-img circle drop-shadow" src={calendar} alt="studybuddy logo of an
                  apple on top of books cartoonized" width="400px" height="400px">
                </img>
              </div>
        </div>

    <div className="row box">
            <div className="col l5 imgBx">
              <img className="responsive-img circle drop-shadow" src={notes} alt="studybuddy logo of an
                apple on top of books cartoonized" width="400px" height="400px">
              </img>
            </div>
            <div className="col l7 content">
              <h2>Upload Notes</h2>
              <p>sdgfliueagfliuea</p>
            </div>
      </div>

</div>
    )
  }
}

export default AboutUs
