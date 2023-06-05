import React, { useState, useEffect, useRef, useCallback } from "react";

import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
import { useDispatch, useSelector } from "react-redux";
import { sendnotifications } from '../../actions/admin/notifications';
import { getchat } from '../../actions/admin/chats';
import '../form.css';
import { getallusers, getInbox } from '../../actions/admin/getuseractions';
import { io } from "socket.io-client";
import Navbar from '../subcomponents/newsubcomponents/navbar';

const Chats = (props) => {

	const dispatch = useDispatch();

	const auth = useSelector((state) => { return state.auth });
	const chatsred = useSelector((state) => { return state.chats });
	const { user: userred } = auth;
	const [message, setMessage] = useState("");
	const [reciever, setReciever] = useState("");
	const [recievername, setRecievername] = useState("");

	const allusers = useSelector((state) => { return state.users });
	const [displaymessages, setDisplaymessages] = useState(chatsred.chats);
	let localchat = chatsred.chats;
	let chatuser = { _id: reciever, loggedid: userred._id };

	const socket = useRef(null);
	const [arrivalMessage, setArrivalMessage] = useState({ sender: "", message: "" });
    const dummyimg = "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";

	const ownchat = {
		textAlign: "left", minHeight: "50px", backgroundColor: "#6b4ce6", marginTop: "10px", marginBottom: "10px", maxWidth: "40%", marginLeft: "60%",
		borderRadius: "5px",color:"#ffffff",padding:"5px"
	};
	const otherchat = {
		textAlign: "left", minHeight: "50px", backgroundColor: "#6b4ce6", marginTop: "10px", maxWidth: "40%", borderRadius: "5px",
		marginBottom: "10px",color:"#ffffff",padding:"5px"
	};

	const setRef = useCallback(node => {
		if (node) {
			node.scrollIntoView({ smooth: true })
		}
	}, [])
	const chatuserstyle = { display:"flex",lineHeight: "50px", color: "black", backgroundColor: "#ffffff", borderBottom: "1px solid #f1f1f1", textAlign: "center", cursor: "pointer" };
	const chatuseractivestyle = {display:"flex",lineHeight: "50px", color: "#009DDC", backgroundColor: "#ffffff", borderBottom: "1px solid #f1f1f1", textAlign: "center", cursor: "pointer" };

	useEffect(() => {
		dispatch(getallusers());

	}, []);

	useEffect(() => {
		if (userred && userred._id != "") {
			dispatch(getInbox({ id: userred._id }));
		}
	}, [userred._id]);

	useEffect(() => {

		console.log(allusers.inbox);

	}, [allusers.inbox]);
	useEffect(() => {
		if (reciever !== "" && reciever !== "notselected") {
			dispatch(getchat(chatuser));
		}
	}, [displaymessages]);


	useEffect(() => {
		if (socket.current == null) {
			socket.current = io("https://chatmev3.onrender.com:10000");
			socket.current.emit("addUser", userred._id);
		}

		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.sender,
				message: data.message,
			});

			console.log(data);

		});
		return () => socket.current.disconnect();
	}, []);

	useEffect(() => {
		socket.current.on("welcome", (message) => {
			console.log(message);

		});
		console.log(arrivalMessage);
	}, [userred._id]);




	useEffect(() => {
		if (allusers.inbox && allusers.inbox.length > 0) {
			setReciever(allusers.inbox[0].messenger._id);
		}
	}, [allusers]);


	useEffect(() => {
		if (arrivalMessage.message !== "") {
			let notifiction = { message: arrivalMessage.message, reciever: userred._id, sender: arrivalMessage.sender };
			localchat = [...localchat, notifiction];
			dispatch({ type: "newmessage", payload: { localchat } });

		}
		console.log(arrivalMessage);
	}, [arrivalMessage]);
	useEffect(() => {
		if (reciever !== "" && reciever !== "notselected") {
			getChat();
		}
	}, [reciever]);

	const sendNoti = () => {
		let notifiction = { message: message, reciever: reciever, sender: userred._id };
		localchat = [...localchat, notifiction];
		dispatch({ type: "newmessage", payload: { localchat } });
		dispatch(sendnotifications(notifiction));
		setMessage("");
	}

	const goOnline = () => {
		socket.current.emit("addUser", userred._id);
		socket.current.on("welcome", (message) => { setArrivalMessage(message) });
	}
	const socketMessage = () => {
		let notifiction = { message: message, reciever: reciever, sender: userred._id };
		localchat = [...localchat, notifiction];
		dispatch({ type: "newmessage", payload: { localchat } });
		socket.current.emit("sendMessage", { sender: userred._id, reciever: reciever, message: message });
		setMessage("");
	}


	const getChat = () => {


		dispatch(getchat(chatuser));
	}
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
			<div className="mainChat" style={{marginLeft: "10px", marginTop: "5rem ", display: "flex", alignItems: "center", height: "80vh", }}>
				<div className="scrollusers" style={{ position: "relative", height: "100%",width:"25%" }}>
					<div className="friendlist" style={{ width:"100%",borderRadius: "5px", background: "#ffffff", overflowY: "auto", maxHeight: "97%", maxHeight: "100%"}}>
						{

							allusers.inbox && allusers.inbox.map((u, index) => (
								<div className="usernamep" onClick={() => { setReciever(u.messenger._id); setRecievername(u.messenger.firstName); }}
									style={reciever == u.messenger._id ? chatuseractivestyle : chatuserstyle}
									key={u.messenger._id} value={u.messenger._id} >
								<p style={{margin:"1rem",overflow:"hidden",borderRadius:"50%",height:"2.7rem",width:"2.7rem"}}><img  src={u.messenger.pofilePicture ? u.messenger.pofilePicture:dummyimg}/></p>	<p className="inboxname">{u.messenger.firstName}</p>
								</div>
							))

						}
					</div>

				</div>


				<div className="rightwrapper" style={{ height: "100%" ,width:"55%"}}>

					<div className="chatbox" style={{ padding: "5px", borderRadius: "5px", background: "#ffffff", overflowY: "scroll", maxHeight: "100%", height: "75%" }}>

						{localchat &&
							localchat.length > 0 ? localchat.map((c, index) => {
								let isownmessage = c.sender === userred._id;
								return (<p ref={index === localchat.length - 1 ? setRef : null} style={isownmessage ? ownchat : otherchat} key={index} >{c.message}</p>)
							}
							) : (<p style={{color:"black"}}>You havent not started a conversation yet ,say hello to start </p>)


						}



					</div>


					<div style={{}}><input type="text" name="message" value={message} onChange={(e) => { setMessage(e.target.value) }} /></div>
					<div><input  style={{backgroundColor:"#6b4ce6"}} type="submit" value="SEND" onClick={socketMessage} /></div>


				</div>

			</div>




		</>
	);

}
export default Chats;
