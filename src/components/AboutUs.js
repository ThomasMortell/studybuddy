import React, {Component} from 'react';
import group from "../images/study group.jpg";
import study from "../images/study.jpg";
import notes from "../images/notes.jpg";
import text from "../images/text.jpg";
import code from "../images/code.jpg";
import library from "../images/library.jpg";
import library1 from "../images/library1.jpg";
import aboutbanner from "../images/aboutbanner.png";

import calendar from "../images/calendar.jpg";

class AboutUs extends Component {
  render() {
    return(
<div className="container background-about">
<div className="row space-top">
<div className="container-img">
<img className="aboutbanner" src={aboutbanner} alt="studybuddy logo of an
  apple on top of books cartoonized" width="auto" height="200px">
</img>
<div class="top-right">Top Right</div>
</div>
      </div>

      <div className="row box">
            <div className="imgBx">
              <img className="" src={group} alt="studybuddy logo of an
                apple on top of books cartoonized" width="auto" height="200px">
              </img>
            </div>
            <div className="content">
              <h2>Join Study Groups!</h2>
              <p>sdgfliueagfliuea</p>
            </div>
            </div>

<div className="row box">
      <div className="imgBx">
        <img className="" src={text} alt="studybuddy logo of an
          apple on top of books cartoonized" width="auto" height="200px">
        </img>
      </div>
      <div className="content">
        <h2>Start A Discussion</h2>
        <p>sdgfliueagfliuea</p>
      </div>
      </div>

      <div className="row box">
              <div className="imgBx">
                <img className="" src={calendar} alt="studybuddy logo of an
                  apple on top of books cartoonized" width="auto" height="200px">
                </img>
              </div>
              <div className="content">
                <h2>Schedule Meetings</h2>
                <p>sdgfliueagfliuea</p>
              </div>
        </div>

    <div className="row box">
            <div className="imgBx">
              <img className="" src={notes} alt="studybuddy logo of an
                apple on top of books cartoonized" width="auto" height="200px">
              </img>
            </div>
            <div className="content">
              <h2>Upload Notes</h2>
              <p>sdgfliueagfliuea</p>
            </div>
      </div>

</div>
    )
  }
}

export default AboutUs
