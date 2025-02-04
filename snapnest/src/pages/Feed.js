import React, { useEffect, useState } from "react";
import axios from "axios";


const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts", {
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
    <div>
      <h2>Feed</h2>
      {posts.length === 0 ? (
        <p>Não há posts ainda!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <img src={`http://localhost:3000${post.imageUrl}`} alt={post.title} />
            <p>{post.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
