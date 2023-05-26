const User = require('../../models/user');
const Event = require('../../models/event');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.createSession = async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(422).json({
                message: 'Invalid username or password'
            })
        }

        let hashed_password = user.password;
        const has_matched = await bcrypt.compare(req.body.password, hashed_password);
        if (!has_matched) {
            return res.status(422).json({
                message: 'Invalid username or password'
            })
        }

        else {
            let eventsList = await Event.find({ email: user.email });
            console.log(eventsList)
            user.eventsList = eventsList;
            return res.render('usersHome', {
                message: 'Sign in successfully ',
                title: "Users Home Page",
                name_of_user: user.username,
                user: user,
                eventsList: eventsList,
                data: {
                    token: jwt.sign(user.toJSON(), process.env.JWT_KEY, { expiresIn: '100000' })
                    // user.toJSON() IS ENCRYPTED
                }
            });
        }
    } catch (error) {
        console.log('*****ERROR*******', error);
        return res.json(500, {
            message: 'Internal server error'
        });
    }
}