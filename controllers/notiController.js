const express = require("express");
const app = express;
const notiModel = require('../models/notificationModel');

const createnoti = async(req, res)=> {
    console.log('creating notification');
    req.body.read = "false";
    const notification = new notiModel(req.body);
    try{
        notification.save().then((response)=> {
            res.status(201).json(response);
            console.log(response);
        })
    }catch(err){
        res.status(500).json(err);
    }
}
const getNotificationsById = async(req, res)=> {
    const userId = req.body.userId;
    try {
        const notifications = await notiModel.find({receiverId: userId}).sort({createdAt: 'desc'});
        res.status(201).json(notifications);
    } catch (err) {
        res.status(500).json(err)
    }
    
}

const createShareNoti = async(req, res)=> {
    let receiverusers = req.body.receivers;
    let postId = req.body.postId;
    let senderId = req.body.senderId;
    let sendername = req.body.sendername;
    let msg = `<span className='font-bold text-lg'>${sendername}</span> shared a post with you`;
    receiverusers.forEach((user)=> {
         let notif = new notiModel({receiverId: user, senderId: senderId, postId: postId,message: msg, read: 'false'});
         notif.save().then((res)=> {
            console.log('saved');
         }).catch((err)=> {
            console.log(err);
         })

    })
    res.status(200).json('sent');
}
const makeNotiRead = async(req, res) => {
    try{
        const noti = await notiModel.findOneAndUpdate({_id: req.params.id}, {read: 'true'})
        res.status(200).json('updated');
    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = {createnoti, getNotificationsById, createShareNoti, makeNotiRead}