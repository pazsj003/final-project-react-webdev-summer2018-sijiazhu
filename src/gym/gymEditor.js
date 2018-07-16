import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"
import yelp from '../Api/yelp'
const yelpApiKey = 'QpvQ6MkGeowXumpiefvYSloMnSCAQVa5ePt4FlNHwqHwc1GFUsKEkmMYbu54y4mprD-7xN-KdhX1sRO4OKLUb2jgf-Schxp3M_cBTZpL8yLRkdLO30GvKQGl03RIW3Yx'
'use strict';
const googleApiKey="key=AIzaSyBNnXpT4ySe4hEhQz53oaPFYzb4SamkDAw"
// const yelp = require('yelp-fusion');

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
            gymId: '',
            gym: {},
            reviews: [],
            isMarkerShown: false,
            location: [],
            photos:[]


        }
        this.renderAddress=this.renderAddress.bind(this);
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
        this.setState({location: GYM.location.display_address})
        this.setPhotos(GYM.photos)
        console.log("gym location" + JSON.stringify(GYM.coordinates))

    }
    setGymId(gymid){
        console.log("id " +gymid)
        this.setState({gymId:gymid})
    }

    setReviews(Reviews) {

        this.setState({reviews: Reviews})

    }
    setPhotos(Photos){
        this.setState({photos:Photos})
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
    renderRate(rate) {
        switch (rate) {
            case 1:

            case 2:
                return ([

                        <span className="fa fa-star "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,
                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}
                        />,

                    ]
                )
                break;
            case 2.5:
                return ([

                        <span className="fa fa-star "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star-half-full "
                              style={Styles.twoStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}
                        />,

                    ]
                )
                break;


            case 3:
                return ([

                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}
                        />,

                    ]
                )
                break;
            case 3.5:
                return ([

                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.threeStarChecked}/>,
                        <span className="fa fa-star-half-empty"
                              style={Styles.threeStarChecked}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}/>,

                    ]
                )
                break;
            case 4:
                return ([

                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,

                        <span className="fa fa-star "
                              style={Styles.uncheck}
                        />,

                    ]
                )
                break;

            case 4.5:
                return ([

                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fourStarChecked}/>,

                        <span className="fa fa-star-half-full "
                              style={Styles.fourStarChecked}
                        />,

                    ]
                )
                break;


            case 5:
                return ([

                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}/>,
                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}/>,

                        <span className="fa fa-star "
                              style={Styles.fiveStarChecked}
                        />,

                    ]
                )
                break;
        }

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
    renderAddress(gym) {


        if(undefined!==gym.location) {
            return (
                <div>

                <p className="card-text"
                    style={{margin: 5}}
                >
                    {gym.location.display_address[0]}</p>
                    <p className="card-text"
                        style={{margin: 5}}
                    >
                        {gym.location.display_address[1]}</p>
                    <p className="card-text"
                        style={{margin: 5}}
                    >
                        {this.state.gym.phone}</p>
                    </div>
            )
        }

    }
    renderImage(photo,index){
        return(
            <li>
                <img className="card-img-top"
                     src={photo}
                     alt="Card image cap"
                     style={{
                         width: 200,
                         marginBottom: 20,
                         borderRadius: 20
                     }}
                />
            </li>
        )
                }



    render(){



       return(
           <div>

               <div className="row">
                   <div className="col-lg-2" style={{width: '18rem'}}>
                       <img className="card-img-top"
                            src={this.state.gym.image_url}
                            alt="Card image cap"
                            style={{
                                width: 200,
                                marginBottom: 20,
                                borderRadius: 20
                            }}
                       />
                   </div>

                   <div className=" col-4">

                       {this.state.gym.name}

                       <div style={{paddingTop: 10}}>
                           {this.renderRate(this.state.gym.rating)}
                       </div>

                   </div>

                   <div className=" col-4">

                       {this.renderAddress(this.state.gym)}



                   </div>


               </div>
               {this.renderMap()}
               <ul>
                   {this.state.photos.map((photo,index)=> {
                           return (
                               this.renderImage(photo, index)
                           )
                       }


                   )}
               </ul>

               {this.renderImage()}


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


const Styles = {
    gymName: {
        fontSize: 20
    },

    fiveStarChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#B22222',
        background: '#B22222',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },

    fourStarChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#ff4d4d',
        background: '#ff4d4d',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },

    threeStarChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#ff8000',
        background: '#ff8000',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },

    twoStarChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#ffbf00',
        background: '#ffbf00',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },


    uncheck: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: 'lightGray',
        background: 'lightGray',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'
    },

    halfChecked: {
        margin: 2,
        padding: 3,
        border: '1px solid',
        borderColor: '#B22222',
        background: '#B22222',
        borderRadius: '5px',
        fontSize: '120%',
        color: 'white'

    },

};