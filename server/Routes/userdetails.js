const express = require('express');
const router = express.Router();
const { getallusers,getsuggestions,userByID,addToFollowingList,addToFollowersList,removeOneFromFollowingList,removeOneFromFollowersList,changeProfilePic,getInbox} = require('../Controllers/getusers');
const {s3middleware} =require('../Middleware/upload');
const {requireSignin} =require('../Middleware/authmiddleware');
router.get('/getallusers',getallusers);
router.post('/getInbox',requireSignin,getInbox);
router.post('/getfriendsuggestions',requireSignin,getsuggestions);
router.post('/userByID',userByID);
router.post('/follow',requireSignin ,addToFollowingList,addToFollowersList);
router.post('/unfollow',requireSignin,removeOneFromFollowingList,removeOneFromFollowersList);
router.post('/changeProfilePic',requireSignin ,s3middleware.single("profilepic"),changeProfilePic);

module.exports = router;