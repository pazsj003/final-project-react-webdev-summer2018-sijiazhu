import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import Fitness from "@material-ui/icons/FitnessCenter";
// core components
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import NavPills from "../components/NavPills/NavPills.jsx";
import Parallax from "../components/Parallax/Parallax.jsx";

import profile   from "../assets/img/faces/user01.png";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {  Switch } from "react-router";

import GymPostCreator from "../Widget/GymPostCreator";
import GymPostReader from "../Widget/GymPostReader";







import profilePageStyle from "../assets/jss/material-kit-react/views/profilePage.jsx";
import UserServiceClient from "../Service/UserServiceClient";
import PostServiceClient from "../Service/PostServiceClient";
import GymServiceClient from "../Service/GymServiceClient";



import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"
import yelp from './yelp'
const yelpApiKey = 'QpvQ6MkGeowXumpiefvYSloMnSCAQVa5ePt4FlNHwqHwc1GFUsKEkmMYbu54y4mprD-7xN-KdhX1sRO4OKLUb2jgf-Schxp3M_cBTZpL8yLRkdLO30GvKQGl03RIW3Yx'
'use strict';
const googleApiKey="key=AIzaSyBNnXpT4ySe4hEhQz53oaPFYzb4SamkDAw"
// const yelp = require('yelp-fusion');

const client = yelp.client(yelpApiKey);

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?"+googleApiKey+"&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div

            style={{
                height: `100%`,
                margin: '20px',
                // borderRadius: '25px',

            }} />,
        containerElement: <div

            style={{
                height: `500px` ,
                width:'500px',
                margin: '20px',



            }} />,
        mapElement: <div

            style={{
                height: `100%`,
                borderStyle: 'solid',
                borderColor: '#DCDCDC',
                borderWidth: '1px',
                borderRadius: '25px',
                // margin: '20px',

            }} />,
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


const img =profile

class gymPage extends React.Component {

    constructor(props) {
        super(props);


        this.state = {

            checkself:false,
            authorization:false,
            coachOnly:false,
            SearchUser:{},
            profile:"",
            cardAnimaton: "cardHidden",
            User:{},
            name:'',
            posts:[],
            gymId: '',
            gym: {},
            reviews: [],
            gymIdList:[],
            readable:false,
            isMarkerShown: false,
            location: [],
            photos:[]
        };

        this.setUser=this.setUser.bind(this);
        this.checkprofile=this.checkprofile.bind(this);
        this.renderAddress=this.renderAddress.bind(this);
        this.gymServiceClient=GymServiceClient.instance
        this.userServiceClient=UserServiceClient.instance;
        this.postServiceClient=PostServiceClient.instance;

    }

    componentDidMount() {
        this.setGymId( this.props.match.params.id);
        this.readProfile();

        this.yelpBusinessDetailFetch(this.props.match.params.id);
        this.delayedShowMarker()

    }

//********************gym fucntion
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

    findAllGyms(user){
        // this.setState({gyms:gymclear}) ;

        this.gymServiceClient
            .findAllGymsForUser(user.id)
            .then(response=>this.setGymsIdList(response,user));


    }

    setGymsIdList(gymlist,user){

        console.log("set gym list  " + JSON.stringify(gymlist));
        this.setState({gymIdList:gymlist},
            ()=>{
                this.setUser(user);
        });

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
        const { classes, ...rest } = this.props;
        return(

            <div key={key}>
                <li style={{
                    padding:10,
                    listStyle:'none'


                }}>
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
                    {review.user.name}
                    <br/>
                    <div
                        style={{

                            // marginTop: '100px',
                            // marginLeft: '50px',
                            borderRadius: '15px',
                            borderStyle: 'solid',
                            borderColor: '#DCDCDC',
                            borderWidth: '1px'

                        }}
                    >

                    {review.time_created}

                    <p>
                        {this.renderRate(review.rating)}
                    </p>


                    <div
                        style={{
                            textAlign: 'left'
                        }}
                        className={classes.description}>

                    {review.text}
                    </div>
                    </div>
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
            <li
                style={{

                    listStyle:'none',
                }}
            >
                <img className="card-img-top"
                     src={photo}
                     alt="Card image cap"
                     style={{
                         width: 400,

                         marginTop: 20,
                         marginBottom: 20,
                         borderRadius: 20
                     }}
                />
            </li>
        )
    }















//******************** user fucntion


    goToFriends(){
        this.props.history.push(`/userpage/${this.state.User.id}/friends`)
    }
    goToGyms(){
        this.props.history.push(`/userpage/${this.state.User.id}/gyms`)
    }



    logout(){
        this.userServiceClient
            .logout()
    }


    setUser(user){
        this.setState({readable:false});
        this.setState({coachOnly:false})
        console.log("user login " + JSON.stringify(user));
        var Name=user.firstName+' ' +user.lastName ;
        this.setState({User:user})
        this.setState({name:Name})
        this.updateProfileImg(user.profileimg);

            console.log(" coach checj gyms " + JSON.stringify(user))
            var IdList = this.state.gymIdList;
            console.log(" current gymId " + this.state.gymId)
            console.log(" coach checj gymsList " + JSON.stringify(this.state.gymIdList))


            for(let i =0; i<IdList.length;i++ ){

                if(IdList[i].gymId === this.state.gymId){
                   // enrolled
                    this.setState({readable:true});
                    if(user.role === 'coach'){
                    console.log(" coach mode editor " );
                    this.setState({coachOnly:true})

                }
                // else{
                //      console.log(" coach mode editor no! " )
                //      //normal user   can see post
                //
                //      this.setState({coachOnly:false})
                //     }
                    break;
                }

            }







        this.readPost();


    }
    updateForm(newState){
        this.setState(newState);
    }

    deletePostCB =(postId)=>{

        this.postServiceClient
            .deletePost(postId)
            .then(()=>this.readPost())
    }

    renderPost(post, key){


        if(post!=null){
            const { classes, ...rest } = this.props;

            var checkself=false;

            if(post.postuserId === this.state.User.id){
                checkself=true;
            }




            return(

                <GridContainer


                    key={key} justify="center">
                    <div
                        style={{paddingTop: '10px'}}
                        className={classes.container}>

                        <GymPostReader
                            Gym ={this.state.gym}
                            deleteCallBack={this.deletePostCB}
                            checkSelf={checkself}
                            Post={post}
                            User ={this.state.User}
                        />

                    </div>

                </GridContainer>
            )
        }
    }

    updateProfileImg(event){
        console.log("profile image   "  + event);

        if(event !==null){
            console.log("yes inside " +event);

            this.setState({profile:event});
        }else{

            console.log("yes outside  "  + img);
            this.setState({profile:img});
        }



    }


    searchUser(){
        this.props.history.push(`/usersearch/${this.state.SearchUser.username}`)

    }

    CallBackPost=(post)=>{

        console.log("read Post from callback " + JSON.stringify(post));
        this.setState({posts:[...this.state.posts,post]});

        this.setPost(this.state.posts);
        console.log("new posts after   callback " + JSON.stringify(this.state.posts));


    }

    readPost(){
        console.log("inside read post check user Id " + this.state.User.id);
        console.log("inside post server  post check gym Id " + this.state.gym.id);
        this.postServiceClient
            .findAllPostForGym(this.state.gymId)
            .then(posts=>
                this.checkPost(posts))
    }
    checkPost(posts){

        console.log("check post  the gym" + JSON.stringify(posts));

        if(posts ===404){
            // this.setState({authorization:true});
            console.log("can not see the post because of not enorll the gym")
        }else{
            this.setPost(posts)
        }

    }


    setPost(Posts){
        if(Posts!=null){
            console.log("read Post in profile set post " + JSON.stringify(Posts));

            Posts.sort((a,b)=>b.timeOrder-a.timeOrder);

            console.log("read Post in profile set post after sort" + JSON.stringify(Posts));
            this.setState({posts:Posts})
        }


    }


    backtoprofile(){

        this.props.history.push('/profile')
    }

    readProfile(){
        this.userServiceClient
            .Profile()
            .then(user=>
                this.checkprofile(user)
            )
    }
    checkprofile(user){
        if(user ===401){
            console.log("log out")
            this.props.history.push('/login');

        }else{
            this.findAllGyms(user);


        }
    }

    render() {
        const { classes, ...rest } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
        const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
        return (
            <div>
                <div>
{/***************** NavBar*/}
                    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" to={'/publichome'}>Fitness NetWork</Link>

                            <Link
                                style={{
                                    color: 'white',
                                }}

                                className="nav-link"

                                to={'/gymsearch'}>
                                <Fitness className={classes.inputIconsColor}/>

                            </Link>



                            <ul className="navbar-nav ml-auto ">
                                <li className="nav-item  ">

                                    <input
                                        style={{

                                            height:'33px',
                                            width:'350px'}}

                                        value={this.state.SearchUser.username}
                                        onChange={(event)=>this.updateForm(
                                            {SearchUser:{...this.state.SearchUser,username:event.target.value}})}

                                        className="form-control"
                                        id="firstNameFld"
                                        placeholder="Search"/>


                                </li>


                            </ul>
                            <Button

                                color="transparent"
                                justIcon

                                onClick={()=>this.searchUser()}
                                className={classes.margin5}>
                                <i
                                    style={{
                                        color:'white',


                                    }}
                                    className="fa fa-search" >

                                </i>

                            </Button>




                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Button
                                            style={{
                                                padding: '3px',
                                                borderRadius: '12px',
                                                backgroundColor: 'Transparent',



                                            }}

                                            onClick={()=>this.backtoprofile()}>
                                            <img  className="nav-link"


                                                  src={this.state.profile}
                                                  alt="..."
                                                  style={{
                                                      padding:'1px',
                                                      height: '30px',
                                                      width:'30px',
                                                      borderRadius: '50%'
                                                  }}

                                            />
                                            {this.state.User.firstName}


                                        </Button>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/profilesetting'}>Setting</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={()=>this.logout()}>Log Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
{/***************** background pic and head*/}
                <Parallax small filter image={require("../assets/img/bg01.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <GridContainer
                        style={{

                            marginRight: '100px',
                            marginLeft: '100px',
                            // borderRadius: '25px',
                            // borderStyle: 'solid',
                            // borderColor: '#DCDCDC',
                            // borderWidth: '1px'

                        }}

                        justify="center">
                    <div className="row">
                        <div className="col-3">
                            <GridContainer
                                style={{

                                    marginTop: '100px',
                                    marginLeft: '50px',
                                    borderRadius: '25px',
                                    borderStyle: 'solid',
                                    borderColor: '#DCDCDC',
                                    borderWidth: '1px'

                                }}

                                justify="center">
                                <div
                                    style={{

                                        // marginTop: '100px',
                                        marginRight: '30px',
                                        // borderRadius: '25px',
                                        // borderStyle: 'solid',
                                        // borderColor: '#DCDCDC',
                                        // borderWidth: '1px'

                                    }}

                                    className={classes.container}>
                                    <div className={classes.description}>
                                        Reviews
                                    </div>

                                    <ul>
                                        {this.state.reviews.map((review, index) => {
                                                return (
                                                    this.renderReviews(review, index)
                                                )
                                            }
                                        )}
                                    </ul>

                                </div>

                            </GridContainer>
                        </div>

                    <div className="col-6">
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className={classes.profile}>
                                        <div>
                                            <img  src={this.state.gym.image_url}
                                                  alt="..."
                                                  style={{
                                                      height: '150px',
                                                      width:'150px'
                                                  }}
                                                  className={imageClasses} />
                                        </div>
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>{this.state.gym.name}</h3>


                                        </div>
                                    </div>
                                </GridItem>
                            </GridContainer>

                            <div className={classes.description}>
                                <p>
                                    {this.renderRate(this.state.gym.rating)}
                                </p>
                            </div>

                            <div className={classes.description}>
                                <p>
                                    {this.renderAddress(this.state.gym)}
                                    {/*{this.state.gym.alias}*/}
                                </p>
                            </div>

{/***************** PostCreator*/}
                            {this.state.coachOnly &&
                            <GridContainer justify="center">
                                <div className={classes.container}>

                                    <GymPostCreator
                                        Gym ={this.state.gym}
                                        postcallBack={this.CallBackPost}
                                        profile={this.state.profile}
                                        User={this.state.User}
                                    />

                                </div>

                            </GridContainer>
                            }




{/***************** PostReader*/}

                            {this.state.readable &&
                            <div>
                                {this.state.posts.map((post, key) => {

                                        return (

                                            this.renderPost(post, key)

                                        )
                                    }
                                )}
                            </div>

                            }



                        </div>

                    </div>



                    <div className="col-3">

                        <GridContainer
                            style={{
                                marginTop: '100px',
                                marginRight: '50px',
                                borderRadius: '25px',
                                borderStyle: 'solid',
                                borderColor: '#DCDCDC',
                                borderWidth: '1px'

                            }}

                            justify="center">

                            {/*<div*/}
                                {/*style={{*/}

                                    {/*marginTop: '100px',*/}
                                    {/*marginLeft: '60px',*/}
                                    {/*borderRadius: '25px',*/}
                                    {/*borderStyle: 'solid',*/}
                                    {/*borderColor: '#DCDCDC',*/}
                                    {/*borderWidth: '1px'*/}

                                {/*}}*/}

                                {/*className={classes.container}>*/}

                                {this.renderMap()}

                            {/*</div>*/}

                        </GridContainer>

                        <GridContainer
                            style={{
                                marginTop: '100px',
                                marginRight: '50px',
                                marginBottom: '100px',
                                borderRadius: '25px',
                                borderStyle: 'solid',
                                borderColor: '#DCDCDC',
                                borderWidth: '1px'

                            }}

                            justify="center">
                            <div className={classes.container}>

                                <ul>
                                    {this.state.photos.map((photo,index)=> {
                                            return (
                                                this.renderImage(photo, index)
                                            )
                                        }


                                    )}
                                </ul>

                            </div>

                        </GridContainer>






                    </div>
                    <GridContainer
                        style={{marginTop: '100px',
                            marginBottom: '50px'

                        }}

                        justify="center">
                        <div className={classes.container}>

                            <br/>

                        </div>

                    </GridContainer>
                </div>
                    </GridContainer>
                </div>


                <Footer />
            </div>
        );
    }
}

export default withStyles(profilePageStyle)(gymPage);

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