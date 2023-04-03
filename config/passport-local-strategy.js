const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const Admin = require('../models/admin');

const bcrypt = require('bcryptjs');
const Manager = require('../models/manager');
// authentication using passport
// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passReqToCallback: true
//     },
//     function(req, email, password, done){
//         // find a user and establish the identity
//         User.findOne({email: email}, function(err, user)  {
//             if (err){
//                 // req.flash('error', err);
//                 return done(err);
//             }
//             if (!user){
//                 return done(null, false);
//             }

//             let hashed_password = user.password;
//             const has_matched = bcrypt.compare(password, hashed_password);
//             if (!has_matched) {
//                 return done(null, false);
//             }

//             // if (!user || user.password != password){
//             //     // req.flash('error', 'Invalid Username/Password');
//             //     return done(null, false);
//             // }

//             return done(null, user);
//         });
//     }


// ));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async function (req, email, password, done) {
    try {
        let user = await User.findOne({ email: email });
        let admin = await Admin.findOne({ email: email });
        let manager = await Manager.findOne({ email: email });
        if (!user && !admin && !manager) {
            return done(null, false);
        }

        if (admin) {
            let hashed_password = admin.password;
            const has_matched = await bcrypt.compare(password, hashed_password);
            if (!has_matched) {
                return done(null, false);
            }
            else return done(null, admin);
        }

        else if (manager) {
            let hashed_password = manager.password;
            const has_matched = await bcrypt.compare(password, hashed_password);
            if (!has_matched) {
                return done(null, false);
            }
            else return done(null, manager);
        }

        else {
            let hashed_password = user.password;
            const has_matched = await bcrypt.compare(password, hashed_password);
            if (!has_matched) {
                return done(null, false);
            }
            return done(null, user);
        }
    } catch (err) {
        return done(err);
    }
}));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user --> Passport');
//             return done(err);
//         }

//         return done(null, user);
//     });
// });
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;