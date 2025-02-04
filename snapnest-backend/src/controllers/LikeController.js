const { Like, Post, User } = require("../models");

const LikeController = {
  // 1️⃣ Dar Like
  async giveLike(req, res) {
    try {
      const { postId } = req.body;
      const userId = req.user.id; // Pegando o usuário autenticado

      // Verificar se o post existe
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: "Post não encontrado!" });
      }

      // Verificar se o usuário já deu like nesse post
      const existingLike = await Like.findOne({
        where: {
          postId,
          userId,
        },
      });

      if (existingLike) {
        return res.status(400).json({ message: "Você já deu like neste post!" });
      }

      // Criar um novo like
      const newLike = await Like.create({
        postId,
        userId,
      });

      return res.status(201).json({ message: "Like dado com sucesso!", like: newLike });
    } catch (error) {
      console.error("❌ Erro ao dar like:", error);
      return res.status(500).json({ message: "Erro ao dar like", error: error.message });
    }
  },

  // 2️⃣ Tirar Like
  async removeLike(req, res) {
    try {
      const { postId } = req.body;
      const userId = req.user.id; // Pegando o usuário autenticado

      // Verificar se o post existe
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: "Post não encontrado!" });
      }

      // Verificar se o usuário deu like nesse post
      const existingLike = await Like.findOne({
        where: {
          postId,
          userId,
        },
      });

      if (!existingLike) {
        return res.status(400).json({ message: "Você ainda não deu like neste post!" });
      }

      // Remover o like
      await existingLike.destroy();

      return res.status(200).json({ message: "Like removido com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao remover like:", error);
      return res.status(500).json({ message: "Erro ao remover like", error: error.message });
    }
  },

  // 3️⃣ Ver os Likes do Usuário
  async getUserLikes(req, res) {
    try {
      const userId = req.user.id; // Pegando o usuário autenticado

      // Buscar todos os "likes" do usuário
      const userLikes = await Like.findAll({
        where: { userId },
        include: {
          model: Post,
          as: "post",
          attributes: ["id", "title", "imageUrl"], // Pode adicionar mais atributos se necessário
        },
      });

      if (userLikes.length === 0) {
        return res.status(404).json({ message: "Você ainda não deu like em nenhum post!" });
      }

      return res.status(200).json(userLikes);
    } catch (error) {
      console.error("❌ Erro ao buscar os likes do usuário:", error);
      return res.status(500).json({ message: "Erro ao buscar os likes do usuário", error: error.message });
    }
  },
};

module.exports = LikeController;
