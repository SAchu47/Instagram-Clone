import React, { useState, useEffect } from "react";
import "./Post.css";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div class="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      {/* header -> avatar + username */}

      <img className="post__image" src={imageUrl} alt="pic" />
      {/* image */}

      <h4 className="post__text">
        {" "}
        <strong>{username}</strong> : {caption}
      </h4>
      {/* username + caption */}

      <div className="post__comment">
        {comments.map((comment) => (
          <p className="post__comments">
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
