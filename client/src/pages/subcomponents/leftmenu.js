import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Leftmenu=()=>{
    let navigate = useNavigate();

    return(
        
        <div className="leftmenuwrapper" style={{zIndex:"20"}}>
        <Link to={"/feed"}>
        <div style={{}}>
        <div  style={{display:"flex",gap:"1rem",height:"4rem",alignItems:"center"}} className="menu-item active">
                        <span><i className="uil uil-home"></i></span><h3>Home</h3>
        </div>
        </div>
        </Link>
        <Link to={"/chats"}>
        <div>
        <div  style={{display:"flex",gap:"1rem",height:"4rem",alignItems:"center"}} className="menu-item active">
                        <span><i className="uil uil-envelope"></i></span><h3>Messages</h3>
        </div>
        </div>
        </Link>
        <div>
        <div style={{display:"flex",gap:"1rem",height:"4rem",alignItems:"center"}} className="menu-item active">
                        <span><i className="uil uil-palette"></i></span><h3>Followings</h3>
        </div>
        </div>
        <div>
        <div style={{display:"flex",gap:"1rem",height:"4rem",alignItems:"center"}} className="menu-item active">
                        <span><i className="uil uil-setting"></i></span><h3>Settings</h3>
        </div>
        </div>
        </div>
       
    )
}

export default Leftmenu;