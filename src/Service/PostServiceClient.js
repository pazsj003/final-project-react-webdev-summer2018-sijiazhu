
// const host = 'https://final-project-server-sijiazhu.herokuapp.com';
const host = 'http://localhost:8080';

// const updateProfile_url = host+'/api/profile';
const post_url = host+'/api/post';
const post_finder = host+'/api/post/postId';
const post_userPost = host+'/api/user/UserId/post';


const credential='include';
// const credential='same-origin';



let _singleton = Symbol();

export default class  PostServiceClient {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new PostServiceClient(_singleton);
        return this[_singleton]
    }

    findAllPost() {

        return fetch(post_url)
            .then(function (response) {
                return response.json();
            });

    }

    findAllPostForUser(userID) {
        return fetch(
            post_userPost
                .replace('UserId', userID))
            .then(function (response) {
                return response.json();
            })
    }

    CreatePost(userID, post) {
        return fetch(post_userPost.replace('UserId', userID),
            {
                body: JSON.stringify(post),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deletePost(postId) {
        return fetch(post_finder.replace
        ('postId', postId), {
            method: 'delete'
        })
    }

    findPostById(topicId) {
        return fetch(post_finder + '/' + topicId)
            .then(function (response) {
                return response.json()

            })
    }

    updateTopics() {

    }



}