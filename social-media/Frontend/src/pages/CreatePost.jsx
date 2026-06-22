import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please select an image");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", image);

      // Fixed the endpoint URL to match backend app.post("/create-post", ...)
      const response = await axios.post(
        "http://localhost:3000/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Post created successfully!");

      // Reset form
      setCaption("");
      setImage(null);
      setPreview("");
    } catch (error) {
      console.error(error);
      alert("Failed to create post. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-card">
      <h2 className="create-post-title">Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Upload Photo</label>
          
          {!preview ? (
            <div className="file-upload-zone">
              <svg
                className="upload-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="upload-text-main">Choose an image file</span>
              <span className="upload-text-sub">or click to browse from device</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
          ) : (
            <div className="preview-container">
              <img
                src={preview}
                alt="preview"
                className="preview-image"
              />
              <button
                type="button"
                className="remove-preview-btn"
                onClick={handleRemoveImage}
                title="Remove image"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Caption</label>
          <textarea
            placeholder="Write an inspiring caption here..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="textarea-caption"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Sharing to feed...</span>
            </>
          ) : (
            "Share Post"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;