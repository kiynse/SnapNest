import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import PostCard from "../components/PostCard"; // Importando o componente PostCard
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
      <div className="feed-contentt">
        <SearchBar />
        <div className="feed-posts">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} /> // Passando o post como prop para o Card
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
