import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateuser, signout } from '../../actions/authactions';
import { createpost, getpostbyuser } from '../../actions/admin/post';
import { getfriendsuggestions } from '../../actions/admin/getuseractions';
import SinglePost from '../subcomponents/singlepost';
import FriendSuggestions from '../subcomponents/friendsuggestions';
import LeftSidebar from '../subcomponents/leftsidebar';
import UserList from '../subcomponents/userslist';
import { useParams } from 'react-router-dom';
import Navbar from '../subcomponents/newsubcomponents/navbar';
import Leftmenu from '../subcomponents/leftmenu';

import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
import { Link } from 'react-router-dom'
import './form.css';
const uploadsurl = process.env.REACT_APP_IMG;
const api = process.env.REACT_APP_API;
const Posts = (props) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const postred = useSelector((state) => state.post);
	const allusers = useSelector((state) => { return state.users });

	const [savedpost, setSavedpost] = useState({});
	const [posttext, setPosttext] = useState("");
	const [propic, setPropic] = useState(" ");
	const [fname, setFname] = useState(" ");




	const { uid: uidparams } = useParams();


	const [uid, setUid] = useState(uidparams);


	const { user: userred } = auth;
	let post = {};
	let user = {};
	let details = {};

	if (userred && posttext !== "") {
		post = { text: posttext, postedBy: userred._id };
		details = { post, propic: userred.pofilePicture, fname: userred.firstName };

	}





	const cPost = () => {
		if (post.postedBy && userred) {

			dispatch(createpost(details));
			setPosttext("");

		}
	}
	console.log(auth.user.firstName);


	useEffect(() => {
		if (userred) {
			setPropic(() => (userred.pofilePicture));
			setFname(() => (userred.firstName));
		}
	}, []);
	useEffect(() => {

		setSavedpost(postred.posts);
		console.log(savedpost);
		console.log(postred.posts);

		console.log(auth.user);

	}, [postred.posts]);
	useEffect(() => {



	}, [uidparams]);

	useEffect(() => {

		console.log(postred.posts);

	}, [postred]);



	useEffect(() => {
		user = { id: uidparams };
		dispatch(getpostbyuser(user));
		console.log(uidparams);
	}, [uidparams]);




	const logout = () => { dispatch(signout()); }

	if (userred && userred._id == "") {
		return (
			<>
				<Navbar />
				<div> <p style={{ margin: "50px 100px", fontSize: "40px" }}>Please log in ...</p></div>



			</>
		);

	}

	if (typeof uidparams == 'undefined' || uidparams == null || uidparams == "") {
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
				<div className="postpageleft" style={{ flex: "1", }}>
					{
						<>
							<LeftSidebar userId={uidparams} />
							<Leftmenu/>
							<div className="followingh4"  style={{marginTop:"1rem"}}><h4>Following:</h4></div>
							<UserList displayuser={allusers && allusers.userbyid && allusers.userbyid.length > 0 && allusers.userbyid[0]._id} userlist={allusers && allusers.userbyid && allusers.userbyid.length > 0 && allusers.userbyid[0].following} />
						</>
					}
				</div>
				<div className="postswrapper" style={{ flex: "3", margin: "0px 30px", }}>
					{uidparams == userred._id ?
						<div style={{ width: "100%", backgroundColor: "#ffffff", borderRadius: "5px" }}>
							<div style={{ margin: "15px" }}>
								
								<textarea placeholder="What's in your mind..." style={{padding:"0.5rem", backgroundColor:"#f0eef6", width: "100%", height: "80px", marginTop: "20px", borderRadius: "5px" }} value={posttext} onChange={(e) => { setPosttext(e.target.value) }} />
								<input className="postsubmitbtn" style={{ background: "#11a8ab", }} type="submit" value="Post" onClick={cPost} />

							</div>
						</div > : null
					}
					<div style={{ width: "100%", }}>
						{

							Object.keys(savedpost).map((p, index) => {



								return (
									<div style={{ marginTop: "10px", backgroundColor: "#ffffff", borderRadius: "1rem" }} key={index}>


										<SinglePost key={index} postId={savedpost[p]._id} likes={savedpost[p].likes} loggeduser={userred._id} text={savedpost[p].text}
											comments={savedpost[p].comments} postedBy={savedpost[p].postedBy.firstName} profilepic={savedpost[p].postedBy.pofilePicture}
											postUserId={savedpost[p].postedBy._id}
										/>
									</div>
								)
							}
							)

						}
					</div>
				</div>
				<div className="postpageright" style={{ flex: "1", }}>
					{
						<FriendSuggestions />
					}
				</div>

			</div>

		</>
	);

}
export default Posts;
