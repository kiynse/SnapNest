import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Para pegar o ID do post na URL
import Sidebar from "../components/Sidebar"; // Importando a Sidebar
import SearchBar from "../components/SearchBar"; // Importando a SearchBar
import PostCardDetail from "../components/PostCardDetail"; // Importando o PostCardDetail
import "../style/PostDetail.css"; // Estilos da página de detalhes

const PostDetail = () => {
  const { id } = useParams(); // Pega o ID do post
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao carregar o post", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="post-detail-container">
      <Sidebar /> {/* Adicionando a Sidebar */}
      <div className="post-detail-content">
        <SearchBar /> {/* Adicionando a SearchBar */}

        {/* Usando o PostCardDetail aqui */}
        <PostCardDetail post={post} />
      </div>
    </div>
  );
};

export default PostDetail;
