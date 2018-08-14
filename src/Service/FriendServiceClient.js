
const host = 'https://final-project-server-sijiazhu.herokuapp.com';
// const host = 'http://localhost:8080';

// const updateProfile_url = host+'/api/profile';
const friend_url = host+'/api/friend';
const friend_finder = host+'/api/friend/friendId';
const friend_user = host+'/api/user/UserId/friend';


const credential='include';
// const credential='same-origin';



let _singleton = Symbol();

export default class  FriendServiceClient {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FriendServiceClient(_singleton);
        return this[_singleton]
    }



    findAllFriendForUser(userID) {
        return fetch(
            friend_user
                .replace('UserId', userID))
            .then(function (response) {
                return response.json();
            })
    }

    addFriend(userID, Friend) {
        return fetch(friend_user.replace('UserId', userID),
            {
                body: JSON.stringify(Friend),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteFriend(FriendId) {
        return fetch(friend_finder.replace
        ('friendId', FriendId), {
            method: 'delete'
        })
    }

    findFriendById(FriendId) {
        return fetch(friend_finder + '/' + FriendId)
            .then(function (response) {
                return response.json()

            })
    }




}