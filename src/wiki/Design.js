import React, {Component} from 'react'
import Research from "./Research";

class Design extends Component {
    render () {

        return (
            <div>
                <div>
                    <h3> Design Description</h3>
                    <body>
                    The class Diagram include users and Domain. The user have several sub-class, Fitness Coach who can offer technical support
                    for fitness online, Activity leader who create Activity, and other user can join activity and   be the activity member. Each
                    of users can follow each other and send messages. In the Domain side, Club include health product and activity. User can buy health
                    product online in particular club, and they also can join activity in this club.  When User located their area, The System send data
                    to google map API to find nearest fitness Club and send back to user, user can write reviews for this  club.
                    </body>
                <a href="http://docs.wixstatic.com/ugd/ade6b1_2acf00fc15c54828b363c5cd06daf24e.pdf">
                  PDF Link  </a>
                </div>
                <h3> Class Diagram</h3>
                <img src="https://dl.dropboxusercontent.com/s/hqyngweko6e3mfj/project%20Design%20Digram_Page_1.png"
                     width="1920" height="1080"/>
                <h3> Sequence Diagram</h3>
                <img src="https://dl.getdropbox.com/s/apc0wkm2rbefpzq/project%20Design%20Digram_Page_2.png"
                     width="1920" height="1080"/>

                <img src="https://dl.getdropbox.com/s/v93nq5zc1cdorp8/project%20Design%20Digram_Page_3.png"
                     width="1920" height="1080"/>

                </div>

        )
    }



}
export default Design;