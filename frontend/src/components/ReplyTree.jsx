import React, { useState } from "react";

const ReplyTree = ({ replies }) => {
    if (!replies || replies.length === 0) return <p>No replies yet.</p>;

    return (
        <ul>
            {replies.map((reply) => (
                <ReplyNode key={reply.id} reply={reply} />
            ))}
        </ul>
    );
};

const ReplyNode = ({ reply }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [newReply, setNewReply] = useState("");

    const handleReplySubmit = async () => {
        if (!newReply.trim()) return;
        await fetch("http://localhost:3000/reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parentId: reply.id, content: newReply }),
        });
        setNewReply("");
        setShowReplies(false); // Toggle back to refresh nested replies
    };

    return (
        <li>
            <p>
                {reply.Content} ({new Date(reply.DateCreated).toLocaleString()})
            </p>
            <button onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? "Hide Replies" : "Reply"}
            </button>
            {showReplies && (
                <div style={{ marginLeft: "20px" }}>
                    <textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Add a reply..."
                    />
                    <button onClick={handleReplySubmit}>Reply</button>
                </div>
            )}
            {reply.ChildReplies && <ReplyTree replies={reply.ChildReplies} />}
        </li>
    );
};

export default ReplyTree;