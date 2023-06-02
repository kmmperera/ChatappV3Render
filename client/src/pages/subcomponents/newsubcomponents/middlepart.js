import React, { useState, useEffect } from "react";
import pro3 from '../../../images/pro3.jpg';
import { picObj, pro1, pro2, pro4, pro5, pro6, post1, post2, post3, post4, post5 } from './imageloader';
import { stories, posts } from './databaseobj';
import Postsub from './postsub';
import { useDispatch, useSelector } from "react-redux";
import { updateuser, signout } from '../../../actions/authactions';
import { createpost, getpostbyuser, deletePost, like, unlike, getNewsFeed } from '../../../actions/admin/post';
import { getfriendsuggestions } from '../../../actions/admin/getuseractions';
import SinglePost from '../singlepost';
import FriendSuggestions from '../friendsuggestions';
import LeftSidebar from '../leftsidebar';
import { useParams } from 'react-router-dom';


import { Link } from 'react-router-dom'
const uploadsurl = process.env.REACT_APP_IMG;
const api = process.env.REACT_APP_API;
const Middlepart = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const postred = useSelector((state) => state.post);
    const { user: userred } = auth;
    const [feedposts, setFeedposts] = useState({});
    const [posttext, setPosttext] = useState("");
    let post = {};

    let details = {};
    if (userred && posttext !== "") {
        post = { text: posttext, postedBy: userred._id };
        details = { post, propic: userred.pofilePicture, fname: userred.firstName };

    }




    const cPost = () => {
        if (post.postedBy) {
            dispatch(createpost(details));
            setPosttext("");
        }
    }


    useEffect(() => {

        setFeedposts(postred.feed);


    }, [postred.feed]);

    useEffect(() => {
        // details={following:,loggeduser:}
        if (userred._id && userred._id != "") {
            let feeddetails = { loggeduser: userred._id, following: userred.following };
            dispatch(getNewsFeed(feeddetails));
        }
    }, [userred._id, userred]);
    return (
        <>
            <div className="middle">

                <div className="stories">
                    {stories && Object.keys(stories).map((s, index) => {

                        return (
                            <div key={index} className="story">
                                <div className="profile-photo">
                                    <img src={picObj[stories[s].user.profilePic]} alt="" />
                                </div>
                                <p className="name">{stories[s].user.name}</p>

                            </div>
                        )
                    })

                    }
                </div>

                <form className="create-post">
                    <div className="profile-photo">
                        <img src={userred.pofilePicture ? userred.pofilePicture : null} alt="" />
                    </div>
                    <input value={posttext} onChange={(e) => { setPosttext(e.target.value) }} type="text" placeholder="whats in your mind user" id="create-post" />
                    <input type="submit" value="Post" className="btn btn-primary" onClick={cPost} />

                </form>

                <div className="feeds">
                    {
                        Object.keys(feedposts).map((p, index) => {
                            return (
                                <Postsub p={p} key={index+100} feedposts={feedposts}/>

                            )
                        })


                    }

                </div>

            </div>
        </>
    );

}
export default Middlepart;
