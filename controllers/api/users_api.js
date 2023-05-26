const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.createSession = async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!User) {
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
            return res.status(200).json({
                message: 'Sign in successfully ',
                name_of_user: user.username,
                data: {
                    token: jwt.sign(user.toJSON(), process.env.JWT_KEY, { expiresIn: '100000' })
                    // user.toJSON() IS ENCRYPTED
                }
            })
        }
    } catch (error) {
        console.log('*****ERROR*******', error);
        return res.json(500, {
            message: 'Internal server error'
        });
    }
}