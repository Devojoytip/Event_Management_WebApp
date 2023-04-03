const Event = require('../models/event');
const User = require('../models/user');
const Manager = require('../models/manager');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const e = require('express');

module.exports.profile_fn = async (req, res) => {
    let eventsList = await Event.find({ email: req.body.email });
    console.log('Profile is viewed');
    console.log(req.user)
    res.render('profile', {
        title: 'Profile Page',
        org_user: req.user,
        logged_user: req.user,
        eventsList
    });
}

module.exports.profile_fn2 = (req, res) => {
    User.findById(req.params.id, (err, profile_user) => {
        return res.render('profile', {
            title: 'User Profile',
            org_user: profile_user,
            logged_user: req.user
        })
    })
}

module.exports.booking_fn = async (req, res) => {
    let eventsList = await Event.find({ email: req.user.email }); 
    console.log(eventsList)
    req.user.eventsList = eventsList;
    return res.render('home2', {
        title: 'User Profile',
        eventsList:eventsList
    })
}

module.exports.update_profile = async (req, res) => {
    console.log('req.user', req.user);
    if (req.user.id === req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, (err) => {
                if (err) {
                    console.log('*******Maltar Error:', err);
                }
                else {
                    let hashed_password = user.password;
                    const has_matched = bcrypt.compareSync(req.body.password, hashed_password);
                    console.log('req.body.password', req.body.password);
                    console.log('hashed_password', hashed_password);
                    console.log('has_matched', has_matched);
                    if (has_matched) {
                        if (req.body.updated_username.length > 0) {
                            user.username = req.body.updated_username;
                        }

                        if (req.body.updated_email.length > 0) {
                            user.email = req.body.updated_email;
                        }
                        if (req.file) {
                            console.log('req.file is', req.file);

                            const ext = req.file.mimetype.split("/")[1];
                            console.log('ext is', ext);

                            if (ext === 'jpeg' || ext === 'png') {
                                if (user.avatar) {
                                    console.log('path is', path.join(__dirname, '..', user.avatar));
                                    const oldAvatar = user.avatar;
                                    fs.access(path.join(__dirname, '..', user.avatar), (err) => {
                                        if (!err) {
                                            console.log('path is', path.join(__dirname, '..', user.avatar));
                                            console.log('file exists');
                                            fs.unlinkSync(path.join(__dirname, '..', oldAvatar));
                                            return;
                                        }
                                        else {
                                            console.log('file does not exist');
                                            return;
                                        }
                                    });
                                }
                                user.avatar = User.avatarPath + '/' + req.file.filename;
                                console.log('user.avatar is : ', user.avatar);
                                user.save();
                                return res.redirect('/');
                            }

                            else {
                                user.avatar = User.avatarPath + '/' + req.file.filename;
                                fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                                user.save();
                                return res.redirect('/');
                            }

                        }

                        else {
                            user.save();
                            return res.redirect('/');
                        }
                    }
                    else {
                        console.log('Wrong password');
                        return res.redirect('/');
                    }
                }
            });
        } catch (error) {
            return res.redirect('back');
        }
    }

    else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.users_home_fn = (req, res) => {
    return res.render('home', {
        title: 'Users Home Page',
        user: req.user
    });
}

module.exports.users_signup = async (req, res) => {
    console.log('req', req);
    
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signup', {
        title: 'New User - Sign Up'
    });
}

module.exports.admins_login = (req, res) => {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/admins/profile');
    // }
    return res.render('adminLogin', {
        title: 'Admin Login',
    });
}

module.exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        let managersList = await Manager.find({});
        // console.log('event', event)
        console.log('req.body',req.body)
        event.manager=req.body.manager;
        // event.status=true;
        await event.save();
        let eventsList = await Event.find({});
        return res.render('adminHome', {
            title: 'Home Page',
            eventsList:eventsList,
            managersList:managersList
        });
        // return res.redirect('/admins/create-session');
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.create = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirm_pw) {
            console.log('Password & Confirm Password does not match');
            return res.render('signup', {
                title: 'Password & Confirm Password does not match'
            });
        }

        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            const hashed_pw = await bcrypt.hash(req.body.password, 12);
            req.body.password = hashed_pw;
            let new_user = await User.create(req.body);
            await new_user.save();
            // return res.redirect('/users/login');
        }
        else {
            console.log('E-mail already registered !!!');
            return res.render('signup', {
                title: 'E-mail already registered !!!'
            });
        }

    } catch (error) {
        console.log('error is', error);
        return res.json(500, { error });
    }
}


module.exports.createSession = async (req, res) => {
    console.log(req.user.email)
    let eventsList = await Event.find({});
    console.log(eventsList)
    req.user.eventsList = eventsList;
    let managersList = await Manager.find({});
    req.user.managersList = managersList;
    // return res.redirect('/');
    return res.render('adminHome', {
        title: "Admin Panel",
        eventsList: eventsList,
        managersList:managersList,
        user:req.user
    });
}

module.exports.createManager = async (req, res) => {
    const hashed_pw = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashed_pw;
    let new_manager = await Manager.create(req.body);
    console.log(new_manager)
    let managersList = await Manager.find({});
    let eventsList = await Event.find({});
    console.log(eventsList)
    console.log(managersList)
    // return res.redirect('/');
    return res.render('adminHome', {
        title: "Admin Panel",
        eventsList: eventsList,
        managersList:managersList,
        user:req.user
    });
}

module.exports.destroySession = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

}

module.exports.login_fn = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        let eventsList = await Event.find({ email: req.body.email });

        if (user) {
            let hashed_password = user.password;
            const has_matched = await bcrypt.compare(req.body.password, hashed_password);
            if (has_matched) {
                req.user = user;
                console.log('req.user', req.user);
                return res.render('home', {
                    user,
                    data: {
                        token: jwt.sign(user.toJSON(), process.env.JWT_KEY, { expiresIn: '1000000' })
                    },
                    eventsList
                });
            }
            return res.redirect('/users/login');
        }

        return res.redirect('/users/login');

    } catch (error) {
        console.log('error is', error);
        return res.json(500, { error });
    }
}
