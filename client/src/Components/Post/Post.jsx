import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
    const PF = "http://localhost:5000/images/";

    return (
        <div className="post">
            <div className="card">
                <div className="cardTop">
                    <div className="userDetails">
                        <div className="profileImg">
                            <Link to={`/?user=${post.username}`} className="link">
                            { post.profilePic ? <img className="cover" src={PF + post.profilePic} alt=""/> : <i className="settingsPPIcon2 far fa-user-circle"></i>}
                            {/* It's very important to give it a null or another option as error handling mechanism as the user might not have a profile picture etc... */}
                            </Link>
                        </div>

                        <Link to={`/?user=${post.username}`} className="link">
                            <h3 className="nameLocation">{post.username}</h3>
                        </Link>
                    </div>

                    <div className="threeDotMenu">
                        <i className="fas fa-ellipsis-h"></i>
                    </div>

                </div>
                <Link className="link" to={`/post/${post._id}`}>
                    { post.photo && <img className="postImg" src={PF + post.photo} alt=""/>} 
                </Link>
                

                <div className="postInfo">
                        <div className="postCats">
                            <span className="postCat">    
                                Music    
                            </span>
                            <span className="postCat">
                                Life        
                            </span>
                        </div>

                    {/* action buttons */}
                    <div className="actionButtons">
                        <div className="left">
                            <i className="leftIcons far fa-heart"></i>
                            <i className="leftIcons far fa-comment"></i>
                            <i className="leftIcons fas fa-share"></i>
                        </div>
                        <div className="right">
                        <i className="far fa-bookmark"></i>
                        </div>
                    </div>

                    <div className="likeStatus">
                        <p>Liked by <b>Afzal and 217 others</b></p>
                    </div>

                        <span className="postTitle">
                            <Link className="link" to={`/post/${post._id}`}>{post.title}</Link>  
                            {/* //I checked that post here cannot be any name because I think post is the same "post" we used in the posts Component as a prop. Now the question is: how is this "post.title" able to fetch data from json data "res.data" objects like title, createdAt, desc etc...   */}
                        </span>
                        <hr />
                        <span className="postDate">{new Date(post.createdAt).toLocaleDateString("en-US")}</span>
                </div>
                    <p className="postDesc">
                        {post.desc}
                    </p>
                </div>
        </div>

    )
}
