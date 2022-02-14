import "./posts.css";
import Post from "../Post/Post.jsx"

export default function Posts({posts}) {
    return (
        <div className="posts">
            {posts.map((p) => (         //posts here is the posts array from useState array at const [posts, setPosts].  
                <Post key = {p._id} post={p}/>        //map() here loops through this array of posts and for every single item in array it calls the function inside the map(function).
            ))}
                       
        </div>
    )
}
