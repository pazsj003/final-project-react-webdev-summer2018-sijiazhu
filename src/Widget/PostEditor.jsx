import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
// @material-ui/icons
import Video from "@material-ui/icons/VideoLibrary";
import Photo from "@material-ui/icons/AddAPhoto";
import Link from "@material-ui/icons/Link";
// core components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import profile   from "../assets/img/faces/user01.png";
import workStyle from "../assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";



import PostServiceClient from "../Service/PostServiceClient";

const img =profile

const   untouchPost={
        title:'',
        text:'',
        photo:'',
        video:'',
        linkText:'',
        link:'',

    }

class PostEditor extends React.Component {

    constructor(props){
        super(props);


        this.state = {
            PreView:false,
            videoCheck:false,
            linkCheck:false,
            photoCheck:false,
            profile:'',
            cardAnimaton: "cardHidden",
            User:{},


            Post:{
             title:'',
             text:'',
             photo:'',
             video:'',
             linkText:'',
             link:'',
             postuserId:1,

            },
            name:'',
        };
        this.createPost=this.createPost.bind(this);
        this.postServiceClient=PostServiceClient.instance;
        this.updateForm=this.updateForm.bind(this);

    }


    componentDidMount() {

        this.setUser(this.props.User);
        this.updateProfileImg(this.props.profile);

    }

    componentWillReceiveProps(newProps){
        this.setUser(newProps.User);
        this.updateProfileImg(newProps.profile);
    }



    createPost(){

        var id =this.state.User.id;

        console.log("after create post in post editor Id " + id);
      this.setState({Post:{...this.state.Post,postuserId:id}},
          ()=>{
              this.postServiceClient
                  .CreatePost(this.state.User.id,this.state.Post)
                  .then(post=>
                      this.checkPost(post)
                  )
              console.log("after create post in post editor " + JSON.stringify(this.state.Post));
          });




    }


    checkPost(post){

        this.setState({PreView:false});

       console.log("post save backFrom server " + JSON.stringify(post))
       this.props.postcallBack(post);
        this.setState({Post:untouchPost});
        console.log("post after  backFrom server " + JSON.stringify(this.state.Post))
    }


    updateForm(newState) {
        console.log("input in post editor" + JSON.stringify(newState))

        this.setState(newState);
        this.checkPreviewMode (newState.Post)


    }


    checkPreviewMode(post){

        console.log("input check preview mode " + JSON.stringify(post));




        console.log("input check preview mode after parse " + post.title);

        if(post.title === '' &&
            post.text ===  ''  &&
            post.photo ===  '' &&
            post.video ===  ''  &&
            post.linkText ===  ''  &&
            post.link === ''

        ){

           this.setState({PreView:false})
            console.log("preview mode check 1" + this.state.PreView)

        }
        else{

            this.setState({PreView:true})
            //
            // this.setState((prevState)=> {
            //     return(
            //         {PreView: !prevState.PreView}
            //
            //     )
            //
            // })
            //
            console.log("preview mode check 2 " + this.state.PreView)

        }

    }

    setYoutubeId(input){

        console.log("youtube id input" + input.target.value);
        if(input.target.value!==''){
            var youtubeIdPreCheck= input.target.value.split('=')[1];

            console.log("youtube id youtubeIdPreCheck" + youtubeIdPreCheck);
            if(youtubeIdPreCheck!==undefined){
                var youtubeId=youtubeIdPreCheck.split('&')[0];
                if(youtubeId!==undefined){
                    console.log("youtube id " + youtubeId);
                    this.setState({Post:{...this.state.Post,video:youtubeId}});
                }


            }


        }

    }

    setUser(user){
        console.log("post user info " + JSON.stringify(user));
        var Name=user.firstName+' ' +user.lastName ;
        this.setState({User:user});
        this.setState({name:Name});
        this.updateProfileImg(this.state.User.profileimg);


    }

    updateProfileImg(event){
        console.log("post profile image   "  + event);

        if(event !==null){
            console.log("yes inside " +event);

            this.setState({profile:event});
        }else{

            console.log("yes outside  "  + img);
            this.setState({profile:img});
        }




    }


    addVideo(){

       this.setState((prevState)=> {
           return(
               {videoCheck: !prevState.videoCheck}

           )

       })
      if(this.state.videoCheck===false) {

      }



    }
    addPhoto(){

        this.setState((prevState)=> {
            return(
                {photoCheck: !prevState.photoCheck}

            )
        })
    }


    addLink(){

        this.setState((prevState)=> {
            return(
                {linkCheck: !prevState.linkCheck}

            )

        })
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
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>


            <form >
              <GridContainer style={{
                  borderRadius: '25px',
                  borderStyle: 'solid',
                  borderColor:'#DCDCDC',
                  borderWidth: '1px'


              }}>
{/***************** head*/}
                  <Button
                      color='transparent'
                      style={{
                          margin:'20px',
                          padding: '3px',
                          borderRadius: '12px',
                          // backgroundColor: 'Transparent',



                      }}

                      onClick={()=>this.goToUserProfile()}>
                      <img  className="nav-link"


                            src={this.state.profile}
                            alt="..."
                            style={{
                                padding:'1px',
                                height: '50px',
                                width:'50px',
                                borderRadius: '50%'
                            }}

                      />
                      <h6 style = {{
                          margin:'5px',
                          color :'#2F51D8'
                      }}>{this.state.name}</h6>


                  </Button>


{/***************** title*/}
                  <CustomInput
                      value={this.state.Post.title}
                      labelText="Title"
                    id="title"
                    onChange={(event)=>this.updateForm({Post:{...this.state.Post,title:event.target.value}})}
                    formControlProps={{
                      fullWidth: true,
                        className: classes.textArea
                    }}
                  />
{/***************** text*/}
                <CustomInput
                  value={this.state.Post.text}
                  labelText="How about today's training？"
                  id="message"
                  onChange={(event)=>this.updateForm({Post:{...this.state.Post,text:event.target.value}})}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5
                  }}
                />

{/***************** Photo*/}

                  {this.state.photoCheck &&<CustomInput

                      labelText="Photo Input"
                      id="title"
                      value={this.state.Post.photo}
                      onChange={(event)=>this.updateForm({Post:{...this.state.Post,photo:event.target.value}})}
                      formControlProps={{
                          fullWidth: true,
                          className: classes.textArea
                      }}
                  />}

{/***************** Viedeo*/}

                  {this.state.videoCheck &&<CustomInput
                      labelText="Video Input"
                      id="title"
                      value={this.state.Post.video}
                      onChange={(event)=>this.setYoutubeId(event)}
                      formControlProps={{
                          fullWidth: true,
                          className: classes.textArea
                      }}
                  />}
{/***************** Link*/}

                  {this.state.linkCheck &&

                  <CustomInput
                      onChange={(event)=>this.updateForm({Post:{...this.state.Post,linkText:event.target.value}})}
                      labelText="Link Text"
                      id="title"
                      value={this.state.Post.linkText}
                      formControlProps={{
                          fullWidth: true,
                          className: classes.textArea
                      }}
                  />


                 }

                  {this.state.linkCheck &&
                  <CustomInput
                      onChange={(event)=>this.updateForm({Post:{...this.state.Post,link:event.target.value}})}
                      labelText="Link"
                      id="title"
                      value={this.state.Post.link}
                      formControlProps={{
                          fullWidth: true,
                          className: classes.textArea
                      }}
                  />
                  }

                  <GridContainer justify="center">
{/***************** media button*/}
                      <ul>
                          <li
                              style={{
                                  display:'inline'

                              }}
                          >
                              <Button
                                  round
                                  style={{
                                      opacity:'0.5',

                                  }}
                                  onClick={()=>this.addPhoto()}
                                  size="sm"
                                  color="info">
                                  <Photo className={classes.inputIconsColor} />
                              </Button>
                          </li>
                          <li style={{
                              display:'inline'

                          }}
                          >
                              <Button
                                  round
                                  style={{
                                      opacity:'0.5',

                                  }}
                                  onClick={()=>this.addVideo()}
                                  size="sm"
                                  color="google">
                                  <Video className={classes.inputIconsColor} />
                              </Button>
                          </li>
                          <li
                              style={{
                                  display:'inline'

                              }}
                          >
                              <Button
                                  round
                                  style={{
                                      opacity:'0.5',


                                  }}
                                  onClick={()=>this.addLink()}
                                  size="sm"
                                  color="twitter">
                                  <Link className={classes.inputIconsColor} />
                              </Button>
                          </li>
                      </ul>


                      <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          className={classes.textCenter}
                      >



                      </GridItem>

                  </GridContainer>




                  <GridContainer

                            style={{
                                marginLeft:'40px'
                            }}

                      justify="center">

                      <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          className={classes.textCenter}
                      >

                          <Button
                              onClick={()=>this.createPost()}
                              color="facebook">Post</Button>

                      </GridItem>
                  </GridContainer>



              </GridContainer>
            </form>


{/***************** Preview*/}

              {this.state.PreView &&<form style={{marginTop:'30px'}}>

                  <GridContainer style={{
                      borderStyle: 'solid',
                      borderColor:'#DCDCDC',
                      borderWidth: '1px'


                  }}>
                      <div className="container-fluid">
                      <Button
                          color='transparent'
                          style={{
                              margin:'10px',
                              marginTop:'20px',
                              padding: '3px',
                              borderRadius: '12px',
                              // backgroundColor: 'Transparent',



                          }}

                          onClick={()=>this.goToUserProfile()}>
                          <img  className="nav-link"


                                src={this.state.profile}
                                alt="..."
                                style={{
                                    padding:'1px',
                                    height: '50px',
                                    width:'50px',
                                    borderRadius: '50%'
                                }}

                          />
                          <h6 style = {{
                              margin:'5px',
                              color :'#2F51D8'
                          }}>{this.state.name}</h6>




                      </Button>

                      </div>

{/***************** title*/}
                      <div className="container-fluid">
                      <h6 style={{
                          marginTop:'20px'

                      }}>
                          {this.state.Post.title}
                     </h6>
                          </div>

{/***************** text*/}
                      <div className="container-fluid">
                          <p style={{
                              marginTop:'20px',
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
                              marginTop:'20px',
                              marginBottom:'30px'

                          }}
                          className="container-fluid">

                      </div>









                  </GridContainer>
              </form>}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(PostEditor);
