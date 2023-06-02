const initState = {
	
	workdetails:[],
	workerror:null,
	
	
}
const workdetails=(state = initState, action) => {
	
	switch (action.type) {
		
		case "workdetailssuccess":
            state = {
                
				workdetails:action.payload.workdetails,
            }
            break;
			
		case "workdetailsfailed":
            state = {
                ...initState,
				workerror:action.payload.error,
            }
            break;	
	}
	return state;
}
export default workdetails;
