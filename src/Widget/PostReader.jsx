import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
// @material-ui/icons
import Video from "@material-ui/icons/VideoLibrary";
import Photo from "@material-ui/icons/AddAPhoto";
import Clear from "@material-ui/icons/Clear";
import { Redirect } from 'react-router-dom'
import Link from "@material-ui/icons/Link";
// core components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import profile from "../assets/img/faces/user01.png";
import workStyle from "../assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
import UserServiceClient from "../Service/UserServiceClient";

const img = profile

//

class PostReader extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            checkSelf:false,
            videoCheck:false,
            linkCheck:false,
            photoCheck:false,
            localtime:'',
            profile: '',
            cardAnimaton: "cardHidden",
            User: {},
            PostUser:{},
            Post: {
                title: '',
                text: '',
                photo: '',
                video: '',
                linkText: '',
                link: '',

            },
            name: '',
            postUser:{},
        };
        this.userServiceClient=UserServiceClient.instance;
        this.setUser=this.setUser.bind(this);
        this.readPostUser = this.readPostUser.bind(this);
    }

    componentDidMount() {
        this.setPost(this.props.Post)
        // this.setUser(this.props.User);
        this.setcheckSelf(this.props.checkSelf);


    }

    componentWillReceiveProps(newProps) {
        this.setPost(newProps.Post)
        // this.setUser(newProps.User);
        this.setcheckSelf(newProps.checkSelf);


    }
    setcheckSelf(check){
        this.setState({checkSelf:check})
    }

    setPost(post) {


        if (post.postuserId !== undefined) {
            console.log("Post in postReader" + JSON.stringify(post));
            this.setState({Post: post});

            this.checkMedia(post);
            this.setLocalTime(post.date)
            this.readPostUser(post);

        }
    }

    readPostUser(post){
        this.userServiceClient
            .findUserById(post.postuserId)
            .then(user=>
                this.setPostUser(user)
            )
    }

    setPostUser(user){
        console.log("post user info in post reader 222" + JSON.stringify(user));
        var Name = user.firstName + ' ' + user.lastName;
        this.setState({User: user});
        this.setState({name: Name});
        if(user.profileimg!=undefined){
            this.updateProfileImg(user.profileimg);
        }


    }

    deletePost(){

        if(this.state.Post.id!==undefined){
            this.props.deleteCallBack(this.state.Post.id);
        }


    }

    goToUserProfile(user){
        const page = 'http://localhost:3000';
       // return(
       //
       //     <Link to={`/user/${user.id}`}/>
       // )
        window.location.href = page+`/user/${user.id}`;
        // this.props.history.push(`/user/${user.id}`)

    }


    setUser(user) {
        console.log("post user info in post reader " + JSON.stringify(user));
        var Name = user.firstName + ' ' + user.lastName;
        this.setState({User: user});
        this.setState({name: Name});
        if(user.profileimg!==null){
            this.updateProfileImg(user.profileimg);
        }



    }

    updateProfileImg(event) {
        console.log("post profile image in post reader   " + event);

        if (event !== null) {
            console.log("yes inside post reader img" + event);

            this.setState({profile: event});
        } else {

            console.log("yes outside  reader img" + img);
            this.setState({profile: img});
        }


    }

    checkMedia(post){

        console.log(" check media for photo  "+ JSON.stringify(this.state.Post.photo) )
        console.log(" check media for Video  "+ JSON.stringify(this.state.Post.video ))
        console.log(" check media for Link  "+ JSON.stringify(this.state.Post.link ))
       if(post.photo!==''){

           this.setState({photoCheck: true})

       }else{
           this.setState({photoCheck: false})
       }
        if(post.video!==''){
            this.setState({videoCheck: true})
        }else{
            this.setState({videoCheck: false})
        }

        if(post.linkText!==''&& post.link!==''){
            this.setState({linkCheck: true})
        }else{
            this.setState({linkCheck: false})
        }


    }
    setLocalTime(date){
        if(date!=undefined){
            console.log('time set ' + date)
            var predateArray = date.split('T');
            var localDate = predateArray[0];
            var  localTime = predateArray[1];
            var  localTimePre = localTime.split('.');
            var  localTimeNext =localTimePre[0];

            var combineTime = localDate + ' ' + localTimeNext;

            console.log('time set after  ' + combineTime)

            this.setState({localtime:combineTime})
        }



    }



    render() {
        const {classes, ...rest} = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
        const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

        return (

    <div

        className={classes.section}
        style={{paddingTop: '0px',
            paddingBottom: '0px'

        }}

    >
        <GridContainer justify="center">
            <GridItem cs={12} sm={12} md={8}>
                <form style={{marginTop: '30px'}}>

                    <GridContainer style={{
                        borderRadius: '25px',
                        borderStyle: 'solid',
                        borderColor: '#DCDCDC',
                        borderWidth: '1px'


                    }}>
{/***************** head button*/}
                        <div className="container-fluid">
                            <Button
                                color='transparent'
                                style={{
                                    margin: '10px',

                                    padding: '3px',
                                    borderRadius: '12px',
                                    // backgroundColor: 'Transparent',


                                }}

                                onClick={() => this.goToUserProfile(this.state.User)}>
                                <img className="nav-link"


                                     src={this.state.profile}
                                     alt="..."
                                     style={{
                                         padding: '1px',
                                         height: '50px',
                                         width: '50px',
                                         borderRadius: '50%'
                                     }}

                                />
                                <h6 style={{
                                    margin: '5px',
                                    color: '#2F51D8'
                                }}>{this.state.name}</h6>


                            </Button>
                         <p
                             className='float-none'
                             style={{
                                 display:'inline',

                         }}>
                            {this.state.localtime}
                         </p>

{/***************** delete button*/}
                            {this.state.checkSelf &&
                            <Button
                                className='float-right'

                                style={{
                                    width: '30px',
                                    marginTop: '20px',
                                    opacity: '0.3',


                                }}
                                onClick={() => this.deletePost()}
                                size="sm"
                                color="github">
                                <Clear className={classes.inputIconsColor}/>
                            </Button>
                            }


                        </div>

{/***************** title*/}
                        <div className="container-fluid">
                            <h6 style={{
                                marginTop: '20px'

                            }}>
                                {this.state.Post.title}
                            </h6>
                        </div>

{/***************** text*/}
                        <div className="container-fluid">
                            <p style={{
                                marginTop: '20px',
                                whiteSpace: 'pre',

                            }}>
                                {this.state.Post.text}
                            </p>
                        </div>


{/***************** Photo*/}

                        {this.state.photoCheck &&
                        <div

                            style={{

                                height:'400px'

                            }}

                            className="container-fluid">
                            <img src={this.state.Post.photo}

                                 style={{

                                     height:'auto' ,
                                     width: 'auto',
                                     maxHeight:'100%',
                                     maxWidth:'100%',



                                 }}>

                            </img>
                        </div>
                        }

{/***************** Viedeo*/}

                        {this.state.videoCheck &&
                        <div

                            style={{


                                height:'400px'

                            }}

                            className="container-fluid">
                            <iframe
                                width="640"
                                height="360"

                                frameBorder="0"
                                allow="autoplay; encrypted-media"

                                style={{
                                    marginTop:'20px',



                                }}

                                allowFullScreen

                                src={`https://www.youtube.com/embed/${this.state.Post.video}` }

                            />




                        </div>
                        }
{/***************** Link*/}

                        {this.state.linkCheck &&

                        <div className="container-fluid">
                            <a
                                style={{
                                    marginTop:'20px',
                                    marginBottom:'30px'

                                }}

                                href={this.state.Post.link}
                                target="_blank"

                            >
                                {this.state.Post.linkText}

                            </a>

                        </div>

                        }




                        <div
                            style={{
                                marginTop: '20px',
                                marginBottom: '30px'

                            }}
                            className="container-fluid">

                        </div>


                    </GridContainer>
                </form>
            </GridItem>
        </GridContainer>
    </div>
        )
    }

}

export default withStyles(workStyle)(PostReader);
