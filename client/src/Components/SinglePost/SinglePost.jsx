import { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import SinglePostUserSidebar from "../SinglePostUserSidebar/SinglePostUserSidebar";


export default function SinglePost() {
    const PF = "http://localhost:5000/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const {user} = useContext(Context);
    const [updateMode, setUpdateMode] = useState(false); 
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);  

    useEffect( () => {
        const getPost = async () => {
            const res = await axios.get("/posts/"+path); 
            setPost(res.data)
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
        
    }, [path])


    

    const handleDelete = async () => {
        try{
            await axios.delete(`/posts/${post._id}`, {
                data: {username: user.username},  //this was used beacuse it is necessary to check if the username of the post(i,e user.username) matches with the username from our post. And since we don't provide our username from singlepost, we use the keyword "data".
            })
            window.location.replace("/");
        }
        catch(err){
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        try{
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            },
            )

            setUpdateMode(false);
            window.location.reload("");
        }
        catch(err){
            console.log(err);
        }
    };


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = {
            username: post.username, //I was getting no results to update a photo from posts because in posts database username is required to be able to change or update(put) new data!!
            
        };
        if (file) {
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedPost.photo = filename;
            try {
              await axios.post("/upload", data);
            } catch (err) {console.log("error occured");}
          }
          try {
            await axios.put("/posts/"+post._id, updatedPost);
        } catch (err) {
              console.log("error occured while sending to post");
            }
        setUpdateMode(false);
    };
    
    return (
        <>
        <div className="singlePost">
            <div className="singlePostWrapper">
                
               <img
                    className="singlePostImg"
                    src={file ? URL.createObjectURL(file) : PF+post.photo}
                    alt=""
                /> 

               {updateMode && <div className="updatePhoto">
                <label htmlFor="fileInput" className="addFileButton toolTip">
                        <i className="writeIcon fas fa-plus"></i> <p className="addFileText">Add Photo</p>
                </label>
                    <input 
                            id="fileInput" 
                            type="file" 
                            style={{ display: "none"}} 
                            onChange={(e) => setFile(e.target.files[0])}
                    />
                    
               </div> }
               {/* post.photo && <img
                    className="singlePostImg"
                    src={PF + post.photo}
                    alt=""
                /> */}
               
                

                {updateMode && <button 
                                onClick={handleSubmit} 
                                className="singlePostButton">Update Photo
                                </button>
                }
               
            {updateMode ? (<input type="text" value={title} className="singlePostTitleInput" onChange={(e) => setTitle(e.target.value)}/> ) : (
                <h1 className="singlePostTitle">

                 {post.title}
                 {post.username === user?.username &&  //Here question mark after user is used so that if user doesn't exist then not to show error. But how? find out.
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                    </div>
                 }
                </h1>
                 
                 )}
                
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <span>{new Date(post.createdAt).toLocaleDateString("en-US")}</span>
                </div>
                {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value) }/> : (
                <p className="singlePostDesc">
                    {post.desc}
                </p>
                )}

                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div> 
        </div>

        <SinglePostUserSidebar post={post}/>
        </>
    )
    
}
