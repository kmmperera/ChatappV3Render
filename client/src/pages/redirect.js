import React from 'react';
import { Route, Navigate  } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    
        const user = window.localStorage.getItem('user');
        if(user){
		 return <Navigate  to={"/feed"} />
            
        }else{
           return children ;
        }
    
} 


export default PrivateRoute;


