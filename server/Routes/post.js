const express = require('express');
const router = express.Router();
const { create,getpostbyuser,postByID,getNewsFeed,deletePost,like,unlike,comment,deletecomment} = require('../Controllers/post');
const {requireSignin} =require('../Middleware/authmiddleware');


router.post('/create',requireSignin, create);
router.post('/getpostbyuser',getpostbyuser);
router.post('/postByID',postByID);
router.post('/getNewsFeed',getNewsFeed);
router.post('/deletePost',requireSignin,deletePost);
router.post('/like',requireSignin,like);
router.post('/unlike',requireSignin,unlike);
router.post('/comment',requireSignin,comment);
router.post('/deletecomment',requireSignin,deletecomment);

module.exports = router;