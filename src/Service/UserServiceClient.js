
const host = 'http://localhost:8080';
const COURSE_API_URL = 'http://localhost:8080/api/course';
const updateProfile_url = host+'/api/profile';
const user_url = host+'/api/user';
const reg = 'http://localhost:8080/api/register';
const login_url = host+'/api/login';
const logout_url = host+'/api/logout';

let _singleton = Symbol();

export default class  UserServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserServiceClient(_singleton);
        return this[_singleton]
    }


    updateProfile(user) {
        return fetch(updateProfile_url, {
            method: 'put',
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {

                'content-type': 'application/json'
            }
        }).then(this.verifyUpdate).catch((error) => {
            alert(error);
        });



    }

    Profile() {
        return fetch(updateProfile_url, {
            credentials: 'same-origin',
        }).then(function (response) {
            return response.json()

        })
    }


    verifyUpdate(response) {
        if (response.ok) {

            alert("success update");
        }
        else if (response.status == 409) {
            alert("same username used");
        }
        else throw new Error('cant update');
    }


    logout() {
        return fetch(logout_url).then(this.goToLogin);
    }

    goToLogin() {
        window.location.href = '../login/login.template.client.html';
    }


    successCreate(response) {
        if (response.ok) {

            alert("success Create an Account")

        } else if (response.status == 409) {
            alert("same user name used");
        }

        else throw new Error('cant Create')

    }


    success(response) {
        if (response.ok) {

            alert("success register");
            this.goToProfile();
        }

        else throw new Error('username used');

    }


    login(user) {
        return fetch(login_url, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){

            if (response.ok) {
                console.log("log in veryf " + JSON.stringify(response) );
                alert("success Log In");
                return response.json();


            }else if (response.status === 404){
                alert('username password dont match');

            }
            else {

                throw new Error('unknow error')
            }

        }).catch((error) => {
            console.log(error);
        });


    }

    verifyLogin(response){
        if (response.ok) {
            console.log("log in veryf " + JSON.stringify(response) );
            alert("success Log In");
            return response.json();



        }else if (response.status === 404){
            alert('username password dont match');

        }
        else {

            throw new Error('unknow error')
        }

    }

    verifyLogin(response) {
        if (response.ok) {

            alert("success Log In")
            return
            this.goToProfile();
        }
        else {
            throw new Error('username password dont match')
        }

    }

    goToProfile() {
        window.location.href = '../profile/profile.template.client.html';
    }

    findUserById(userId) {
        return fetch(user_url + '/' + userId)
            .then(function (response) {
                return response.json()

            })
    }

    updateUser(userId, user) {
        return fetch(user_url + '/' + userId, {
            method: 'put',
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(this.verifyUpdate).catch((error) => {
            console.log(error);
        });

    }


    findAllUsers() {
        return fetch(user_url)
            .then(function (response) {
                return response.json();
            });
    }

    CreateUser(user) {
        return fetch(user_url, {
            body: JSON.stringify(user),
            method: 'post',
            // credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            }
        }).then(this.successCreate).catch((error) => {
            alert(error);
        });
    }

    register(user) {

        return fetch(reg, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {

                'content-type': 'application/json'
            }

        }).then(response=>this.success(response)).catch((error) => {
            alert(error);
        });


    }




    deleteUser(userID) {
        return fetch(user_url + '/' + userID, {
            method: 'delete'
        }).then(this.successdelete).catch((error) => {
            alert(error);
        });


    }

    successdelete(response) {
        if (response.ok) {

            alert("success delete")

        }

        else throw new Error('cant not delete')

    }
}
