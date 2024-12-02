import { useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !content) return;

    const newPost = { name, content };

    setPosts([...posts, newPost]);

    setShowPopup(false);
  }

  return (
    <div className="App">
      <Modal
        togglePopup={togglePopup}
        showPopup={showPopup}
        name={name}
        content={content}
        onSubmit={handleSubmit}
        setName={setName}
        setContent={setContent}
      />
      <Header togglePopup={togglePopup} />
      <Body posts={posts} />
    </div>
  );
}

function Body({ posts }) {
  return (
    <div className="app-body">
      <Post posts={posts} />
    </div>
  );
}

function Post({ posts }) {
  return (
    <div className="post">
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.name}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

function Header({ togglePopup }) {
  return (
    <header className="app-header">
      <h1>Simple Blog</h1>
      <Button onClick={togglePopup}>Add post</Button>
    </header>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

function Modal({
  togglePopup,
  showPopup,
  name,
  content,
  onSubmit,
  setName,
  setContent,
}) {
  return (
    <div className={`${showPopup ? "modal" : "modal-disabled"}`}>
      <div className="modal-content">
        <span className="close" onClick={togglePopup}>
          &times;
        </span>
        <h2>Add a new post</h2>
        <form onSubmit={onSubmit} className="form">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Content:</label>
          <textarea
            className="content-text"
            type="text"
            value={content}
            placeholder="Your content"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <Button type="submit">Publish</Button>
        </form>
      </div>
    </div>
  );
}
