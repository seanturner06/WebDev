const followsDAO = require('./followsDAO');
// const usersDAO = require('./usersDAO');
let howls = require('./howls.json');

module.exports = {
    createHowl: (userId, text) => {
        return new Promise((resolve, reject) => {
            const newHowl = {
                id: howls.length + 1,
                userId,
                datetime: new Date().toISOString(),
                text
            };
            howls.push(newHowl);
            resolve(newHowl);
        });
    },
    getHowlsPostedByUser: (userId) => {
        return new Promise((resolve, reject) => {
            const howlsByUser = howls.filter(howl => howl.userId === userId);
            if (howlsByUser) {
                resolve(howlsByUser);
            }
            else {
                reject("No howls by user found");
            }
        });
    },
    getHowlsPostedByUserFollowing: (userId) => {

        return new Promise((resolve, reject) => {
            const following = followsDAO.getFollowingUsers(userId);
            const selectedHowls = howls.filter(howl => following.includes(howl.userId));
            if (selectedHowls) {
                resolve(selectedHowls);
            }
            else {
                reject("No howls by user found");
            }
        });
    }

}; 