import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReplyTree from "./ReplyTree";

const PostView = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [newReply, setNewReply] = useState("");

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPost = async () => {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        const data = await response.json();
        setPost(data.post);
    };

    const handleReplySubmit = async () => {
        if (!newReply.trim()) return;
        await fetch("http://localhost:3000/reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId: post.postId, content: newReply }),
        });
        setNewReply("");
        fetchPost();
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h1>{post.Content}</h1>
            <p>Posted on: {new Date(post.DateCreated).toLocaleString()}</p>
            <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Add a reply..."
            />
            <button onClick={handleReplySubmit}>Reply</button>
            <h2>Replies</h2>
            <ReplyTree replies={post.Replies} />
        </div>
    );
};

export default PostView;