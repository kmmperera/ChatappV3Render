import axios from '../api';
//import { resolve } from 'dns';
//import axios from 'axios';

const createpost=(details)=>{
	const {post,propic,fname} = details;

console.log(details);
	return async(dispatch)=>{
		try{
			let res;
      		res=await axios.post("/create",{post});
			if(res.status === 200){

				let {posts,postid}=res.data;

			//	delete posts.postedBy;
				let updatedpostedBy={_id:post.postedBy ,pofilePicture:propic,firstName:fname};
				
				let updatedpost={...posts[postid],postedBy:updatedpostedBy};
				posts[postid]=updatedpost;
				let postswithpropic=posts;
				console.log(postswithpropic);
			
			dispatch({ type: "getpostsuccess",payload:{postswithpropic}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "getpostfailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "getpostfailed",payload:{error}});
		}

	}


}
const getpostbyuser=(user)=>{
	return async(dispatch)=>{
		try{
			let res;
		    dispatch({ type: "clearposts"});

      		res=await axios.post("/getpostbyuser",{user});
			if(res.status === 200){

				let {postsobj}=res.data;
			dispatch({ type: "getpostssuccess",payload:{posts :postsobj}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "getpostfailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "getpostfailed",payload:{error}});
		}

	}


}

const like=(details)=>{
	return async(dispatch)=>{
		try{
			let res;
			//details={postId:.....,userId:.....};
      		res=await axios.post("/like",{details});
			if(res.status === 200){

				let {likedPost}=res.data;
			dispatch({ type: "likesuccess",payload:{likedPost,details}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "likefailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "likefailed",payload:{error}});
		}

	}


}


const unlike=(details)=>{
	return async(dispatch)=>{
		try{
			let res;
			//details={postId:.....,userId:.....};
      		res=await axios.post("/unlike",{details});
			if(res.status === 200){

				let {unlikedPost}=res.data;
			dispatch({ type: "unlikesuccess",payload:{unlikedPost}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "unlikefailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "unlikefailed",payload:{error}});
		}

	}


}

const comment=(details)=>{
	return async(dispatch)=>{
		try{
			let res;
			//details={postId:.....,comment:{userId:......text:...}};
			//postedBy
      		res=await axios.post("/comment",{details});
			if(res.status === 200){

				let {commentedPost}=res.data;
			dispatch({ type: "commentsuccess",payload:{commentedPost}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "commentfailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "commentfailed",payload:{error}});
		}

	}


}


const deletecomment=(details)=>{
	return async(dispatch)=>{
		try{
			let res;
			//details={postId:.....,comment:{commentId:......}};
      		res=await axios.post("/deletecomment",{details});
			if(res.status === 200){

				let {uncommentedPost}=res.data;
			dispatch({ type: "commentdeletesuccess",payload:{uncommentedPost,details}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "commentdeletefailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "commentdeletefailed",payload:{error}});
		}

	}


}


const postByID=(details)=>{
	return async(dispatch)=>{
		try{
			let res;
		   // dispatch({ type: "clearposts"});
		// details={id:...}
      		res=await axios.post("/postByID",{details});
			if(res.status === 200){

				let {post}=res.data;
			dispatch({ type: "postByIDsuccess",payload:{post}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "postByIDfailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "postByIDfailed",payload:{error}});
		}

	}


}

const getNewsFeed=(details)=>{
	return async(dispatch)=>{
		try{
			let res;
		   // dispatch({ type: "clearposts"});
		// details={following:,loggeduser:}
      		res=await axios.post("/getNewsFeed",{details});
			if(res.status === 200){

				let {feed}=res.data;
			dispatch({ type: "feedsuccess",payload:{feed}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "feedfailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "feedfailed",payload:{error}});
		}

	}


}


const deletePost=(details)=>{
	return async(dispatch)=>{
		try{
			let res;
		   // dispatch({ type: "clearposts"});
		// details={postId:}
      		res=await axios.post("/deletePost",{details});
			if(res.status === 200){

				let {deletedPost}=res.data;
			dispatch({ type: "deletepostsuccess",payload:{deletedPost,details}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "deletepostfailed",payload:{error}});
				}
		}
		catch(error){
	 dispatch({ type: "deletepostfailed",payload:{error}});
		}

	}


}



export {createpost,getpostbyuser,postByID,getNewsFeed,deletePost,like,unlike,comment,deletecomment};
