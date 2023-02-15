const passport = require('passport');

const isLogin = passport.authenticate('jwt', { session: false });

module.exports = isLogin;
