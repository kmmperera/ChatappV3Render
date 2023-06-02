import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userByID, changeProfilePic } from '../../actions/admin/getuseractions';
import MessageBox from './messagebox';
const LeftSidebar = (props) => {
	const allusers = useSelector((state) => { return state.users });
	const auth = useSelector((state) => state.auth);
	const { user: userred } = auth;
	const [currentuser, setCurrentuser] = useState([]);
	const [profilePicture, setprofilePicture] = useState();
	const[closeModel,setCloseModel]=useState(false);
    const wrapperRef = useRef(null);

	const dispatch = useDispatch();
	const dummyimg = "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";

	const leftsidebarbtnstyle={textAlign:"center",color:"#ffffff",backgroundColor:"#6b4ce6",padding:"0.2rem",borderRadius:"0.3rem",cursor:"pointer"};

	const handleProfilePicture = (e) => {
		setprofilePicture(e.target.files[0]);
	};

	const submitProductForm = () => {
		if (profilePicture) {
			const form = new FormData();


			form.append("id", userred._id);
			form.append("profilepic", profilePicture);


			dispatch(changeProfilePic(form));
		}
	};
	const toggleClass=()=>{
		setCloseModel(!closeModel) 
	}
	const useOutsideAlerter=(ref)=> {
		useEffect(() => {
		 
		  function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setCloseModel(false);
			}
		  }
		 
		  document.addEventListener("mousedown", handleClickOutside);
		  return () => {
		  
			document.removeEventListener("mousedown", handleClickOutside);
		  };
		}, [ref]);
	  }
	  
	  useOutsideAlerter(wrapperRef);
	useEffect(() => {
		if (props.userId && props.userId != "") {
			dispatch(userByID({ id: props.userId }));
		}
	}, [props.userId, allusers.userafterpicupdated, allusers.updatedUser]);

	useEffect(() => {
		setCurrentuser(allusers.userbyid);
		console.log(allusers.userbyid);
	}, [allusers.userbyid, currentuser]);



	return (
		<>

			{<div className="lefttop" style={{ backgroundColor: "#ffffff", borderRadius: "5px" }}>
				<div style={{ display: "flex", gap: "1rem",alignItems:"center" }}>
					<div style={{ margin: "10px" }}> <img style={{ height: "2.7rem", width: "2.7rem", borderRadius: "50%" }} src={allusers && allusers.userbyid[0] && allusers.userbyid[0].pofilePicture ? allusers.userbyid[0].pofilePicture : dummyimg} /></div>
					<div>
						<div style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px", textAlign: "center" }}> {currentuser && currentuser.length > 0 && currentuser[0].firstName}</div>
						{props.userId === userred._id ?
							<div style={{position:"relative"}}>
								<p onClick={toggleClass} style={leftsidebarbtnstyle}>Edit</p>
								<div ref={wrapperRef}>
								<div className={`editmodal ${closeModel ? "closeOn":null}`}>
								<p>Change Profile Picture</p>
								<input style={{margin:"1rem auto"}} type="file" name="profilepic" onChange={handleProfilePicture} />
								<input style={{width:"40%",margin:"1rem auto"}}type="submit" value="UPLOAD" onClick={submitProductForm}/>
								</div>
								</div>
							</div> : <div  style={{position:"relative"}}>
								<p onClick={toggleClass} style={leftsidebarbtnstyle}>Message</p>
								<div  ref={wrapperRef}>
								<div className={`editmodal ${closeModel ? "closeOn":null}`}>
								<p>Send a message </p>
								<MessageBox reciever={ props.userId}/> 
								</div>
								</div>
								</div>
						}

					</div>
				</div>


			</div>
			}

		</>

	);
}

export default LeftSidebar;
