const fs = require('fs');
const path = require('path');
const Event = require('../models/event');

module.exports.marriage = async (req, res) => {
    try {
        return res.render('registerForm', {
            title: 'Home Page',
            eventinfo:"Marriage",
            clientname:req.user.username
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.regMarriage = async (req, res) => {
    try {
        let new_event = await Event.create({
            name: req.body.name,
            user: req.user._id,
            content: req.body.content,
            registered_date: new Date(),
            date:req.body.date,
            location:req.body.location,
            package:req.body.package,
            cost:req.body.cost,
            mobile:req.body.mobile,
            count:req.body.count,
            eventname:req.body.eventname,
            email:req.body.email,
            status:false,
            manager:"NOT ASSIGNED"
        });
        await new_event.save();
        console.log('new_event', new_event)
        let eventsList = await Event.find({ email: req.user.email });
        console.log(eventsList)
        req.user.eventsList = eventsList;
        return res.render('home', {
            title: 'Home Page',
            eventsList:eventsList
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.regEvent = async (req, res) => {
    try {
        let new_event = await Event.create({
            name: req.body.name,
            user: req.user._id,
            content: req.body.content,
            registered_date: new Date(),
            date:req.body.date,
            location:req.body.location,
            package:req.body.package,
            cost:req.body.cost,
            mobile:req.body.mobile,
            count:req.body.count,
            eventname:req.body.eventname,
            email:req.body.email,
            status:false,
            manager:"NOT ASSIGNED"
        });
        await new_event.save();
        console.log('new_event', new_event)
        let eventsList = await Event.find({ email: req.user.email });
        console.log(eventsList)
        req.user.eventsList = eventsList;
        return res.render('home', {
            title: 'Home Page',
            eventsList:eventsList
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.birthday = async (req, res) => {
    try {
        return res.render('registerForm', {
            title: 'Home Page',
            eventinfo:"Birthday",
            clientname:req.user.username
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.regBirthday = async (req, res) => {
    try {
        let new_event = await Event.create({
            name: req.body.name,
            user: req.user._id,
            content: req.body.content,
            registered_date: new Date(),
            date:req.body.date,
            location:req.body.location,
            package:req.body.package,
            cost:req.body.cost,
            mobile:req.body.mobile,
            count:req.body.count,
            eventname:req.body.eventname,
            email:req.body.email,
            status:false,
            manager:"NOT ASSIGNED"
        });
        await new_event.save();
        console.log('new_event', new_event)
        let eventsList = await Event.find({ email: req.user.email });
        console.log(eventsList)
        req.user.eventsList = eventsList;
        return res.render('home', {
            title: 'Home Page',
            eventsList:eventsList
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.anniversary = async (req, res) => {
    try {
        return res.render('registerForm', {
            title: 'Home Page',
            eventinfo:"Marriage Anniversary",
            clientname:req.user.username
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.regAnniversary = async (req, res) => {
    try {
        let new_event = await Event.create({
            name: req.body.name,
            user: req.user._id,
            content: req.body.content,
            registered_date: new Date(),
            date:req.body.date,
            location:req.body.location,
            package:req.body.package,
            cost:req.body.cost,
            mobile:req.body.mobile,
            count:req.body.count,
            eventname:req.body.eventname,
            email:req.body.email,
            status:false,
            manager:"NOT ASSIGNED"
        });
        await new_event.save();
        console.log('new_event', new_event)
        let eventsList = await Event.find({ email: req.user.email });
        console.log(eventsList)
        req.user.eventsList = eventsList;
        return res.render('home', {
            title: 'Home Page',
            eventsList:eventsList
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.newYear = async (req, res) => {
    try {
        return res.render('registerForm', {
            title: 'Home Page',
            eventinfo:"New Year",
            clientname:req.user.username
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

module.exports.regNewYear = async (req, res) => {
    try {
        let new_event = await Event.create({
            name: req.body.name,
            user: req.user._id,
            content: req.body.content,
            registered_date: new Date(),
            date:req.body.date,
            location:req.body.location,
            package:req.body.package,
            cost:req.body.cost,
            mobile:req.body.mobile,
            count:req.body.count,
            eventname:req.body.eventname,
            email:req.body.email,
            status:false,
            manager:"NOT ASSIGNED"
        });
        await new_event.save();
        console.log('new_event', new_event)
        let eventsList = await Event.find({ email: req.user.email });
        console.log(eventsList)
        req.user.eventsList = eventsList;
        return res.render('home', {
            title: 'Home Page',
            eventsList:eventsList
        });
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}


module.exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        let eventsList = await Event.find({});
        // console.log('event', event)
        console.log('req.body',req.body)
        event.manager=req.body.manager;
        await event.save();
        return res.render('adminHome', {
            title: 'Home Page',
            eventsList:eventsList
        });
        // return res.redirect('back');
    } catch (error) {
        console.log('Error', error);
        return res.redirect('back');
    }
}

