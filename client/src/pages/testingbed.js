import React, { useState,useEffect } from "react";
import './testbed.css';
import Navbar from './subcomponents/newsubcomponents/navbar';
import Rightsidebar from './subcomponents/newsubcomponents/rightsidebar';
import Leftsidebar from './subcomponents/newsubcomponents/leftsidebar';
import Middlepart from './subcomponents/newsubcomponents/middlepart';

 const Testbed=()=>{
return(
    <>
    <Navbar/>
    <main>
        <div className="container">
        
    <Leftsidebar/>
    <Middlepart/>
    <Rightsidebar/>
        </div>
    </main>    
    
    
    </>
);

}
export default Testbed;
