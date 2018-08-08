import React, {Component} from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserServiceClient from "../Service/UserServiceClient"



import Select from 'react-select';




class SignUp extends Component {
    constructor(props) {
        super(props);


        this.state = {
            role:'',
            verifyPassword:'',
            User:{username:'',
                  password:'',
                  firstName:'',
                  lastName:'',
                   role:'',
                   address:'',
                  dateOfBirth:'',


            },
        }

        this.userServiceClient=UserServiceClient.instance;
    }
    updateRole(option){
        this.setState({role : option});
        this.setState({User:{ ...this.state.User,  role : option.value}});
    }

    updateForm(newState) {


        this.setState(newState);

    }

    createUser(user){

        console.log("user "  + JSON.stringify(user) );
        this.userServiceClient
            .register(user)
            .then((user)=>{
                console.log("return user " + JSON.stringify(user));
            })

    }


    render() {
        const { classes } = this.props;
        return (

            <div>


                <div className="container-fluid p-4">

                    < h1 className="navbar-brand"> register </h1>

                    <input
                        placeholder="First Name"
                        className="form-control"
                        onChange={text=>this.updateForm({User:{...this.state.User,firstName:text.target.value}})}
                    />
                    <input
                        placeholder="Last Name"
                        className="form-control"
                        onChange={text=>this.updateForm({User:{...this.state.User,lastName:text.target.value}})}
                    />

                    <input
                        placeholder="username"
                        className="form-control"
                        onChange={text=>this.updateForm({User:{...this.state.User,username:text.target.value}})}
                    />
                    <input
                        placeholder="password"
                        className="form-control"
                        onChange={text=>this.updateForm({User:{...this.state.User,password:text.target.value}})}
                    />

                    <input
                        placeholder="verify password"
                        className="form-control"
                        onChange={text=>this.updateForm({verifyPassword:text})}
                    />
                    <input
                        placeholder="Address"
                        className="form-control"
                        onChange={text=>this.updateForm({User:{...this.state.User,address:text.target.value}})}
                    />





                    <Select
                        value={this.state.role}
                        options={ [{value:'normal user',label:'normal user'},
                            {value:'coach',label:'coach'}]

                        }
                        onChange={roleOption=>this.updateRole(roleOption)}
                    />





                    < button
                        onClick={() => this.createUser(this.state.User)}
                        className="btn btn-primary btn-block">
                        register
                    </button>




                </div>
            </div>
        )

    }

}

export default SignUp;