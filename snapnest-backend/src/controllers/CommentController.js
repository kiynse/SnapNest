const { Comment, Post, User } = require("../models");

const CommentController = {
  // 1️⃣ Criar um comentário
  async createComment(req, res) {
    try {
      const { postId, text } = req.body;
      const userId = req.user.id; // Pegando o usuário autenticado

      // Verificar se o post existe
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: "Post não encontrado!" });
      }

      // Criar o comentário
      const newComment = await Comment.create({
        text,
        postId,
        userId,
      });

      return res.status(201).json({ message: "Comentário criado com sucesso!", comment: newComment });
    } catch (error) {
      console.error("❌ Erro ao criar comentário:", error);
      return res.status(500).json({ message: "Erro ao criar comentário", error: error.message });
    }
  },

  // 2️⃣ Editar um comentário
  async editComment(req, res) {
    try {
      const { commentId, text } = req.body;
      const userId = req.user.id; // Pegando o usuário autenticado

      // Verificar se o comentário existe
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado!" });
      }

      // Verificar se o usuário é o autor do comentário
      if (comment.userId !== userId) {
        return res.status(403).json({ message: "Você não tem permissão para editar este comentário!" });
      }

      // Atualizar o comentário
      comment.text = text;
      await comment.save();

      return res.status(200).json({ message: "Comentário editado com sucesso!", comment });
    } catch (error) {
      console.error("❌ Erro ao editar comentário:", error);
      return res.status(500).json({ message: "Erro ao editar comentário", error: error.message });
    }
  },

  // 3️⃣ Apagar um comentário
  async deleteComment(req, res) {
    try {
      const { commentId } = req.body;
      const userId = req.user.id; // Pegando o usuário autenticado

      // Verificar se o comentário existe
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado!" });
      }

      // Verificar se o usuário é o autor do comentário
      if (comment.userId !== userId) {
        return res.status(403).json({ message: "Você não tem permissão para apagar este comentário!" });
      }

      // Deletar o comentário
      await comment.destroy();

      return res.status(200).json({ message: "Comentário apagado com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao apagar comentário:", error);
      return res.status(500).json({ message: "Erro ao apagar comentário", error: error.message });
    }
  },
};

module.exports = CommentController;
