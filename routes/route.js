var express = require('express');
var router  = express.Router();

var passport = require('passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });


var routes = {
    views: {
        comment: require('./views/comment'),
        user: require('./views/user')
    }
}

// user signup
router.post('/api/addUser', routes.views.user.addUser);
router.post('/api/loginUser', passportSignIn, routes.views.user.loginUser);

// comments
router.get('/api/getAllComment', passportJWT, routes.views.comment.getAllComments);
router.post('/api/addComment', passportJWT, routes.views.comment.addComment);
router.post('/api/upvote', passportJWT, routes.views.comment.upvote);
router.post('/api/downvote', passportJWT, routes.views.comment.downvote);


module.exports = router;
