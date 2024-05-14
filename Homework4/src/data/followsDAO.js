const userDAO = require('./usersDAO');
const follows = require('./follows.json');

module.exports = {
    // Get following list of specific user 
    getFollowingUsers: (userId) => {
        return new Promise((resolve, reject) => {
            // Ids of users followed
            const following = follows[userId].following;
            // User objects 
            const usersFollowed = following.map(followerId => userDAO.getUserById(followerId));

            if (following.length > 0) {
                resolve(usersFollowed);
            }
            else {
                reject();
            }
        });
    },
    // unfollow: (currentUser, userId) => {

    // },
    // follow: (currentUser, userId) => {

    // }
}; 