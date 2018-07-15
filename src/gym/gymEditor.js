import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"
const yelpApiKey = 'QpvQ6MkGeowXumpiefvYSloMnSCAQVa5ePt4FlNHwqHwc1GFUsKEkmMYbu54y4mprD-7xN-KdhX1sRO4OKLUb2jgf-Schxp3M_cBTZpL8yLRkdLO30GvKQGl03RIW3Yx'
'use strict';
const googleApiKey="key=AIzaSyBNnXpT4ySe4hEhQz53oaPFYzb4SamkDAw"
const yelp = require('yelp-fusion');

const client = yelp.client(yelpApiKey);

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?"+googleApiKey+"&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` ,width:'400px'}} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>

    <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: props.onPosition.latitude, lng: props.onPosition.longitude}}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.onPosition.latitude, lng: props.onPosition.longitude }} onClick={props.onMarkerClick} />}
    </GoogleMap>,


)


class gymEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gymId:'',
            gym: {},
            reviews: [],
            isMarkerShown: false,
        }



    }


    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 1000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    setGym(GYM) {
        console.log("gym detail "+ JSON.stringify(GYM))
        this.setState({gym: GYM})
        console.log("gym location" + JSON.stringify(GYM.coordinates))

    }
    setGymId(gymid){
        console.log("id " +gymid)
        this.setState({gymId:gymid})
    }

    setReviews(Reviews) {
        console.log("reviews "+ JSON.stringify(Reviews))
        this.setState({reviews: Reviews})

    }





    componentDidMount() {

       this.setGymId( this.props.match.params.id);
        this.yelpBusinessDetailFetch(this.props.match.params.id);
        this.delayedShowMarker()

    }


    yelpBusinessDetailFetch(id) {


        client.business(id).then(response => {
            console.log(response);
            this.setGym(response.jsonBody)
        }).catch(e => {
            console.log(e);
        });

        client.reviews(id).then(response => {
            console.log(response);
            this.setReviews(response.jsonBody.reviews)
        }).catch(e => {
            console.log(e);
        });




    }

    renderReviews(review,key){
         return(

             <div key={key}>
                 <li style={{padding:10}}>
                     <img className="card-img-top"
                          src={review.user.image_url}
                          alt="Card image cap"
                          style={{
                              margin: 20,
                              height:100,
                              width: 100,
                              marginBottom: 20,
                              borderRadius: 10
                          }}
                     />

                 {review.text}
                 </li>
             </div>

         )
    }
    renderMap(){

        if(this.state.gym.coordinates!== undefined){
            return(
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                onPosition={this.state.gym.coordinates}

            />
            )
        }
    }


    render(){


        console.log("render gym location" + JSON.stringify(this.state.gym.coordinates))
       return(
           <div>

           <img className="card-img-top"
                src={this.state.gym.image_url}
                alt="Card image cap"
                style={{
                    margin: 20,
                    width: 200,
                    marginBottom: 20,
                    borderRadius: 20
                }}
           />
               {this.renderMap()}


            <ul>
               {this.state.reviews.map((review, index) => {
                       return (
                           this.renderReviews(review, index)
                       )
                   }
               )}
            </ul>




           </div>

    )
    }
}

export default gymEditor;