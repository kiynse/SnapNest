import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaShareAlt, FaSave } from "react-icons/fa"; // Ícones para os botões
import "../style/PostDetail.css"; // Estilos da página de detalhes

const PostCardDetail = ({ post }) => {
  const [comment, setComment] = useState(""); // Para capturar o novo comentário
  const [comments, setComments] = useState([]); // Para armazenar os comentários

  useEffect(() => {
    setComments(post.comments || []); // Assume-se que o post tenha um campo de comentários
  }, [post]);

  // Função para enviar um comentário
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = { content: comment, postId: post.id };
    try {
      // Envia o novo comentário para a API (ajuste conforme sua API)
      await axios.post("http://localhost:3000/comments", newComment, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComments([...comments, newComment]); // Atualiza os comentários
      setComment(""); // Limpa o campo de comentário
    } catch (error) {
      console.error("Erro ao enviar comentário", error);
    }
  };

  return (
    <div className="post-card-detail">
      <div className="post-image-container">
        <img
          src={`http://localhost:3000${post.imageUrl}`}
          alt={post.title}
          className="post-image"
        />
      </div>

      <div className="post-info">
        <h3>{post.title}</h3>
        <p>{post.description}</p>

        {/* Botões de interações */}
        <div className="post-actions">
          <button className="action-btn"><FaHeart /> Like</button>
          <button className="action-btn"><FaShareAlt /> Compartilhar</button>
          <button className="action-btn"><FaSave /> Salvar</button>
        </div>

        <div className="categories">
          {post.categories.map((category) => (
            <span key={category.id} className="category-tag">
              {category.name}
            </span>
          ))}
        </div>

        {/* Comentários */}
        <div className="comments-section">
          <h4>Comentários</h4>
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p>{comment.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escreva um comentário..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn">Comentar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCardDetail;
