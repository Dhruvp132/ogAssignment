import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data.posts);
    };

    const handleCreatePost = async () => {
        if (!newPost.trim()) return;
        await fetch("http://localhost:3000/createPost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Content: newPost }),
        });
        setNewPost("");
        fetchPosts();
    };

    return (
        <div>
            <h1>Homepage</h1>
            <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Create a new post..."
            />
            <button onClick={handleCreatePost}>Post</button>
            <ul>
                {posts.map((post) => (
                    <li key={post.postId}>
                        <Link to={`/posts/${post.postId}`}>
                            {post.Content} ({new Date(post.DateCreated).toLocaleString()})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Homepage;
