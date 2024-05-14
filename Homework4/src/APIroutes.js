const express = require('express');
const cookieParser = require('cookie-parser');

const apiRouter = express.Router();

apiRouter.use(cookieParser());
apiRouter.use(express.json());

const { SessionMiddleware, initializeSession, removeSession } = require('./SessionCookieMiddleware');

const usersDAO = require('./data/usersDAO');
const followsDAO = require('./data/followsDAO');
const howlsDAO = require('./data/howlsDAO');

/* USER ROUTES */
apiRouter.post('/users/login', (req, res) => {
    if (req.body.username) {
        usersDAO.getAuthenticatedUser(req.body.username).then(user => {
            let result = {
                user: user
            }
            initializeSession(req, res, user);
            res.json(result);
        }).catch(err => {
            console.log(err);
            res.status(err.code).json({ error: err.message });
        });
    }
    else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

// API for logging in a user
apiRouter.post('/users/logout', (req, res) => {
    removeSession(req, res);

    res.json({ success: true });
});

// API for getting the current user
apiRouter.get('/users/current', SessionMiddleware, (req, res) => {
    res.json(req.session.user);
});

// API for getting the current user's following list
apiRouter.get('/users/current/following', SessionMiddleware, (req, res) => {
    let followingList = followsDAO.getFollowingUsers(req.session.user.id);
    res.json(followingList);
});

/* HOWL ROUTES*/
apiRouter.post('/howls', SessionMiddleware, (req, res) => {
    let newHowl = req.body;

    howlsDAO.createHowl(req.session.user.id, newHowl.text).then(howl => {
        res.json(howl);
    });
});

apiRouter.get('/users/:userId/howls', SessionMiddleware, (req, res) => {
    howlsDAO.getHowlsPostedByUser(req.params.userId).then(howls => {
        res.json(howls);
    });
});

apiRouter.get('/follows/howls', SessionMiddleware, (req, res) => {
    // Get the "authenticated" users id
    const userId = req.session.user.id;

    // Get the list of ids of the users followed by the user
    howlsDAO.getHowlsPostedByUserFollowing(userId).then(howls => {
        res.json(howls);
    });
});

apiRouter.get('/users/:userId', SessionMiddleware, (req, res) => {
    usersDAO.getUserById(req.params.userId).then(user => {
        res.json(user);
    });
});

apiRouter.get('/users/:userId/following', SessionMiddleware, (req, res) => {
    let followingList = followsDAO.getFollowingUsers(req.params.userId);
    res.json(followingList);
});

module.exports = apiRouter;
