import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Helper to render caption with styled hashtags
const renderCaption = (caption, username) => {
  if (!caption) return null;
  
  const words = caption.split(" ");
  return (
    <p className="post-caption">
      <span className="post-caption-username">{username}</span>
      {words.map((word, i) => {
        if (word.startsWith("#")) {
          return (
            <React.Fragment key={i}>
              <span className="hashtag">{word}</span>{" "}
            </React.Fragment>
          );
        }
        return <span key={i}>{word} </span>;
      })}
    </p>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Track liked posts in local state to make the prototype feel "alive"
  const [likedPosts, setLikedPosts] = useState({});
  const [mockLikes, setMockLikes] = useState({});

  const getPosts = async () => {
    try {
      setLoading(true);
      // Fixed the endpoint URL from "" to "http://localhost:3000/posts"
      const response = await axios.get("http://localhost:3000/posts");

      console.log("Fetched posts response:", response.data);

      // Adjust according to the API response which returns: { message, post }
      const postsArray = response.data.posts || response.data.post || [];
      setPosts(postsArray);
      
      // Initialize mock like counts for each post for highly realistic interaction
      const initialLikes = {};
      postsArray.forEach((post) => {
        // Generate a random but stable number of likes between 12 and 150
        initialLikes[post._id] = Math.floor(Math.random() * 138) + 12;
      });
      setMockLikes(initialLikes);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleLikeToggle = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    setMockLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1),
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" style={{ borderColor: "rgba(99, 102, 241, 0.2)", borderTopColor: "var(--primary)", width: "40px", height: "40px", borderWidth: "4px" }}></div>
        <p className="loading-text">Fetching latest posts...</p>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <div className="feed-header-section">
        <div>
          <h1 className="feed-title">Home Feed</h1>
          <p className="feed-subtitle">See what's happening around the world</p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📸</div>
          <h3 className="empty-state-title">No Posts Yet</h3>
          <p className="empty-state-text">
            Be the first one to share a beautiful picture with a caption!
          </p>
          <Link to="/create-post" className="empty-state-btn">
            Create First Post
          </Link>
        </div>
      ) : (
        posts.map((post) => {
          const username = post.user?.name || "VibeUser";
          const userInitial = username.charAt(0);
          const isLiked = !!likedPosts[post._id];
          const likesCount = mockLikes[post._id] || 0;

          return (
            <div className="post-card" key={post._id}>
              {/* Post Header */}
              <div className="post-header">
                <div className="post-avatar">
                  {userInitial}
                </div>
                <div className="post-user-info">
                  <span className="post-username">{username}</span>
                  <span className="post-meta">Just now</span>
                </div>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="post-image-container">
                  <img
                    src={post.image}
                    alt="post content"
                    className="post-image"
                  />
                </div>
              )}

              {/* Interaction Action Bar */}
              <div className="post-actions">
                <button
                  type="button"
                  className={`action-btn ${isLiked ? "like-active" : ""}`}
                  onClick={() => handleLikeToggle(post._id)}
                  title={isLiked ? "Unlike" : "Like"}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>{likesCount} likes</span>
                </button>

                <button type="button" className="action-btn" title="Comment">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Comment</span>
                </button>
              </div>

              {/* Caption and content */}
              <div className="post-content">
                {renderCaption(post.caption, username)}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Feed;