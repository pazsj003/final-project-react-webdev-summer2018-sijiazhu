
// const host = 'https://final-project-server-sijiazhu.herokuapp.com';
const host = 'http://localhost:8080';

// const updateProfile_url = host+'/api/profile';
const friend_url = host+'/api/gym';
const gym_finder = host+'/api/gym/gymId';
const gym_user = host+'/api/user/UserId/gym';


const credential='include';
// const credential='same-origin';



let _singleton = Symbol();

export default class  GymServiceClient {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new GymServiceClient(_singleton);
        return this[_singleton]
    }



    findAllGymsForUser(userID) {
        console.log("before userId check " + userID);
        return fetch(
            gym_user
                .replace('UserId', userID))
            .then(function (response) {
                return response.json();
            })
    }

    addGym(userID, Gym) {
        return fetch(gym_user.replace('UserId', userID),
            {
                body: JSON.stringify(Gym),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteGym(GymId) {
        return fetch(gym_finder.replace
        ('gymId', GymId), {
            method: 'delete'
        })
    }

    findGymById(GymId) {
        return fetch(gym_finder + '/' + GymId)
            .then(function (response) {
                return response.json()

            })
    }




}