let users = require('./users.json');
module.exports = {
    getAuthenticatedUser: (username) => {
        return new Promise((resolve, reject) => {
            const user = Object.values(users).find(user => user.username === username);
            console.log(user);
            if (user) {
                resolve(user);
            }
            else {
                reject({ code: 401, message: "User does not exist" });
            }
        });
    },
    getUserById: (userId) => {
        return new Promise((resolve, reject) => {
            const user = users[userId];
            if (user) {
                resolve(user);
            }
            else {
                reject();
            }
        });
    },
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            const users = Object.values(users);
            resolve(users);
        });
    }
}; 