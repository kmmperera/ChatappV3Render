const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//routes
const authRoutes = require("./Routes/auth");
const userhRoutes = require("./Routes/user");
const workRoutes = require("./Routes/work");
const userdetailsRoutes = require("./Routes/userdetails");
const notificationRoutes = require("./Routes/notifications");
const chatRoutes = require("./Routes/chats");
const postRoutes = require("./Routes/post");

const {savemessagetodb ,sendtoofflines} = require('./Controllers/notifications');
//environment variable or you can say constants
env.config();
const dblink=process.env.DB_LINK;
const port=process.env.PORT || 4000;
// mongodb connection
mongoose
  .connect(
   dblink,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

const corsOptions = {
    
    origin:"*",
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

/*
app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "https://chatmev3.onrender.com"); 

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/



if(process.env.NODE_ENV === 'production'){
		app.use(express.static('client/build'));
	//app.use(express.static(path.join(__dirname, 'client/build')));

}

  app.use("/uploads", express.static('uploads'));
 app.use("/api", authRoutes);
 app.use("/api", userhRoutes);
 app.use("/api", workRoutes);
  app.use("/api", userdetailsRoutes);
app.use("/api",notificationRoutes);
app.use("/api",chatRoutes);
app.use("/api",postRoutes);
app.use("/api/test",(req,res)=>{res.status(200).json({reply:"hello from api"});});






let backendserver =app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

let io = require('socket.io')(backendserver, {
  cors: {
    origin: '*',
  }
});

app.get('*', (req,res) =>{
let reqpath=req.originalUrl;
if(reqpath.startsWith("/uploads")){
app.use("/uploads", express.static('uploads'));
}
else{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'),);
	 //   res.sendFile(path.join(__dirname+'/client/build/index.html'));
	   //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

}


	});



let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};




io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
	
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.to(socket.id).emit("welcome",{message:"hello from server"});
   // not required  io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage",  async ({ sender, reciever, message }) => {
	let details={sender, reciever, message};
	//let dbstatus;
    const user = getUser(reciever);
	if(user){

	let myPromise = new Promise(function(myResolve, myReject) {
	let dbstatus1 = savemessagetodb(details);

		if (dbstatus1 ) {
   			 myResolve("OK");
  		} else {
    			myReject("Error");
 		 }
	});

	myPromise.then(
  		function(value) {
		 io.to(user.socketId).emit("getMessage", {sender,message, });
			console.log("sent");
			},
 		 function(error) {
		io.to(user.socketId).emit("getMessage", {sender,message, });
		console.log(error);
			}
		);






   // io.to(user.socketId).emit("getMessage", {
    //  sender,
    //  message,
   // });
	
	//let dbstatus1 = savemessagetodb(details);
	//console.log(sender+" send message to : "+reciever+" message is : "+message);
	//console.log("db status "+ dbstatus1);
	 

	}
	if(!user){
	 let dbstatus2 = sendtoofflines(details);
	console.log("reciver is not online");
	//console.log("db status "+ dbstatus2);

	}
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
   // not required  io.emit("getUsers", users);
  });
});





