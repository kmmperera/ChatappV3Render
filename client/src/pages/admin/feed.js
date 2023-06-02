import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateuser, signout } from '../../actions/authactions';
import { createpost, getpostbyuser, deletePost, like, unlike, getNewsFeed } from '../../actions/admin/post';
import { getfriendsuggestions } from '../../actions/admin/getuseractions';
import SinglePost from '../subcomponents/singlepost';
import FriendSuggestions from '../subcomponents/friendsuggestions';
import LeftSidebar from '../subcomponents/leftsidebar';
import { useParams } from 'react-router-dom';
import Navbar from '../subcomponents/newsubcomponents/navbar';
import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
import { Link } from 'react-router-dom';
import Leftmenu from '../subcomponents/leftmenu';
import UserList from '../subcomponents/userslist';

import './form.css';
const uploadsurl = process.env.REACT_APP_IMG;
const api = process.env.REACT_APP_API;
const Feed = (props) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const postred = useSelector((state) => state.post);
	const allusers = useSelector((state) => { return state.users });

	const [feedposts, setFeedposts] = useState({});
	const [posttext, setPosttext] = useState("");



	const { uid: uidparams } = useParams();


	const [uid, setUid] = useState(uidparams);

	const { user: userred } = auth;
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



	useEffect(() => {
		if (allusers.suggestions && allusers.suggestions.length > 0) {
			console.log(allusers.suggestions);
		}
	}, [allusers.suggestions]);


	const logout = () => { dispatch(signout()); }
	if (userred && userred._id == "") {
		return (
			<>
				<Navbar />
				<div> <p style={{ margin: "50px 100px", fontSize: "40px" }}>Please log in ...</p></div>


			</>
		);

	}
	return (
		<>
			<Navbar />
			<div className="mainpostpage" style={{ display: "flex", margin: "5rem auto", width: "80%" }}>
				<div className="postpageleft" style={{ flex: "1" }}>
					{

						<LeftSidebar userId={userred && userred._id} />
					}
					
					{<Leftmenu/>}
					{
						<>
						<div className="followingh4" style={{marginTop:"1rem"}}><h4>Following:</h4></div>
													<UserList displayuser={allusers && allusers.userbyid && allusers.userbyid.length > 0 && allusers.userbyid[0]._id} userlist={allusers && allusers.userbyid && allusers.userbyid.length > 0 && allusers.userbyid[0].following} />
						</>
					}
				</div>
				<div className="postswrapper" style={{ flex: "3", margin: "0px 30px", }}>
					{userred._id ?
						<div style={{ backgroundColor: "#ffffff", borderRadius: "5px" }}>
							<div style={{ margin: "15px" }}>
								<textarea placeholder="What's in your mind..."  style={{padding:"0.5rem", backgroundColor:"#f0eef6", width: "100%", height: "80px", marginTop: "20px", borderRadius: "5px" }} value={posttext} onChange={(e) => { setPosttext(e.target.value) }} />

								<input style={{ background: "#11a8ab", }} type="submit" value="Post" onClick={cPost} />

							</div>
						</div> : null
					}
					<div>
						{
							Object.keys(feedposts).map((p, index) => {



								return (
									<div style={{ marginTop: "10px", backgroundColor: "hsl(252,30%,100%)", borderRadius: "1rem" }} key={index}>


										<SinglePost key={index} postId={feedposts[p]._id} likes={feedposts[p].likes} loggeduser={userred._id} text={feedposts[p].text}
											comments={feedposts[p].comments} postedBy={feedposts[p].postedBy.firstName} profilepic={feedposts[p].postedBy.pofilePicture}
											postUserId={feedposts[p].postedBy._id}
										/>
									</div>
								)
							}
							)




						}
					</div>
				</div>
				<div className="postpageright" style={{ flex: "1" }}>
					{


						<FriendSuggestions />
					}
				</div>

			</div>


		</>
	);

}
export default Feed;
