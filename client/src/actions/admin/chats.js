import axios from '../api';
//import axios from 'axios';

const getchat=(user)=>{
	return async(dispatch)=>{
		try{
			let res;
			let id=user._id;
      			let logged=user.loggedid;

			res=await axios.get(`/getchats/${id}`,{
        headers:{
          'loggeduser' :logged

        },


      });
			if(res.status === 200){

				let {chats}=res.data;
			dispatch({ type: "getchatssuccess",payload:{chats}});
					}
			else{
			let {error}=res.data;
			dispatch({ type: "getchatsfailed",payload:{error}});
				}
		}
		catch(error){
	dispatch({ type: "getchatsfailed",payload:{error}});
		}

	}


}
export {getchat};
