import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletecomment, comment, deletePost, like, unlike } from '../../actions/admin/post';
import { Link } from 'react-router-dom';

const SinglePost = (props) => {
	const [deletedcommentid, setDeletedcommentid] = useState("");
	const postred = useSelector((state) => state.post);
	const dummyimg = "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";
	const dispatch = useDispatch();
	const [textarea, setTextarea] = useState("");
	const auth = useSelector((state) => state.auth);
	const { user: userred } = auth;

	const [deletepostid, setDeletepostid] = useState("");
	const [likedpostid, setLikedpostid] = useState("");
	const [dislikedpostid, setDislikedpostid] = useState("");


	let hasliked = props.likes && props.likes.includes(props.loggeduser);
	let hascomments = props.comments && props.comments.length > 0;

	const newcomment = (postid) => {
		if (textarea && textarea != "") {
			dispatch(comment({ postId: postid, comment: { postedBy: props.loggeduser, text: textarea } }));
			setTextarea("");
		}

	}
	const deletecommentfunc = (commentid, postid) => {

		if (commentid) {

			dispatch(deletecomment({ postId: postid, comment: { _id: commentid } }));

		}

	}
	const handleChange = (event) => {
		setTextarea(event.target.value);

	}



	useEffect(() => {

		if (deletepostid && deletepostid != "") {

			dispatch(deletePost({ postId: deletepostid }));
		}

	}, [deletepostid]);

	useEffect(() => {

		if (likedpostid && likedpostid != "") {

			dispatch(like({ postId: likedpostid, userId: userred._id }));
		}

	}, [likedpostid]);

	useEffect(() => {

		if (dislikedpostid && dislikedpostid != "") {

			dispatch(unlike({ postId: dislikedpostid, userId: userred._id }));
		}

	}, [dislikedpostid]);



	return (
		<>
			<div style={{ padding: "20px", }}>
				<div style={{ display: "flex" }}>
					<p><Link style={{textDecoration:"none"}} to={`/posts/${props.postUserId }`}><img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={props.profilepic ? props.profilepic : dummyimg} /></Link></p>
					<p style={{ flex: "9", padding: "10px 0px", marginLeft: "10px" }}><Link  style={{textDecoration:"none"}} to={`/posts/${props.postUserId }`}> {props.postedBy && props.postedBy}</Link> </p>
					<div style={{ flex: "1" }}>
						{props.postUserId == userred._id ?
							(<input type="submit" value="X" style={{ color: "grey", background: "white", padding: "5px", width: "30px", textAlign: "center" }} onClick={() => { setDeletepostid(props.postId) }} />) : null
						}
					</div>

				</div>
				<p style={{ paddingBottom: "40px" ,paddingLeft:"1rem",paddingTop:"1rem"}}> {props.text} </p>

				<div style={{}}>
					<p>{props.likes && props.likes.length} people like this post </p>
					<input type="submit" value={hasliked ? "unlike" : "like"} style={{ position: "relative", top: "10px", width: "50px", textAlign: "center", color: "white", background: "#009DDC", padding: "10px" }} onClick={() => { hasliked ? setDislikedpostid(props.postId) : setLikedpostid(props.postId) }} />


				</div>

				<div className="commentbox" style={{ display: "flex", textAlign: "center", alignItems: "center" }}>
					<div style={{ flex: "9", padding: "15px 0px" }}>
						<textarea placeholder="Make a comment..." style={{padding:"0.5rem", backgroundColor:"#f0eef6",display: "inline-block", borderRadius: "5px", height: "40px", width: "100%", borderBottomRightRadius: "0px", borderTopRightRadius: "0px" }} value={textarea} onChange={handleChange} />
					</div>
					<div style={{ flex: "1", }}>
						<input onClick={() => { newcomment(props.postId) }} type="submit" value="comment"
							style={{ position: "relative", bottom: "2px", color: "white", background: "#11a8ab", padding: "0px", height: "40px", borderBottomLeftRadius: "0px", borderTopLeftRadius: "0px" }} />
					</div>
				</div>




				<div className="commentrow" style={{ borderTop: "1px solid grey" }}>
					{
						hascomments ? props.comments.map((c, idx) => {
							return (
								<div style={{marginTop:"1rem"}} key={idx}  >
									<div style={{ display: "flex", width: "90%" }}>
										<p>
										<Link style={{textDecoration:"none"}} to={`/posts/${c.postedBy._id }`}>
											<img src={c && c != null && c.postedBy.pofilePicture ? c.postedBy.pofilePicture : dummyimg} style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
										</Link>
										</p>
										<p style={{ bottom: "70%", display: "inline-block" }}>
										<Link style={{display:"inline-block",textDecoration:"none",marginLeft:"1rem"}} to={`/posts/${c.postedBy._id }`}>

										{c && c != null && c.postedBy.firstName}
										</Link>
										</p>
										<p style={{flex: "14",  position: "relative" }}><br /> {c && c != null && c.text}</p>
										{c && c != null && c.postedBy._id == userred._id ?
											(<input onClick={() => { deletecommentfunc(c._id, props.postId) }} type="submit" value="X" style={{ height: "20px", color: "grey", background: "white", padding: "1px", flex: "1" }} />) : null
										}
									</div>
								</div>
							)

						}) : null

					}
				</div>


			</div>

		</>

	);
}

export default SinglePost;
