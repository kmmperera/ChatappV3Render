import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfriendsuggestions, follow, unfollow } from '../../actions/admin/getuseractions';
import { Link } from 'react-router-dom';

const FriendSuggestions = (props) => {
	const allusers = useSelector((state) => { return state.users });
	const auth = useSelector((state) => state.auth);
	const { user: userred } = auth;
	const [followid, setFollowid] = useState("");
	const [unfollowid, setUnfollowid] = useState("");
	const dummyimg = "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";

	const dispatch = useDispatch();

	useEffect(() => {
		if (allusers.suggestions) {
			console.log(allusers.suggestions);
		}
	}, [allusers.suggestions]);

	useEffect(() => {

		if (followid && followid != "") {
			dispatch(follow({ followingid: followid, loggeduser: userred._id }));
			dispatch({ type: "addAFollower", payload: { followingid: followid } });
		}
	}, [followid]);
	useEffect(() => {
		if (unfollowid && unfollowid != "") {
			dispatch(unfollow({ followingid: unfollowid, loggeduser: userred._id }));
			dispatch({ type: "removeAFollower", payload: { followingid: unfollowid } });
		}
	}, [unfollowid]);


	useEffect(() => {
		if (userred._id != "") {
			dispatch(getfriendsuggestions({ id: userred._id, following: userred.following }));
		}
	}, [userred._id]);


	return (
		<>
			{

				allusers.suggestions && Object.keys(allusers.suggestions).length > 0 && Object.keys(allusers.suggestions).map((s, index) => {
					let followedbyloggeduser = allusers.suggestions[s].followers && allusers.suggestions[s].followers.find((f) => { return f._id == userred._id });
					return (
						<div style={{display:"flex", padding: "15px 5px",marginBottom: "0.7rem",  backgroundColor: "#ffffff", borderRadius: "1rem" }} key={index}>
							<p style={{}}>
							<Link style={{ textDecoration: "none" }} to={`/posts/${allusers.suggestions[s]._id}`}>

							<img style={{ height: "2.7rem", width: "2.7rem", borderRadius: "50%" }} src={allusers.suggestions[s].pofilePicture ? allusers.suggestions[s].pofilePicture : dummyimg} />
							</Link>
							</p>
							<div style={{ marginLeft: "10px" }}>
								<Link style={{ textDecoration: "none" }} to={`/posts/${allusers.suggestions[s]._id}`}>
									<p style={{  }}>
										{`${allusers.suggestions[s].firstName} `}
									</p>
								</Link>
								<input type="submit" value={followedbyloggeduser ? "Unfollow" : "Follow"} style={{flex:"1", padding: "0.6rem ", background: "#009DDC" ,borderRadius:"0.5rem"}} onClick={() => { followedbyloggeduser ? setUnfollowid(allusers.suggestions[s]._id) : setFollowid(allusers.suggestions[s]._id) }} />

							</div>
							
							
						</div>
					)

				})

			}

		</>

	);
}

export default FriendSuggestions;
