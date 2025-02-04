import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../style/Feed.css"; // Adiciona o arquivo CSS para o Feed

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao carregar os posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      <Sidebar />
      <div className="feed-content">
        <h2 className="h2-feed">Feed</h2>
        {posts.length === 0 ? (
          <p className="p-feed">Não há posts ainda!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <img className="img-feed"
                src={`http://localhost:3000${post.imageUrl}`}
                alt={post.title}
              />
              <p className="p-feed">{post.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
