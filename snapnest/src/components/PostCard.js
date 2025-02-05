import React from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import { FaHeart, FaSave, FaDownload, FaEllipsisH } from "react-icons/fa"; // Importando ícones do react-icons
import "../style/PostCard.css"; // Para estilização do card

const PostCard = ({ post }) => {
  const navigate = useNavigate();  // Alterando de 'history' para 'navigate'

  // Função para redirecionar para a página de detalhes do post
  const handleClick = () => {
    navigate(`/post/${post.id}`); // Usando o navigate para redirecionar
  };

  return (
    <div className="feed-post" onClick={handleClick}>
      <div className="image-container">
        <img
          src={`http://localhost:3000${post.imageUrl}`}
          alt={post.title}
          className="img-feed"
        />
        <div className="overlay">
          <button className="btn save-btn">
            Salvar
          </button>
          <button className="btn download-btn">
            <FaDownload /> {/* Ícone de download */}
          </button>
          <button className="btn like-btn">
            <FaHeart /> {/* Ícone de coração */}
          </button>
          <button className="btn more-btn">
            <FaEllipsisH /> {/* Ícone de três pontos */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
