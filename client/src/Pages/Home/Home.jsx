import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header.jsx";
import Posts from "../../Components/Posts/Posts.jsx";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import { useLocation } from "react-router";
import axios from "axios";
import "./home.css";
import { Context } from "../../context/Context.js";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    const {user} = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts"+search ); //This is to get all posts details from API, and with search we can get the query or params so that we get the data with specified params   
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  

    return (
        <>
            {user ? null : <Header />}
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar />
            </div>
        </>
    )
}
