const Event = require('../models/event');
const User = require('../models/user');

module.exports.home_fn = async (req, res) => {
    try {
        let eventsList = await Event.find({});
        let arr = [];

        return res.render('home', {
            title: 'Home Page',
            eventsList:eventsList
        })

    } catch (error) {
        console.log('Error is', error);
        return;
    }

}