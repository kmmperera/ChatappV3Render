import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletecomment, comment, deletePost, like, unlike } from '../../../actions/admin/post';
import { picObj, pro1, pro2, pro4, pro5, pro6, post1, post2, post3, post4, post5 } from './imageloader';

const Postsub = (props) => {
   
    const dummyimg = "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";
    const dispatch = useDispatch();
    const [textarea, setTextarea] = useState("");
    const auth = useSelector((state) => state.auth);
    const { user: userred } = auth;

    const [deletepostid, setDeletepostid] = useState("");
    const [likedpostid, setLikedpostid] = useState("");
    const [dislikedpostid, setDislikedpostid] = useState("");
    const[closeModel,setCloseModel]=useState(false);

    let hasliked = props.feedposts[props.p].likes && props.feedposts[props.p].likes.includes(userred._id);
    let hascomments =props.feedposts[props.p].comments  && props.feedposts[props.p].comments.length > 0;

    const wrapperRef = useRef(null);
    const newcomment = (postid) => {
       
        if (textarea && textarea != "") {
            dispatch(comment({ postId: postid, comment: { postedBy:userred._id , text: textarea } }));
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

    useEffect(()=>{
        console.log(closeModel);
    },[closeModel]);

    return (
        <>
           <div  className="feed">
                                    <div className="head">
                                        <div className="user">
                                            <div className="profile-photo">
                                                <img src={props.feedposts[props.p].postedBy.pofilePicture || pro1} alt="" />
                                            </div>
                                            <div className="ingo">
                                                <h3>Kelly Fedral</h3>
                                                <small>California,15 MINUTES AGO</small>
                                            </div>

                                        </div>
                                        <div ref={wrapperRef} className="edit">
                                            <i onClick={toggleClass} className="uil uil-ellipsis-h "></i>
                                            <div  className={`closebutton ${closeModel ? "closeOn":null}`}>
                                              { props.feedposts[props.p].postedBy._id ==userred._id ? <p>Delete</p> :null }
                                            <p>Report</p>
                                            
                                           
                                            </div>
                                        </div>
                                    </div>
                                    <div className="photo">
                                        <img src="./images/post2.jpg" alt="" />
                                        <div className="postContent">{props.feedposts[props.p].text}</div>
                                        
                                           </div>
                                    <div className="action-buttons">
                                        <div className="interacion-buttons">
                                            <span>
                                                <i className="uil uil-heart"></i>
                                            </span>
                                            <span>
                                                <i className="uil uil-comment-dots"></i>
                                            </span>
                                            <span>
                                                <i className="uil uil-share-alt"></i>
                                            </span>
                                        </div>
                                        <div className="bookmark">
                                            <span>
                                                <i className="uil uil-bookmark-full"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="liked-by">
                                        <span><img src="./images/pro1.jpg" alt="" /></span>
                                        <span><img src="./images/pro2.jpg" alt="" /></span>
                                        <span><img src="./images/pro4.jpg" alt="" /></span>
                                        <p> Liked by <b>Emilia Carter</b>and <b>22 others</b></p>
                                    </div>
                                    <div className="capion">
                                        <p>
                                            <b>Andrew Martin</b>Lorem ipsum dolor sit amet.
                                           <span className="hash-tag">#travel</span>
                                        </p>
                                    </div>
                                    <div className="comments text-muted">
                                        View all 33 comments
                                   </div>
                                   <div className="addcomments" >
                                   <input type="text" value={textarea} onChange={(e)=>{setTextarea(e.target.value)}} />
                                   </div>

              </div>

        </>

    );
}

export default Postsub;
